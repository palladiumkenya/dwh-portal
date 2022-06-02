import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const PrEPCurrentTrends = () => {
    const filters = useSelector((state) => state.filters);
    const [prepCurrentTrends, setPrepCurrentTrends] = useState({});

    const loadPrepCurrentTrends = useCallback(async () => {
        setPrepCurrentTrends({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'MAY-2021',
                    'JUN-2021',
                    'JUL-2021',
                    'AUG-2021',
                    'SEP-2021',
                    'OCT-2021',
                    'NOV-2021',
                    'DEC-2021',
                    'JAN-2022',
                ],
                crosshair: true,
                title: {
                    text: 'MONTHS',
                },
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
                enabled: false,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'Percentage',
                    data: [83.6, 78.8, 20, 30,21,12,73,34,45],
                    color: '#142459',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepCurrentTrends();
    }, [loadPrepCurrentTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                CURRENT ON PREP TRENDS (MAY 2021 - JAN 2022)
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepCurrentTrends}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPCurrentTrends;
