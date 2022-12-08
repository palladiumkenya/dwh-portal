import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as htsPositivesTrendsKHIS from '../../../../selectors/Operational&HIS/Comparison/htsPositivesTrendsKHIS';
import * as newOnArtHtsPositiveSelectors from '../../../../selectors/CT/NewOnArt/newOnArtHtsPositive';


const ComparisonPosTrends = () => {
    const [comparisonNewlyTrends, setComparisonNewlyTrends] = useState({});

    const htsKHIS = useSelector(
        htsPositivesTrendsKHIS.getHTSPositivesTrendsKHIS
    );
    const dwhHts = useSelector(
        newOnArtHtsPositiveSelectors.getNewOnArtHtsPositive
    );

    const loadComparisonNewlyTrends = useCallback(async () => {
        setComparisonNewlyTrends({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: htsKHIS.labels,
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
            plotOptions: {},
            series: [
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: true,
                    },
                    name: 'KHIS',
                    data: htsKHIS.data,
                    color: '#2F4050',
                    dataLabels: { enabled: true },
                },
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: true,
                    },
                    name: 'DWH',
                    data: dwhHts.positives,
                    color: '#1AB394',
                    dataLabels: { enabled: true },
                },
            ],
        });
    }, [htsKHIS, dwhHts]);

    useEffect(() => {
        loadComparisonNewlyTrends();
    }, [loadComparisonNewlyTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TRENDS OF PATIENTS TESTED HIV POSITIVE
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={comparisonNewlyTrends}
                />
            </CardBody>
        </Card>
    );
};

export default ComparisonPosTrends;
