import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as tickets from '../../../selectors/ServiceDesk/statusTickets';

const IssueStatusByMonth = () => {
    const [newOnArtBySex, setNewOnArtBySex] = useState({});
    const byMonth = useSelector(
        tickets.getByMonth
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
                categories: byMonth.months,
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF ISSUES',
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
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            series: [
                {
                    name: 'OPEN',
                    data: byMonth.open,
                    color: '#2F4050',
                },
                {
                    name: 'CLOSED',
                    data: byMonth.closed,
                    color: '#1AB394',
                },
            ],
        });
    }, [byMonth]);

    useEffect(() => {
        loadNewOnArtBySex();
    }, [loadNewOnArtBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ISSUE STATUS BY MONTH
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

export default IssueStatusByMonth;
