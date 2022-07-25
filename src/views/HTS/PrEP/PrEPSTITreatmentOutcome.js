import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const PrEPSTITreatmentOutcome = () => {
    const filters = useSelector((state) => state.filters);
    const [prepSTITreatmentOutcome, setPrepSTITreatmentOutcome] = useState({});

    const loadPrepSTITreatmentOutcome = useCallback(async () => {
        setPrepSTITreatmentOutcome({
            chart: {
                type: 'pie',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['TREATED', 'NOT TREATED'],
                crosshair: true,
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{point.key}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                shadow: false,
            },
            plotOptions: {
                pie: {
                    shadow: false,
                },
            },
            series: [
                {
                    name: 'TREATMENT',
                    data: [
                        { name: 'NOT TREATED', y: 36, color: '#af3131' },
                        {
                            name: 'TREATED',
                            y: 66,
                            color: 'rgb(10, 150, 25)',
                        },
                    ],
                    size: '60%',
                    innerSize: '80%',
                    showInLegend: true,
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepSTITreatmentOutcome();
    }, [loadPrepSTITreatmentOutcome]);

    return (
        <Card>
            <CardHeader className="cardTitle">STI TREATMENT OUTCOME</CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepSTITreatmentOutcome}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPSTITreatmentOutcome;
