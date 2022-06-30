import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const ComparisonNewVsHTSPositivesKHIS = () => {
    const filters = useSelector(state => state.filters);
    const [comparisonNewVsHTSPositivesKHIS, setComparisonNewVsHTSPositivesKHIS] = useState({});

    const loadComparisonNewVsHTSPositivesKHIS = useCallback(async () => {
        setComparisonNewVsHTSPositivesKHIS({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'JAN 2021', 'FEB 2021', 'MAR-2021', 'APR-2021', 'MAY-2021', 'JUN-2021', 'JUL-2021', 'AUG-2021', 'SEP-2021', 'OCT-2021', 'NOV-2021', 'DEC-2021'
                ],
                crosshair: true,
                title: {
                    text: 'MONTHS',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS',
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
                    name: 'TOTAL NEW ON TREATMENT',
                    data: [23.6, 78.8, 98.5, 20, 10, 50, 70, 20, 90 ,10, 20, 30],
                    color: '#14084D',
                },
                {
                    name: 'TOTAL HTS POSITIVES',
                    data: [18, 45, 90, 27, 19, 70, 50, 70, 100, 40, 30, 50],
                    color: '#00a65a',
                }
            ],
        });
    }, []);

    useEffect(() => {
        loadComparisonNewVsHTSPositivesKHIS();
    }, [loadComparisonNewVsHTSPositivesKHIS]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                NEW ON TREATMENT COMPARED TO HTS POSITIVES - KHIS
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonNewVsHTSPositivesKHIS}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonNewVsHTSPositivesKHIS;
