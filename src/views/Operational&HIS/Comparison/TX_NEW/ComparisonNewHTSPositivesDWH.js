import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as newOnArtTrendsSelectors from '../../../../selectors/CT/NewOnArt/newOnArtTrends';
import * as newOnArtHtsPositiveSelectors from '../../../../selectors/CT/NewOnArt/newOnArtHtsPositive';


const ComparisonNewVsHTSPositivesDWH = () => {
    const filters = useSelector(state => state.filters);
    const [comparisonNewVsHTSPositivesDWH, setComparisonNewVsHTSPositivesDWH] = useState({});

    const newOnArtTrendsData = useSelector(newOnArtTrendsSelectors.getNewOnArtTrends);
    const newOnArtHtsPositiveData = useSelector(newOnArtHtsPositiveSelectors.getNewOnArtHtsPositive);

    const loadComparisonNewVsHTSPositivesDWH = useCallback(async () => {
        setComparisonNewVsHTSPositivesDWH({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: newOnArtHtsPositiveData.months,
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
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
            },
            plotOptions: {
                scatter: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}%',
                    },
                },
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'TOTAL NEW ON TREATMENT',
                    data: newOnArtHtsPositiveData.txNew,
                    color: '#14084D',
                    dataLabels: { enabled: true },
                },
                {
                    name: 'TOTAL HTS POSITIVES',
                    data: newOnArtHtsPositiveData.positives,
                    color: '#00a65a',
                    dataLabels: { enabled: true },
                },
            ],
        });
    }, [newOnArtTrendsData, newOnArtHtsPositiveData]);

    useEffect(() => {
        loadComparisonNewVsHTSPositivesDWH();
    }, [loadComparisonNewVsHTSPositivesDWH]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                NEW ON TREATMENT COMPARED TO HTS POSITIVES - DWH
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonNewVsHTSPositivesDWH}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonNewVsHTSPositivesDWH;
