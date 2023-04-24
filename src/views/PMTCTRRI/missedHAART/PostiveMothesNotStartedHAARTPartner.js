import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as missedHAARTSelectors from '../../../selectors/PMTCTRRI/MissedHAART';

const PostiveMothesNotStartedHAARTPartner = () => {
    const missedHaart = useSelector(missedHAARTSelectors.getMissedHAARTSDP);

    const [prepOverall, setPrepOverall] = useState({});

    const loadPrepOverall = useCallback(async () => {
        setPrepOverall({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                title: {
                    text: 'PARTNER',
                },
                categories: missedHaart.sdp,
                crosshair: true,
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
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    stacking: 'percent',
                },
            },
            series: [
                {
                    name: 'NEW POSITIVE',
                    color: '#00a65a',
                    data: missedHaart.newpos,
                },
                {
                    name: 'KNOWN POSITIVE',
                    color: '#142459',
                    data: missedHaart.known,
                },
            ],
        });
    }, [missedHaart]);

    useEffect(() => {
        loadPrepOverall();
    }, [loadPrepOverall]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                NUMBER OF HIV POSITIVE MOTHERS NOT STARTED ON HAART BY PARTNER
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepOverall}
                />
            </CardBody>
        </Card>
    );
};

export default PostiveMothesNotStartedHAARTPartner;
