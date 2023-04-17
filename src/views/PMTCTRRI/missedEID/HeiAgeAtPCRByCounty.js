import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';


const HeiAgeAtPCRByCounty = () => {
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
                categories: ['Siaya', 'Homabay', 'Nairobi', 'Iten', 'Nandi'],
                crosshair: true,
                title: {
                    text: 'COUNTY',
                },
            },
            yAxis: [
                {
                    reversedStacks: false,
                    min: 0,
                    title: {
                        text: 'PERCENTAGE OF PATIENTS',
                    },
                },
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
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    type: 'column',
                    name: '0 - 2 MONTHS',
                    data: [132, 432, 232, 732, 443],
                    color: '#E06F07',
                },
                {
                    type: 'column',
                    name: '2 - 12 MONTHS',
                    data: [300, 432, 232, 192, 443],
                    color: '#142459',
                },
                {
                    type: 'column',
                    name: 'ABOVE 1 YR',
                    data: [532, 432, 432, 732, 443],
                    color: '#1AB394',
                },
                {
                    type: 'column',
                    name: 'MISSING',
                    data: [532, 432, 432, 732, 553],
                    color: '#BB1414',
                },
            ],
        });
    }, [eliVnew]);

    useEffect(() => {
        loadPrepEligibleVsNewInitiatedTrends();
    }, [loadPrepEligibleVsNewInitiatedTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                {`HEI AGE AT FIRST PCR BY COUNTY`}
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

export default HeiAgeAtPCRByCounty;
