import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const PrEPCascade = () => {
    const filters = useSelector(state => state.filters);
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
                    text: 'CASCADE',
                },
                categories: [
                    'TOTAL TESTED',
                    'SCREENED FOR PREP',
                    'ELIGIBLE FOR PREP',
                    'INITIATED PREP',
                    'CONTINUING ON PREP',
                    'CURRENT ON PREP',
                ],
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
                enabled: false,
            },
            colors: [
                '#142459',
                '#142459',
                '#142459',
                '#142459',
                '#142459',
                '#142459',
            ],
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'Percentage',
                    data: [
                        { y: 83.6, color: '#00a65a' },
                        { y: 78.8, color: '#142459' },
                        { y: 58.5, color: 'rgb(124, 181, 236)' },
                        { y: 20, color: '#3281CC' },
                        { y: 30, color: '#1AB394' },
                        { y: 40, color: 'rgb(144, 237, 125)' },
                    ],
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepOverall();
    }, [loadPrepOverall]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                PREP CASCADE
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prepOverall} />
            </CardBody>
        </Card>
    );
};

export default PrEPCascade;
