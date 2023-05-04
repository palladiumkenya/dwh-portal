import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/prepMonth3RefillSelector';

const PrEP3RDMonthRefill = () => {
    let month3 = useSelector(prepSelector.getPrepMonth3RefillAgeSex);
    const [prep3RDMonthRefill, setPrep3RDMonthRefill] = useState({});

    const loadPrep3RDMonthRefill = useCallback(async () => {
        setPrep3RDMonthRefill({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: month3.agegrp,
                crosshair: true,
                title: {
                    text: 'AGE GROUP',
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
                scatter: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}%',
                    },
                },
                spline: {
                    lineWidth: 0,
                },
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'TOTAL REFILL MONTH 1',
                    data: month3.iniListRefill,
                    color: '#14084D',
                },
                {
                    name: 'TOTAL TESTED',
                    data: month3.iniListTested,
                    color: '#00a65a',
                },
                {
                    type: 'spline',
                    name: '% OF PATIENTS REFILLED',
                    data: month3.perc,
                    color: 'orange',
                    marker: {
                        symbol: 'circle',
                    },
                    yAxis: 1,
                },
            ],
        });
    }, [month3]);

    useEffect(() => {
        loadPrep3RDMonthRefill();
    }, [loadPrep3RDMonthRefill]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                HIV TESTING AT 3RD MONTH PREP REFILL
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prep3RDMonthRefill}
                />
            </CardBody>
        </Card>
    );
};

export default PrEP3RDMonthRefill;
