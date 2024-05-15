import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';;

const HISDeploymentsByPartner = () => {
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
                    name: 'ACTIVE',
                    data: [10, 70, 34, 90, 43,324,210],
                    color: '#00AD30',
                },
                {
                    name: 'DISCONTINUED',
                    data: [90,23,54,77,2, 60,63],
                    color: '#152459',
                },
                {
                    name: 'STALLED/INACTIVE',
                    data: [10,3,1,18,2, 0,6],
                    color: '#F6941C',
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
                        EMR STATUS BY PARTNER
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

export default HISDeploymentsByPartner;
