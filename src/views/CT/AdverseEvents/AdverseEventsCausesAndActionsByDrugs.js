import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../../Shared/Api';

const AdverseEventsCausesAndActionsByDrugs = ({ globalFilter }) => {
    const [reportedCausesOfAEs, setReportedCausesOfAEs] = useState({});
    const [actionsByDrugs, setActionsByDrugs] = useState({});

    useEffect(() => {
        loadReportedCausesOfAE();
        loadActionsByDrugs();
    }, [globalFilter]);

    const loadReportedCausesOfAE = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('care-treatment/getReportedCausesOfAes', params);
        const arvArray = result.filter(obj => obj.AdverseEventCause === 'ARV');
        const arvAndOthersArray = result.filter(obj => obj.AdverseEventCause === 'ARV + OTHER DRUGS');
        const non_arvArray = result.filter(obj => obj.AdverseEventCause === 'NON-ARVS');
        const unspecifiedArray = result.filter(obj => obj.AdverseEventCause === 'UNSPECIFIED');

        const arv = arvArray.length > 0 ? arvArray[0].total : 0;
        const arvAndOthers = arvAndOthersArray.length > 0 ? arvAndOthersArray[0].total : 0;
        const non_arv = non_arvArray.length > 0 ? non_arvArray[0].total : 0;
        const unspecified = unspecifiedArray.length > 0 ? unspecifiedArray[0].total : 0;

        setReportedCausesOfAEs({
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
                    name: 'STABILITY STATUS AMONG ACTIVE PATIENTS',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'ARV',
                            y: arv,
                            color: "#1AB394"
                        },
                        {
                            name: 'NON-ARVs',
                            y: non_arv,
                            color: "#2F4050"
                        },
                        {
                            name: 'ARV + OTHER DRUGS',
                            y: arvAndOthers,
                            color: "#1f77b4"
                        },
                        {
                            name: 'UNSPECIFIED',
                            y: unspecified,
                            color: "#D4FF78"
                        }]
                }
            ]
        });
    };

    const loadActionsByDrugs = async () => {
        setActionsByDrugs({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['ARV', 'NON-ARV', 'ARV + OTHER DRUGS',
                    'UNSPECIFIED']
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
                name: 'SEVERE',
                color: "#485969",
                data: [5, 3, 4, 7]
            }, {
                name: 'MODERATE',
                color: "#1AB394",
                data: [2, 2, 3, 2]
            }, {
                name: 'MILD',
                color: "#1f77b4",
                data: [2, 2, 3, 2]
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        REPORTED CAUSES OF AEs
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={reportedCausesOfAEs} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ADVERSE EVENTS ACTIONS BY DRUGS(N=495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={actionsByDrugs} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
export default AdverseEventsCausesAndActionsByDrugs;

