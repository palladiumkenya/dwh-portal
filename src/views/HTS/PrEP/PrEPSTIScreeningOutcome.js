import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const PrEPSTIScreeningOutcome = () => {
    const filters = useSelector((state) => state.filters);
    const [prepSTIScreeningOutcome, setPrepSTIScreeningOutcome] = useState({});

    const loadPrepSTIScreeningOutcome = useCallback(async () => {
        setPrepSTIScreeningOutcome({
            chart: {
                type: 'pie',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['TESTED', 'NOT TESTED'],
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
                    name: 'Tested',
                    data: [
                        { name: 'POSITIVE', y: 66, color: '#af3131' },
                        {
                            name: 'NEGATIVE',
                            y: 83.6,
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
        loadPrepSTIScreeningOutcome();
    }, [loadPrepSTIScreeningOutcome]);

    return (
        <Card>
            <CardHeader className="cardTitle">STI SCREENING OUTCOME</CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepSTIScreeningOutcome}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPSTIScreeningOutcome;
