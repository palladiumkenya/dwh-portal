import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/newlyStartedOnArtKHIS';


const ComparisonNewlyByAge = () => {
    const [comparisonNewlyByAge, setComparisonNewlyByAge] = useState({});
    let newlyKHIS =  useSelector(newlyStartedOnArtKHIS.getNewlyStartedOnArtKHIS);

    const loadComparisonNewlyByAge = useCallback(async () => {
        setComparisonNewlyByAge({
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
                    data: newlyKHIS.newlyStartedByAge,
                    color: '#2F4050',
                },
                {
                    name: 'DWH',
                    data: newlyKHIS.newOnARTByAgeDWH,
                    color: '#1AB394',
                },
                {
                    name: 'SMART',
                    data: newlyKHIS.newOnARTByAgeDWH,
                    color: '#b36a36',
                },
            ],
        });
    }, [newlyKHIS]);

    useEffect(() => {
        loadComparisonNewlyByAge();
    }, [loadComparisonNewlyByAge]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DISTRIBUTION OF PATIENTS NEWLY STARTED ON ART BY AGE
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonNewlyByAge}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonNewlyByAge;
