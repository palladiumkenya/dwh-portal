import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as hisSelector from '../../selectors/RR/HisDeploymentsSelector';
import { useSelector } from 'react-redux';

const HISDeploymentsByPartner = () => {
    const hisStatusData = useSelector(
        hisSelector.getFacilityStatusByPartner
    );
    const [hisDeployments, setHisDeployments] = useState({});

    const loadHisDeployments = useCallback(async () => {
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
                categories: hisStatusData.partnerNames,
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
                    data: hisStatusData.actives,
                    color: '#00AD30',
                },
                {
                    name: 'DISCONTINUED',
                    data: hisStatusData.discontinueds,
                    color: '#152459',
                },
                {
                    name: 'STALLED/INACTIVE',
                    data: hisStatusData.inactives,
                    color: '#F6941C',
                }
            ],
        });
    }, [hisStatusData]);

    useEffect(() => {
        loadHisDeployments();
    }, [loadHisDeployments]);

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
