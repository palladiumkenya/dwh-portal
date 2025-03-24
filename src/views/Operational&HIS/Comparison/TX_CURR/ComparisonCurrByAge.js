import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/currOnArtKHIS';


const ComparisonCurrByAge = () => {
    const [comparisonCurrByAge, setComparisonCurrByAge] = useState({});
    let currKHIS =  useSelector(currentOnArtKHIS.getCurrOnArtKHIS);

    const loadComparisonCurrByAge = useCallback(async () => {
        setComparisonCurrByAge({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'UNDER 1',
                    '1-9',
                    '10-14',
                    '15-19',
                    '20-24',
                    '25+',
                ],
                crosshair: true,
                title: {
                    text: 'AGE GROUP',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS',
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
                align: 'left',
                verticalAlign: 'top',
            },
            plotOptions: {
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'KHIS',
                    data: currKHIS.OnARTByAge,
                    color: '#2F4050',
                },
                {
                    name: 'DWH',
                    data: currKHIS.OnARTByAgeDWH,
                    color: '#1AB394',
                },
                {
                    name: 'SMART',
                    data: currKHIS.OnARTByAgeDWH,
                    color: '#a36a36',
                },
            ],
        });
    }, [currKHIS]);

    useEffect(() => {
        loadComparisonCurrByAge();
    }, [loadComparisonCurrByAge]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DISTRIBUTION OF PATIENTS CURRENT ON ART BY AGE
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonCurrByAge}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonCurrByAge;
