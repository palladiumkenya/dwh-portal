import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/newlyStartedOnArtKHIS';


const ComparisonNewlyTrends = () => {
    const filters = useSelector((state) => state.filters);
    const [
        comparisonNewlyTrends,
        setComparisonNewlyTrends,
    ] = useState({});

    let newlyKHIS =  useSelector(newlyStartedOnArtKHIS.getNewlyStartedOnArtTrendsKHIS);

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
                    text: 'PERCENTAGE OF PATIENTS',
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
            },
            series: [
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: true,
                    },
                    name: 'DWH',
                    data: [3200, 10000, 9000, 2700, 1900, 7000, 5400, 7000, 7100, 8400, 7700, 7400],
                    color: '#2F4050',
                },
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: true
                    },
                    name: 'KHIS',
                    data: newlyKHIS.data,
                    color: '#1AB394',
                },
            ],
        });
    }, [newlyKHIS]);

    useEffect(() => {
        loadComparisonNewlyTrends();
    }, [loadComparisonNewlyTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TRENDS OF NEWLY STARTED PATIENTS ON ART
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

export default ComparisonNewlyTrends;
