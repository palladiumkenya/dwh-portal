import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/prepMonth1RefillSelector';

const PrEP1stMonthRefill = () => {
    const filters = useSelector((state) => state.filters);
    let month1 = useSelector(prepSelector.getPrepMonth1RefillAgeSex);

    const [prep1stMonthRefill, setPrep1stMonthRefill] = useState({});

    const loadPrep1stMonthRefill = useCallback(async () => {
        setPrep1stMonthRefill({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: month1.agegrp,
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
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'TOTAL REFILL MONTH 1',
                    data: month1.iniListRefill,
                    color: '#14084D',
                },
                {
                    name: 'TOTAL TESTED',
                    data: month1.iniListTested,
                    color: '#00a65a',
                },
                {
                    type: 'scatter',
                    name: '% OF PATIENTS REFILLED',
                    data: month1.perc,
                    color: 'orange',
                    marker: {
                        symbol: 'circle',
                    },
                    yAxis: 1,
                },
            ],
        });
    }, [month1]);

    useEffect(() => {
        loadPrep1stMonthRefill();
    }, [loadPrep1stMonthRefill]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                HIV TESTING AT 1ST MONTH PREP REFILL
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prep1stMonthRefill}
                />
            </CardBody>
        </Card>
    );
};

export default PrEP1stMonthRefill;
