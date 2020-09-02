import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const UptakeByEntryPoint = ({ globalFilter }) => {
    const [uptakeByEntryPoint, setUptakeByEntryPoint] = useState({});

    useEffect(() => {
        loadUptakeByEntryPoint();
    }, [globalFilter]);

    const loadUptakeByEntryPoint = async () => {
        setUptakeByEntryPoint({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    'TX CURR',
                    'ELIGIBLE FOR VL',
                    'HAS VL AT 12 MONTHS',
                    'SUPPRESSED AT 12 MONTHS'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENT'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                data: [
                    {
                        y: 49.9,
                        color: "#3475B3",
                    },
                    {
                        y: 71.5,
                        color: "#F28E2B",
                    },
                    {
                        y:106.4,
                        color: "#0D5647",
                    },
                    {
                        y:129.2,
                        color: "#E15759",
                    }
                ]
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UPTAKE BY ENTRY POINT
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={uptakeByEntryPoint} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UptakeByEntryPoint;
