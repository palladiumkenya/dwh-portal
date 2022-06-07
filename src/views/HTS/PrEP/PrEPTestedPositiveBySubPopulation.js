import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PrEPTestedPositiveBySubPopulation = () => {
    const filters = useSelector((state) => state.filters);
    const [prepCurrentBySubPopulation, setPrepCurrentBySubPopulation] =
        useState({});

    const loadPrepCurrentBySubPopulation = useCallback(async () => {
        setPrepCurrentBySubPopulation({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['MAY 2021', 'JUNE 2021','JULY 2021','AUGUST 2021','SEPTEMBER 2021','OCT 2021', 'NOV 2021', 'DEC 2021', 'JAN 2022'],
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
                column: {
                    stacking: 'number',
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            series: [
                {
                    name: 'DISCORDANT COUPLES',
                    data: [23.6, 46, 70, 22, 40, 32, 53, 64, 76],
                    color: '#142459',
                },
                {
                    name: 'GENERAL POPULATION',
                    data: [37, 24.8, 54, 12, 64, 68, 63, 73, 88],
                    color: 'orange',
                },
                {
                    name: 'PWD',
                    data: [15, 40, 23, 43, 44, 53,63,77, 82 ],
                    color: '#3281CC',
                },
                {
                    name: 'FSW',
                    data: [5, 8.8, 8, 64, 64,66,79,89,90],
                    color: 'rgb(144, 237, 125)',
                },
                {
                    name: 'MSM',
                    data: [13, 28, 12, 53, 43, 54, 43,43,43],
                    color: '#1AB394',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepCurrentBySubPopulation();
    }, [loadPrepCurrentBySubPopulation]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                CURRENT ON PREP BY SUB-POPULATION(JAN-2022)
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepCurrentBySubPopulation}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPTestedPositiveBySubPopulation;
