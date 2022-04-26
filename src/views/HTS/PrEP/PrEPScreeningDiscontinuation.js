import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const PrEPDiscontinuation = () => {
    const filters = useSelector(state => state.filters);
    const [prepDiscontinuation, setPrepDiscontinuation] = useState({});

    const loadPrepDiscontinuation = useCallback(async () => {
        setPrepDiscontinuation({
            chart: {
                type: 'column'
            },
            title:{
                text:''
            },
            xAxis: {
                categories: [
                    'HIV TEST IS POSITIVE',
                    'RENAL DYSFUNCTION',
                    'VIRAL SUPPRESSION OF HIV+',
                    'NOT ADHERENT TO PREP',
                    'TOO MANY HIV TESTS',
                    'CLIENT REQUEST',
                    'INTIMATE PARTNERS VIOLENCE',
                    'SELF DISCONTINUATION',
                    'LOW RISK OF HIV',
                    'ADVERSE DRUG REACTION',
                    'DIED',
                    'TRANSFERRED OUT',
                    'DEFAULTERS (MISSED DRUGS PICK UPS)',
                    'PARTNER REFUSAL',
                    'OTHER'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Percentage',
                data: [83.6, 78.8, 98.5, 20, 10, 88, 63, 47, 55, 66, 24, 15, 78, 50, 20],
                color: '#142459'

            },]
        });
    }, []);

    useEffect(() => {
        loadPrepDiscontinuation();
    }, [loadPrepDiscontinuation]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                PREP DISCONTINUATION
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prepDiscontinuation} />
            </CardBody>
        </Card>
    );
};

export default PrEPDiscontinuation;
