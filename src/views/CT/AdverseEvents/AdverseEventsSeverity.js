import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const AdverseEventsSeverity = ({ globalFilter }) => {
    const [severityGrading, setSeverityGrading] = useState({});
    const [adverseEventsActionsBySeverity, setAdverseEventsActionsBySeverity] = useState({});


    useEffect(() => {
        loadSeverityGrading();
        loadAdverseEventsActionsBySeverity();
    }, [globalFilter]);

    const loadSeverityGrading =  async () => {
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
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [
                {
                    name: 'STABILITY STATUS AMONG ACTIVE PATIENTS',
                    colorByPoint: true,
                    data: [
                    {
                        name: 'MILD',
                        y: 35.62,
                        color: "#1AB394"
                    },
                    {
                        name: 'SEVERE',
                        y: 18.48,
                        sliced: true,
                        selected: true,
                        color: "#2F4050"
                    },
                    {
                        name: 'MODERATE',
                        y: 45.90,
                        sliced: true,
                        selected: true,
                        color: "#D4FF78"
                    }]
                }
            ]
        });
    };

    const loadAdverseEventsActionsBySeverity = async () => {
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
    };

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
