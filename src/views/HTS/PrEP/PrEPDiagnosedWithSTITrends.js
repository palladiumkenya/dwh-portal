import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';
import moment from 'moment';

const PrEPDiagnosedWithSTITrends = () => {
    const [prepDiagnosedWithSTITrends, setPrepDiagnosedWithSTITrends] = useState({});
    let discList = useSelector(prepSelector.getPrepDiagTrend);
    let filterMonth = moment(
        useSelector((state) => state.filters.fromDate),
        'MMM YYYY'
    )
        .format('MMMM YYYY')
        .toUpperCase();

    let month = useSelector((state) => state.filters.fromDate)
        ? filterMonth
        : `${discList.monthRange.at(-1).toUpperCase()} - ${discList.monthRange
              .at(0)
              .toUpperCase()}`;

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
                {`DIAGNOSED WITH STI TRENDS (${month})`}
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
