import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/newlyStartedOnArtKHIS';


const ComparisonCurrByPartner = () => {
    const [comparisonCurrByAge, setComparisonCurrByAge] = useState({});
    let currKHIS =  useSelector(newlyStartedOnArtKHIS.getNewlyStartedOnArtKHIS);

    const loadComparisonCurrByAge = useCallback(async () => {
        setComparisonCurrByAge({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['AHF', 'BHF', 'CHF', 'DHF', 'EHF', 'FHF', 'GHF', 'HHF', 'IHF', 'JHF', 'KHF', 'LHF', 'MHF', 'NHF', 'OHF', 'PHF', 'QHF', 'RHF', 'SHF', 'THF', 'UHF', 'VHF', 'WHF', 'XHF', 'YHF', 'ZHF'],
                crosshair: true,
                title: {
                    text: 'SERVICE DELIVERY PARTNER'
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
                verticalAlign: 'top',
            },
            plotOptions: {
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'DWH',
                data: [236, 788, 641, 589, 542, 842],
                color: '#2F4050'
            }, {
                name: 'KHIS',
                data: currKHIS.newlyStartedByAge,
                color: "#1AB394"
            }]
        });
    }, [currKHIS]);

    useEffect(() => {
        loadComparisonCurrByAge();
    }, [loadComparisonCurrByAge]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DISTRIBUTION OF PATIENTS CURRENT ON ART BY SERVICE DELIVERY PARTNER
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonCurrByAge}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonCurrByPartner;
