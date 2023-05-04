import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as missedVLSelector from '../../../selectors/PMTCTRRI/MissedViralLoad';

const VLNonSupressionPartner = () => {
    let missedVL = useSelector(missedVLSelector.getMissedViralLoadSDPNonSup);
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
                categories: missedVL.sdp,
                crosshair: true,
                title: {
                    text: 'PARTNER',
                },
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
                    name: '',
                    data: missedVL.data,
                    color: '#142459',
                },
            ],
        });
    }, [missedVL]);

    useEffect(() => {
        loadPrepEligibleVsNewInitiatedTrends();
    }, [loadPrepEligibleVsNewInitiatedTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                {`NUMBER OF VIRAL LOAD NON SUPPRESION BY PARTNER`}
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

export default VLNonSupressionPartner;
