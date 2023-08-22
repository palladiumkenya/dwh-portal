import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';
import moment from 'moment';


const PrEPEligibleVsNewInitiatedTrends = () => {
    let eliVnew = useSelector(prepSelector.getPrepEligibleVnewTrend);
    const [
        prepEligibleVsNewInitiatedTrends,
        setPrepEligibleVsNewInitiatedTrends,
    ] = useState({});
    let filterMonth = moment(
        useSelector((state) => state.filters.fromDate),
        'MMM YYYY'
    )
        .format('MMMM YYYY')
        .toUpperCase();

    let month = useSelector((state) => state.filters.fromDate)
        ? filterMonth
        : `${eliVnew.monthRange.at(-1).toUpperCase()} - ${eliVnew.monthRange.at(0).toUpperCase()}`;

    const loadPrepEligibleVsNewInitiatedTrends = useCallback(async () => {
        setPrepEligibleVsNewInitiatedTrends({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: eliVnew.label,
                crosshair: true,
                title: {
                    text: 'MONTHS',
                },
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
                    name: 'TOTAL ELIGIBLE',
                    data: eliVnew.eliList,
                    color: '#2F4050',
                },
                {
                    type: 'column',
                    name: 'TOTAL INITIATED (NEW)',
                    data: eliVnew.iniList,
                    color: 'rgb(124, 181, 236)',
                },
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: false,
                    },
                    yAxis: 1,
                    crisp: false,
                    name: '% INITIATED',
                    data: eliVnew.perc,
                    color: 'orange',
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
                {`ELIGIBLE VS NEWLY INITIATED ON PREP TRENDS (${month})`}
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

export default PrEPEligibleVsNewInitiatedTrends;
