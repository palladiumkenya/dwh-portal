import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment';


const PrEPEligibleVsNewlyByAge = () => {
    const filters = useSelector((state) => state.filters);
    const [prepEligibleVsNewlyByAge, setPrepEligibleVsNewlyByAge] = useState(
        {}
    );

    const loadPrepEligibleVsNewlyByAge = useCallback(async () => {
        setPrepEligibleVsNewlyByAge({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['15 TO 19', '20 TO 24', '25+'],
                crosshair: true,
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
                    },
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
                    type: 'column',
                    name: 'ELIGIBLE',
                    data: [12, 20, 43],
                    color: '#142459',
                },
                {
                    type: 'column',
                    name: 'NEWLY INITIATED',
                    data: [53, 64, 14],
                    color: 'rgb(124, 181, 236)',
                },
                {
                    type: 'scatter',
                    name: '% of Patients Eligible',
                    data: [83.6, 78.8, 98],
                    color: 'orange',
                    marker: {
                        symbol: 'circle',
                    },
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepEligibleVsNewlyByAge();
    }, [loadPrepEligibleVsNewlyByAge]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                ELIGIBLE VS NEWLY INITIATED ON PrEP BY AGE AS AT{' '}
                {moment(filters.date).format('MMM YYYY')}
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepEligibleVsNewlyByAge}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPEligibleVsNewlyByAge;
