import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';
import * as missedEIDTestingSelectors from '../../../selectors/PMTCTRRI/MissedEIDTesting';


const HeiAgeAtPCRByPartner = () => {
    const missedEIDTesting = useSelector(
        missedEIDTestingSelectors.getMissedEIDTestingSDP
    );
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
                categories: missedEIDTesting.sdp,
                crosshair: true,
                title: {
                    text: 'PARTNER',
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
                    data: missedEIDTesting.lesst2Months,
                    color: '#E06F07',
                },
                {
                    type: 'column',
                    name: '2 - 12 MONTHS',
                    data: missedEIDTesting.within12Months,
                    color: '#142459',
                },
                {
                    type: 'column',
                    name: 'ABOVE 1 YR',
                    data: missedEIDTesting.above1Year,
                    color: '#1AB394',
                },
                {
                    type: 'column',
                    name: 'MISSING',
                    data: missedEIDTesting.missingPCRTests,
                    color: '#BB1414',
                },
            ],
        });
    }, [missedEIDTesting]);

    useEffect(() => {
        loadPrepEligibleVsNewInitiatedTrends();
    }, [loadPrepEligibleVsNewInitiatedTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                {`HEI AGE AT FIRST PCR BY PARTNER`}
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

export default HeiAgeAtPCRByPartner;
