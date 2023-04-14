import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';

const KnownStatusANCCounty = () => {
    let eliVnew = useSelector(prepSelector.getPrepEligibleVnewTrend);
    const [
        prepEligibleVsNewInitiatedTrends,
        setPrepEligibleVsNewInitiatedTrends,
    ] = useState({});
    

    const loadPrepEligibleVsNewInitiatedTrends = useCallback(async () => {
        setPrepEligibleVsNewInitiatedTrends({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['NA', 'BO', 'VV'],
                crosshair: true,
                title: {
                    text: 'COUNTY',
                },
            },
            yAxis: [
                {
                    min: 0,
                    title: {
                        text: 'NUMBER OF PATIENTS',
                    },
                },
                // {
                //     labels: {
                //         style: {
                //             color: 'orange',
                //         },
                //     },
                //     title: {
                //         text: 'PERCENTAGE OF PATIENTS',
                //         style: {
                //             color: 'orange',
                //         },
                //     },
                //     opposite: true,
                // },
            ],
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
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    type: 'column',
                    name: 'PREGNANT MOTHERS',
                    data: [132, 432, 657, 70],
                    color: '#142459',
                },
                {
                    type: 'spline',
                    dashStyle: 'dash',
                    marker: {
                        enabled: false,
                    },
                    crisp: false,
                    name: 'KNOWN HIV STATUS AT FIRST ANC',
                    data: [132, 43, 65, 55],
                    color: 'maroon',
                },
                {
                    type: 'spline',
                    dashStyle: 'dash',
                    marker: {
                        enabled: false,
                    },
                    crisp: false,
                    name: 'TESTED FOR SYPHYLIS',
                    data: [13, 132, 267, 370],
                    color: 'teal',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepEligibleVsNewInitiatedTrends();
    }, [loadPrepEligibleVsNewInitiatedTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                {`KNOWN HIV STATUS AT FIRST ANC AND SYPHYLIS TESTING COVERAGE BY COUNTY`}
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepEligibleVsNewInitiatedTrends}
                />
            </CardBody>
        </Card>
    );
};

export default KnownStatusANCCounty;
