import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as missedEIDTestingSelectors from '../../../selectors/PMTCTRRI/MissedEIDTesting';

const HeiAgeAtPCR = () => {
    const missedEIDTesting = useSelector(
        missedEIDTestingSelectors.getMissedEIDTestingAgePCR
    );
    const [
        missedEIDTestingAtFirstPCR,
        setMissedEIDTestingAtFirstPCR,
    ] = useState({});

    const loadMissedEIDTestingAtFirstPCR = useCallback(async () => {
        setMissedEIDTestingAtFirstPCR({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    '0 - 2 MONTHS',
                    '2 - 12 MONTHS',
                    'ABOVE 1 YR',
                    'MISSING',
                ],
                crosshair: true,
            },
            yAxis: [
                {
                    min: 0,
                    title: {
                        text: 'NUMBER OF PATIENTS',
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
            legend: {
                enabled: false,
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
                    data: [
                        {
                            y: missedEIDTesting.lesst2Months,
                            color: '#142459',
                        },
                        {
                            y: missedEIDTesting.within12Months,
                            color: '#1AB394',
                        },
                        {
                            y: missedEIDTesting.above1Year,
                            color: '#142459',
                        },
                        {
                            y: missedEIDTesting.missingPCRTests,
                            color: '#BB1414',
                        },
                    ],
                },
            ],
        });
    }, [missedEIDTesting]);

    useEffect(() => {
        loadMissedEIDTestingAtFirstPCR();
    }, [loadMissedEIDTestingAtFirstPCR]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                {`HEI AGE AT FIRST PCR`}
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={missedEIDTestingAtFirstPCR}
                />
            </CardBody>
        </Card>
    );
};

export default HeiAgeAtPCR;
