import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CompletenessByPartner = () => {
    const [accuracyByPartner, setaccuracyByPartner] = useState({});
    let data =  [{ y: 93 }, { y:78 }, { y:80 }, { y:90 }, { y:32 }, { y:58 }, { y:58 }, { y:58 }, { y:20 }].sort((a, b) => b.y - a.y)
    data.forEach((item, index) => {
        if (item.y >= 51 && item.y <= 89) item.color = '#f7941d'
        else if (item.y >= 90) item.color = '#00AD30'
        else item.color = '#BB1414'

    })

    const loadaccuracyByPartner = useCallback(async () => {
        setaccuracyByPartner({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [
                    'AMREF', 'AHF', 'AFYA JIJINI', 'CHS SHINIDA', 'HCM', 'EDARP', 'KHALSA', 'UMB TIMIZA', 'CHAK CHAP'
                ],
                crosshair: true,
                title: {
                 text: 'SERVICE DELIVERY PARTNER'
                }
            },
            yAxis: {
                min: 0,
                max: 120,
                title: { text: 'PERCENTAGE OF PATIENTS' },
                labels: { overflow: 'justify' }
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
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
            series: [
                {
                    name: 'Records',
                    data: data
                }
            ]
        });
    }, []);

    useEffect(() => {
        loadaccuracyByPartner();
    }, [loadaccuracyByPartner]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                OVERALL COMPLETENESS BY PARTNER
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={accuracyByPartner}
                />
            </CardBody>
        </Card>
    );
};

export default CompletenessByPartner;
