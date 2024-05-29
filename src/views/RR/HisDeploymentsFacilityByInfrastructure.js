import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import * as hisSelector from '../../selectors/RR/HisDeploymentsSelector';

const HisDeploymentsFacilityByInfrastructure = () => {
    const [hisDeployments, setHisDeployments] = useState({});
    const hisStatusData = useSelector(
        hisSelector.getFacilityByInfrastructure
    );

    const loadHisByInfrastructure = useCallback(async () => {
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
                    name: 'ON PREMISES',
                    data: hisStatusData.onPremises,
                    color: '#00AD30',
                },
                {
                    name: 'ON CLOUD',
                    data: hisStatusData.onCloud,
                    color: '#152459',
                }
            ],
        });
    }, [hisStatusData]);

    useEffect(() => {
        loadHisByInfrastructure();
    }, [loadHisByInfrastructure]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ACTIVE FACILITY BY INFRASTRUCTURE DEPLOYMENT
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
