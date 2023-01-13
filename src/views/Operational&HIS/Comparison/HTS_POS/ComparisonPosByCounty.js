import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as htsPosKHIS from '../../../../selectors/Operational&HIS/Comparison/htsPosByCountyKHIS';


const ComparisonPosByCounty = () => {
    const [comparisonPosByCounty, setComparisonPosByCounty] = useState({});
    let posKHIS = useSelector(htsPosKHIS.getHTSPOSByCountyKHIS);

    const loadComparisonCurrByCounty = useCallback(async () => {
        setComparisonPosByCounty({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: posKHIS.labels,
                crosshair: true,
                title: {
                    text: 'COUNTY',
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
                    data: posKHIS.data,
                    color: '#2F4050',
                    dataLabels: { enabled: true },
                },
                {
                    name: 'DWH',
                    data: posKHIS.dataDwh,
                    color: '#1AB394',
                    dataLabels: { enabled: true },
                },
            ],
        });
    }, [posKHIS]);

    useEffect(() => {
        loadComparisonCurrByCounty();
    }, [loadComparisonCurrByCounty]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DISTRIBUTION OF PATIENTS TESTED HIV POSITIVE BY COUNTY
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonPosByCounty}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonPosByCounty;
