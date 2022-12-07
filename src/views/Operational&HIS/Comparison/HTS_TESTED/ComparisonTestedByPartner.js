import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/currOnARTByPartnerKHIS';
import * as htsTest from '../../../../selectors/Operational&HIS/Comparison/htsTestByPartnerKHIS';


const ComparisonTestedByPartner = () => {
    const [comparisonTestByPartner, setComparisonTestByPartner] = useState({});
    let testKHIS = useSelector(htsTest.getHTSTESTByPartnerKHIS);

    const loadComparisonCurrByPartner = useCallback(async () => {
        setComparisonTestByPartner({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: testKHIS.labels,
                crosshair: true,
                title: {
                    text: 'SERVICE DELIVERY PARTNER',
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
                    data: testKHIS.data,
                    color: '#2F4050',
                    dataLabels: { enabled: true },
                },
                {
                    name: 'DWH',
                    data: testKHIS.dataDwh,
                    color: '#1AB394',
                    dataLabels: { enabled: true },
                },
            ],
        });
    }, [testKHIS]);

    useEffect(() => {
        loadComparisonCurrByPartner();
    }, [loadComparisonCurrByPartner]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DISTRIBUTION OF PATIENTS TESTED BY SERVICE DELIVERY PARTNERS
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={comparisonTestByPartner}
                />
            </CardBody>
        </Card>
    );
};

export default ComparisonTestedByPartner;
