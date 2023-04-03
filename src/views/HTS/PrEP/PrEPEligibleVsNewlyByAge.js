import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';


const PrEPEligibleVsNewlyByAge = () => {
    const filters = useSelector((state) => state.filters);
    let eliVnew = useSelector(prepSelector.getPrepEligibleAgeGroup);

    const [prepEligibleVsNewlyByAge, setPrepEligibleVsNewlyByAge] = useState(
        {}
    );

    const loadPrepEligibleVsNewlyByAge = useCallback(async () => {
        setPrepEligibleVsNewlyByAge({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['15 TO 19', '20 TO 24', '25+'],
                crosshair: true,
            },
            yAxis: [
                {
                    min: 0,
                    title: {
                        text: 'NUMBER OF PATIENTS',
                    },
                },
                {
                    labels: {
                        style: {
                            color: 'orange',
                        },
                    },
                    title: {
                        text: 'PERCENTAGE OF PATIENTS',
                        style: {
                            color: 'orange',
                        },
                    },
                    opposite: true,
                    // max: 100
                },
            ],
            legend: {
                align: 'left',
                verticalAlign: 'top',
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
            plotOptions: {
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
                spline: {
                    lineWidth: 0,
                },
            },
            series: [
                {
                    type: 'column',
                    name: 'ELIGIBLE',
                    data: eliVnew.eliList,
                    color: '#142459',
                },
                {
                    type: 'column',
                    name: 'NEWLY INITIATED',
                    data: eliVnew.iniList,
                    color: 'rgb(124, 181, 236)',
                },
                {
                    type: 'spline',
                    name: '% of Patients Eligible',
                    data: eliVnew.perc,
                    color: 'orange',
                    yAxis: 1,
                    marker: {
                        symbol: 'circle',
                    },
                },
            ],
        });
    }, [eliVnew]);

    useEffect(() => {
        loadPrepEligibleVsNewlyByAge();
    }, [loadPrepEligibleVsNewlyByAge]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                ELIGIBLE VS NEWLY INITIATED ON PrEP BY AGE AS AT{' '}
                {moment()
                    .subtract(2, 'month')
                    .add(17, 'days')
                    .format('MMM YYYY')}
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepEligibleVsNewlyByAge}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPEligibleVsNewlyByAge;
