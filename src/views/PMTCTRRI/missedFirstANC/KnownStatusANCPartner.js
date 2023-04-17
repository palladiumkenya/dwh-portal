import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as missedFirstANCSelectors from '../../../selectors/PMTCTRRI/MissedFirstANC';

const KnownStatusANCPartner = () => {
    const missedFirstANC = useSelector(
        missedFirstANCSelectors.getMissedFirstANCSDP
    );
    const [
        missedFirstANCSDP,
        setMissedFirstANCSDP,
    ] = useState({});
    

    const loadMissedFirstANCSDP = useCallback(async () => {
        setMissedFirstANCSDP({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: missedFirstANC.sdp,
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
                    data: missedFirstANC.FirstANC,
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
                    data: missedFirstANC.HIVTested,
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
                    data: missedFirstANC.SyphilisTested,
                    color: 'teal',
                },
            ],
        });
    }, [missedFirstANC]);

    useEffect(() => {
        loadMissedFirstANCSDP();
    }, [loadMissedFirstANCSDP]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                {`KNOWN HIV STATUS AT FIRST ANC AND SYPHYLIS TESTING COVERAGE BY PARTNER`}
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={missedFirstANCSDP}
                />
            </CardBody>
        </Card>
    );
};

export default KnownStatusANCPartner;
