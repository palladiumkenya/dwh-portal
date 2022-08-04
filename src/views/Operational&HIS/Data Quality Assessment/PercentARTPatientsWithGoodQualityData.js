import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PercentARTPatientsWithGoodQualityData = () => {
    const [percentARTPatientsWithGoodQualityData, setPercentARTPatientsWithGoodQualityData] = useState({});

    const loadPercentARTPatientsWithGoodQualityData = useCallback(async () => {
        setPercentARTPatientsWithGoodQualityData({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'VISIT TYPE', 'CCC', 'DATE OF BIRTH', 'SEX', 'CURRENT ART REGIMEN (LAST VISIT)', 'DRUG DOSAGE (DURATION)', 'WEIGHT (KGS)', 'HEIGHT (CMS)',
                    'NUTRITION ASSESSMENT DONE', 'TPT/IPT INITIATED', 'DSD MODEL', 'LAST LATEST VALID VL RESULT DOCUMENTED', 'DATE OF LAST APPOINTMENT'
                ],
                crosshair: true,
                title: {
                    text: 'VARIABLE',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE',
                },
                max: 100
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
                enabled: false,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'Patients',
                    data: [90, 87,77,89,14,90,90,96,79,90,69,92],
                    color: '#2F4050',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPercentARTPatientsWithGoodQualityData();
    }, [loadPercentARTPatientsWithGoodQualityData]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                PERCENT OF ART PATIENTS WITH GOOD QUALITY DATA
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={percentARTPatientsWithGoodQualityData}
                />
            </CardBody>
        </Card>
    );
};

export default PercentARTPatientsWithGoodQualityData;
