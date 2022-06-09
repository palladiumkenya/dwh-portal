import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PrEPCurrentBySubPopulation = () => {
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
                categories: ['OCT 2021', 'NOV 2021', 'DEC 2021', 'JAN 2022'],
                crosshair: true,
                title: {
                    text: 'AGE',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS',
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
                    stacking: 'percent',
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            series: [
                {
                    name: 'SCREENED',
                    data: [83.6, 66, 70, 22],
                    color: '#2F4050',
                },
                {
                    name: 'ELIGIBLE',
                    data: [87, 78.8, 54, 12],
                    color: 'rgb(124, 181, 236)',
                },
                {
                    name: 'INITIATED TO PREP',
                    data: [45, 70, 23, 43],
                    color: '#3281CC',
                },
                {
                    name: 'CONTINUING PREP',
                    data: [50, 78.8, 88, 64],
                    color: '#1AB394',
                },
                {
                    name: 'CURRENT ON PREP',
                    data: [33.6, 68.8, 12, 33],
                    color: 'rgb(144, 237, 125)',
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

export default PrEPCurrentBySubPopulation;
