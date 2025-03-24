import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/currOnARTByCountyKHIS';


const ComparisonCurrByCounty = () => {
    const [comparisonCurrByCounty, setComparisonCurrByCounty] = useState({});
    let currKHIS = useSelector(currentOnArtKHIS.getCurrentOnARTByCountyKHIS);

    const loadComparisonCurrByCounty = useCallback(async () => {
        setComparisonCurrByCounty({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: currKHIS.labels,
                crosshair: true,
                title: {
                    text: 'COUNTY'
                }
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
                align: 'left',
                verticalAlign: 'top'
            },
            plotOptions: {
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'DWH',
                data: currKHIS.dataDwh,
                color: '#2F4050', dataLabels: { enabled: true }
            }, {
                name: 'SMART',
                data: currKHIS.dataDwh,
                color: '#a36a36', dataLabels: { enabled: true }
            }, {
                name: 'KHIS',
                data: currKHIS.data,
                color: '#1AB394', dataLabels: { enabled: true }
            }]
        });
    }, [currKHIS]);

    useEffect(() => {
        loadComparisonCurrByCounty();
    }, [loadComparisonCurrByCounty]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DISTRIBUTION OF PATIENTS CURRENT ON ART BY COUNTY
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonCurrByCounty}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonCurrByCounty;
