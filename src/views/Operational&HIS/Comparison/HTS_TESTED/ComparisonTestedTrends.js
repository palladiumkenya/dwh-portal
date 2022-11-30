import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/newlyStartedOnArtKHIS';
import * as newOnArtTrendsSelectors from '../../../../selectors/CT/NewOnArt/newOnArtTrends';


const ComparisonTestedTrends = () => {
    const filters = useSelector((state) => state.filters);
    const [comparisonNewlyTrends, setComparisonNewlyTrends] = useState({});

    const newlyKHIS = useSelector(
        newlyStartedOnArtKHIS.getNewlyStartedOnArtTrendsKHIS
    );
    const newOnArtTrendsData = useSelector(
        newOnArtTrendsSelectors.getNewOnArtTrends
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
                categories: newlyKHIS.labels,
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
                    data: newlyKHIS.data,
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
                    data: newOnArtTrendsData.txNew,
                    color: '#1AB394',
                    dataLabels: { enabled: true },
                },
            ],
        });
    }, [newlyKHIS, newOnArtTrendsData]);

    useEffect(() => {
        loadComparisonNewlyTrends();
    }, [loadComparisonNewlyTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TRENDS OF PATIENTS TESTED
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

export default ComparisonTestedTrends;
