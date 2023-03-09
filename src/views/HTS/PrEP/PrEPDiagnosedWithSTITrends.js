import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';

const PrEPDiagnosedWithSTITrends = () => {
    const filters = useSelector((state) => state.filters);
    const [prepDiagnosedWithSTITrends, setPrepDiagnosedWithSTITrends] = useState({});
    let discList = useSelector(prepSelector.getPrepDiagTrend);

    const loadPrepDiagnosedWithSTITrends = useCallback(async () => {
        setPrepDiagnosedWithSTITrends({
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
                    name: '',
                    data: discList.diagList,
                    color: '#E06F07',
                    fillOpacity: 0.66,
                    marker: {
                        radius: 7,
                        fillColor: '#E06F07CC',
                    },
                    showInLegend: false,
                },
            ],
        });
    }, [discList]);

    useEffect(() => {
        loadPrepDiagnosedWithSTITrends();
    }, [loadPrepDiagnosedWithSTITrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DIAGNOSED WITH STI TRENDS (MAY 2021 - JAN 2022)
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepDiagnosedWithSTITrends}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPDiagnosedWithSTITrends;
