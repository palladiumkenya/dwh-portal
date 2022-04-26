import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const PrEPUsePopulation1STMonth = () => {
    const filters = useSelector(state => state.filters);
    const [prepUsePopulation1STMonth, setPrepUsePopulation1STMonth] = useState({});

    const loadPrepUsePopulation1STMonth = useCallback(async () => {
        setPrepUsePopulation1STMonth({
            chart: {
                type: 'column'
            },
            title:{
                text:''
            },
            xAxis: {
                categories: [
                    'PREP CURR',
                    'PREP NEW',
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS'
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
                align: 'left',
                verticalAlign: 'top'
            },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    pointPadding: 0.2,
                    borderWidth: 0
                },
            },
            series: [{
                name: 'TO',
                data: [83.6, 66],
                color: '#2F4050'
            },{
                name: 'PWID',
                data: [87, 78.8],
                color: 'rgb(124, 181, 236)'
            },{
                name: 'PEOPLE IN PRISONS',
                data: [45, 70],
                color: '#3281CC'
            },{
                name: 'MSM',
                data: [50, 78.8],
                color: '#1AB394'
            },{
                name: 'FSW',
                data: [33.6, 68.8],
                color: 'rgb(144, 237, 125)'
            },]
        });
    }, []);

    useEffect(() => {
        loadPrepUsePopulation1STMonth();
    }, [loadPrepUsePopulation1STMonth]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                PREP USE BY POPULATION GROUP FOR 1ST MONTH
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prepUsePopulation1STMonth} />
            </CardBody>
        </Card>
    );
};

export default PrEPUsePopulation1STMonth;
