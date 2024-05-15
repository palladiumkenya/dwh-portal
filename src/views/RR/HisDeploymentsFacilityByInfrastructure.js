import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';;

const HisDeploymentsFacilityByInfrastructure = () => {
    const [hisDeployments, setHisDeployments] = useState({});

    const loadNewOnArtBySex = useCallback(async () => {
        setHisDeployments({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
                align: 'left',
            },
            xAxis: {
                title: {
                    text: 'SERVICE DELIVERY PARTNER',
                },
                categories: ['ampath', 'afh', 'edarp', 'wrp', 'CHAK', 'AFYA NYOTA', 'AMREF'],
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF FACILITIES',
                },
                reversedStacks: false,
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color:
                        // theme
                            (Highcharts.defaultOptions.title.style &&
                                Highcharts.defaultOptions.title.style.color) ||
                            'gray',
                        textOutline: 'none',
                    },
                },
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                floating: false,
                shadow: false,
                y: 0,
                x: 80,
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat:
                    '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
            },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            series: [
                {
                    name: 'ON PREMISES',
                    data: [80, 70, 34, 90, 43,24,110],
                    color: '#00AD30',
                },
                {
                    name: 'ON CLOUD',
                    data: [9,23,54,77,2, 60,63],
                    color: '#152459',
                }
            ],
        });
    }, []);

    useEffect(() => {
        loadNewOnArtBySex();
    }, [loadNewOnArtBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        FACILITY BY INFRASTRUCTURE DEPLOYMENT
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={hisDeployments}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HisDeploymentsFacilityByInfrastructure;
