import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../../Shared/Api';

const AdverseEventsSeverity = ({ globalFilter }) => {
    const [severityGrading, setSeverityGrading] = useState({});
    const [adverseEventsActionsBySeverity, setAdverseEventsActionsBySeverity] = useState({});

    const loadSeverityGrading =  useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let mildVal = 0;
        let moderateVal = 0;
        let severeVal = 0;
        let noneVal = 0;
        let unknownVal = 0;
        let notindictatedVal = 0;

        const result = await getAll('care-treatment/getAeSeverityGrading', params);
        const mild = result.filter(obj => obj.Severity == "Mild");
        const moderate = result.filter(obj => obj.Severity == "Moderate");
        const severe = result.filter(obj => obj.Severity == "Severe");
        const none = result.filter(obj => obj.Severity == "None");
        const unknown = result.filter(obj => obj.Severity == "Unknown");

        if (mild.length > 0) {
            mildVal = mild[0].total;
        }

        if (moderate.length > 0) {
            moderateVal = moderate[0].total;
        }

        if (severe.length > 0) {
            severeVal = severe[0].total;
        }

        if (none.length > 0) {
            noneVal = none[0].total;
        }

        if (unknown.length > 0) {
            unknownVal = unknown[0].total;
        }

        notindictatedVal = noneVal + unknownVal;

        setSeverityGrading({
            chart: {
                type: 'pie',
                renderTo: 'container'
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: ''
            },
            plotOptions: {
                pie: {
                    innerSize: '60%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y})'
                    },
                    showInLegend: true
                }
            },
            series: [
                {
                    name: 'SEVERITY GRADING OF AEs',
                    colorByPoint: true,
                    data: [
                    {
                        name: 'MILD',
                        y: mildVal,
                        color: "#1AB394"
                    },
                    {
                        name: 'SEVERE',
                        y: severeVal,
                        color: "#2F4050"
                    },
                    {
                        name: 'MODERATE',
                        y: moderateVal,
                        color: "#D4FF78"
                    },
                    {
                        name: 'NOT INDICATED',
                        y: notindictatedVal,
                        color: "#f28e2b"
                    }]
                }
            ]
        });
    }, [globalFilter]);

    const loadAdverseEventsActionsBySeverity = useCallback(async () => {
        setAdverseEventsActionsBySeverity({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['MILD', 'MODERATE', 'SEVERE']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENT OF PATIENTS'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Undocumented',
                color: "#1AB394",
                data: [5, 3, 4, 7]
            }, {
                name: 'Medicine not changed',
                color: "#485969",
                data: [2, 2, 3, 2]
            }, {
                name: 'Dose reduced',
                color: "#D4FF78",
                data: [2, 2, 3, 2]
            }, {
                name: 'Medicine causing AE withdrawn',
                color: "#1f77b4",
                data: [2, 2, 3, 2]
            }, {
                name: 'All drugs stopped',
                color: "#f28e2b",
                data: [2, 2, 3, 2]
            }]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadSeverityGrading();
        loadAdverseEventsActionsBySeverity();
    }, [loadSeverityGrading, loadAdverseEventsActionsBySeverity]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        SEVERITY GRADING OF AEs
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={severityGrading} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ADVERSE EVENTS ACTIONS BY SEVERITY(N=495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={adverseEventsActionsBySeverity} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default AdverseEventsSeverity;
