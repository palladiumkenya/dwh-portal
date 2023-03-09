import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as newOnArtByAgeSexSelectors from '../../../selectors/CT/NewOnArt/newOnArtByAgeSex';

const OpenTicketsByType = () => {
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
                    'unclassified',
                    'dwapi issues',
                    'mhealth issues',
                    'kenyaemr support',
                ],
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF ISSUES',
                },
                stackLabels: {
                    enabled: true,
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
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            series: [
                {
                    name: 'BUG',
                    data: [3, 5, 1, 13],
                    color: '#2F4050',
                },
                {
                    name: 'SUPPORT',
                    data: [14, 8, 8, 12],
                    color: '#A70709',
                },
                {
                    name: 'ENHANCEMENT',
                    data: [0, 2, 16, 3],
                    color: '#5FA5E6',
                },
                {
                    name: 'TRAINING',
                    data: [20, 2, 6, 13],
                    color: '#F28E2B',
                },
                {
                    name: 'UNCLASSIFIED',
                    data: [7, 12, 6, 3],
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
                        OPEN ISSUES BY TYPE
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

export default OpenTicketsByType;
