import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const AdverseEventsSeverityLevels = ({ globalFilter }) => {
    const [severityLevels, setSeverityLevels] = useState({});

    useEffect(() => {
        loadSeverityLevels();
    }, [globalFilter]);

    const loadSeverityLevels = async () => {
        setSeverityLevels({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['SKIN RASH', 'LIPIDODYSTROPHY', 'BURNING AND TINGLING IN LIMBS',
                    'NAUSEA', 'DIZZINESS', 'FATIGUE', 'HEADACHE', 'ANAEMIA', 'JAUNDICE', 'INSOMNIA',
                    'ABNORMAL DISCOMFORT', 'GYNAECOMASTIA', 'HYPERGLYCEAMIA', 'LACTIC ACIDOSIS',
                    'FEVER', 'LIVER FAILURE', 'PANCREATITIS']
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
                data: [5, 3, 4, 7, 2, 2,2,1, 2, 1, 1, 3]
            }, {
                name: 'MODERATE',
                color: "#1AB394",
                data: [2, 2, 3, 2, 2, 2, 2, 1, 2, 1, 1]
            }, {
                name: 'MILD',
                color: "#1f77b4",
                data: [2, 2, 3, 2, 2, 2]
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        REPORTED ADVERSE EVENTS WITH SEVERITY LEVELS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={severityLevels} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AdverseEventsSeverityLevels;
