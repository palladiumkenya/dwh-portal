import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';

const PrEPDiscontinuationTrends = () => {
    const filters = useSelector((state) => state.filters);
    let discList = useSelector(prepSelector.getPrepDiscTrend);

    const [prepDiscontinuationTrends, setPrepDiscontinuationTrends] = useState(
        {}
    );

    const loadPrepDiscontinuationTrends = useCallback(async () => {
        setPrepDiscontinuationTrends({
            chart: {
                defaultSeriesType: 'area',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: discList.label,
                crosshair: true,
                title: {
                    text: 'MONTHS',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS',
                },
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat:
                    '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
                shared: true,
            },
            series: [
                {
                    name: 'DISCONTINUED',
                    data: discList.discList,
                    color: '#1AB394',
                    fillOpacity: 0.2,
                    marker: {
                        radius: 7,
                        fillColor: '#1AB394CC',
                    },
                },
            ],
        });
    }, [discList]);

    useEffect(() => {
        loadPrepDiscontinuationTrends();
    }, [loadPrepDiscontinuationTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TRENDS OF PrEP DISCONTINUATION
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepDiscontinuationTrends}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPDiscontinuationTrends;
