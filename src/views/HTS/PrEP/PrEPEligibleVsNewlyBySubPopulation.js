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
                categories: ['15 TO 19', '20 TO 24', '25+'],
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
                    data: [83.6, 66, 70],
                    color: '#2F4050',
                },
                {
                    name: 'ELIGIBLE',
                    data: [87, 78.8, 54],
                    color: 'rgb(124, 181, 236)',
                },
                {
                    name: 'INITIATED TO PREP',
                    data: [45, 70, 23],
                    color: '#3281CC',
                },
                {
                    name: 'CONTINUING PREP',
                    data: [50, 78.8, 88],
                    color: '#1AB394',
                },
                {
                    name: 'CURRENT ON PREP',
                    data: [33.6, 68.8, 12],
                    color: 'rgb(144, 237, 125)',
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
