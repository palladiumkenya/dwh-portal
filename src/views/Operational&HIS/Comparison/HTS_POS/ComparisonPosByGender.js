import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as htsPosKHIS from '../../../../selectors/Operational&HIS/Comparison/htsPosByGenderKHIS';


const ComparisonPosByGender = () => {
    const filters = useSelector((state) => state.filters);
    const [comparisonPosByGender, setComparisonPosByGender] = useState({});
    let posKHIS = useSelector(htsPosKHIS.getHTSPOSKHIS);
    

    const loadComparisonNewlyByGender = useCallback(async () => {
        setComparisonPosByGender({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['KHIS', 'DWH'],
                crosshair: true,
                title: {
                    text: 'Source',
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
                    name: 'MALE',
                    data: [posKHIS.malesPositive, posKHIS.genderDWH.male],
                    color: '#14084D',
                    dataLabels: { enabled: true },
                },
                {
                    name: 'FEMALE',
                    data: [posKHIS.femalesPositive, posKHIS.genderDWH.female],
                    color: '#EA4C8B',
                    dataLabels: { enabled: true },
                },
            ],
        });
    }, [posKHIS.malesPositive, posKHIS.femalesPositive, posKHIS.genderDWH]);

    useEffect(() => {
        loadComparisonNewlyByGender();
    }, [loadComparisonNewlyByGender]);

    return (
        <Card>
            <CardHeader className="cardTitle">TESTED HIV POSITIVE BY GENDER</CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={comparisonPosByGender}
                />
            </CardBody>
        </Card>
    );
};

export default ComparisonPosByGender;
