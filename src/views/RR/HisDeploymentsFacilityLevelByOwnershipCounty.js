import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import * as hisSelector from '../../selectors/RR/HisDeploymentsSelector';

const HisDeploymentsFacilityLevelByOwnershipCounty = () => {
    const [hisDeployments, setHisDeployments] = useState({});
    const hisStatusData = useSelector(
        hisSelector.getFacilityLevelByCounty
    );

    const loadHisLevelByCounty = useCallback(async () => {
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
                    text: 'COUNTY',
                },
                categories: hisStatusData.counties,
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
                    name: 'LEVEL 1',
                    data: hisStatusData.lvl1,
                    color: '#00AD30',
                },
                {
                    name: 'LEVEL 2',
                    data: hisStatusData.lvl2,
                    color: '#152459',
                },
                {
                    name: 'LEVEL 3',
                    data: hisStatusData.lvl3,
                    color: '#F6941C',
                },
                {
                    name: 'LEVEL 4',
                    data: hisStatusData.lvl4,
                    color: '#D21D7F',
                },
                {
                    name: 'LEVEL 5',
                    data: hisStatusData.lvl5,
                    color: '#8E2C16',
                },
                {
                    name: 'LEVEL 6',
                    data: hisStatusData.lvl6,
                    color: '#5FA5E6',
                },
            ],
        });
    }, [hisStatusData]);

    useEffect(() => {
        loadHisLevelByCounty();
    }, [loadHisLevelByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ACTIVE FACILITY LEVEL BY OWNERSHIP (COUNTY)
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

export default HisDeploymentsFacilityLevelByOwnershipCounty;
