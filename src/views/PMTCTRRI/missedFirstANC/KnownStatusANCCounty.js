import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as missedFirstANCSelectors from '../../../selectors/PMTCTRRI/MissedFirstANC';

const KnownStatusANCCounty = () => {
    const missedFirstANC = useSelector(
        missedFirstANCSelectors.getMissedFirstANCCounty
    );
    const [
        missedFirstANCCounty,
        setMissedFirstANCCounty,
    ] = useState({});
    

    const loadMissedFirstANCCounty = useCallback(async () => {
        setMissedFirstANCCounty({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: missedFirstANC.counties,
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
                    color: '#BB1414',
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
        loadMissedFirstANCCounty();
    }, [loadMissedFirstANCCounty]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                {`KNOWN HIV STATUS AT FIRST ANC AND SYPHYLIS TESTING COVERAGE BY COUNTY`}
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={missedFirstANCCounty}
                />
            </CardBody>
        </Card>
    );
};

export default KnownStatusANCCounty;
