import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as newOnArtByAgeSexSelectors from '../../../selectors/CT/NewOnArt/newOnArtByAgeSex';

const TicketsByCategory = () => {
    const [newOnArtBySex, setNewOnArtBySex] = useState({});
    const newOnArtBySexData = useSelector(
        newOnArtByAgeSexSelectors.getNewOnArtBySex
    );

    const loadNewOnArtBySex = useCallback(async () => {
        setNewOnArtBySex({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
                align: 'left',
            },
            xAxis: {
                categories: [
                    'UNCLASSIFIED',
                    'muzima issues',
                    'IT HARDWARE',
                    'IQ CARE',
                    'IL',
                    'DWH',
                ],
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF ISSUES',
                },
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
                    name: 'OPEN',
                    data: [3, 5, 1, 13, 12, 5],
                    color: '#2F4050',
                },
                {
                    name: 'CLOSED',
                    data: [7, 12, 6, 3, 14, 7],
                    color: '#1AB394',
                },
            ],
        });
    }, [newOnArtBySexData]);

    useEffect(() => {
        loadNewOnArtBySex();
    }, [loadNewOnArtBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TICKETS BY CATEGORY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={newOnArtBySex}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TicketsByCategory;
