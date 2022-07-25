import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const PrEPEligibleVsNewlyBySubPopulation = () => {
    const filters = useSelector((state) => state.filters);
    const [
        prepEligibleVsNewlyBySubPopulation,
        setPrepEligibleVsNewlyBySubPopulation,
    ] = useState({});

    const loadPrepEligibleVsNewlyBySubPopulation = useCallback(async () => {
        setPrepEligibleVsNewlyBySubPopulation({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'DISCORDANT COUPLE',
                    'FSW',
                    'GENERAL POPULATION',
                    'MSM',
                    'PWID',
                ],
                crosshair: true,
                title: {
                    text: 'AGE',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS',
                },
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat:
                    '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
                shared: true,
            },
            plotOptions: {
                scatter: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}%',
                    }
                },
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            series: [
                {
                    name: 'ELIGIBLE',
                    data: [83.6, 66, 70, 22, 57],
                    color: '#142459',
                },
                {
                    name: 'NEW',
                    data: [50, 78.8, 88, 4, 44],
                    color: '#1AB394',
                },
                {
                    type: 'scatter',
                    name: '% of Patients Eligible',
                    data: [83.6, 78.8, 98,67, 97],
                    color: 'orange',
                    marker: {
                        symbol: 'circle',
                    },
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepEligibleVsNewlyBySubPopulation();
    }, [loadPrepEligibleVsNewlyBySubPopulation]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                ELIGIBLE VS NEWLY INITIALTED ON PREP BY SUB-POPULATION(JAN-2022)
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepEligibleVsNewlyBySubPopulation}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPEligibleVsNewlyBySubPopulation;
