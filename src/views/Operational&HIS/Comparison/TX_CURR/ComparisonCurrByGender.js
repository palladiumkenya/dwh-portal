import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/currOnArtKHIS';
import * as currentOnArtByAgeSexSelectors from '../../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';


const ComparisonCurrByGender = () => {
    const filters = useSelector(state => state.filters);
    const [comparisonNewlyByGender, setComparisonNewlyByGender] = useState({});
    let currKHIS =  useSelector(currentOnArtKHIS.getCurrOnArtKHIS);
    const currentOnArtBySexData = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtBySex); // Sex info for DWH

    const loadComparisonNewlyByGender = useCallback(async () => {
        setComparisonNewlyByGender({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['KHIS', 'DWH'],
                crosshair: true,
                title: {
                    text: 'Source'
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
                name: 'MALE',
                data: [currKHIS.malesOnART, currentOnArtBySexData.currentOnArtMale],
                color: '#14084D',
                dataLabels: { enabled: true },
            }, {
                name: 'FEMALE',
                data: [currKHIS.femalesOnART, currentOnArtBySexData.currentOnArtFemale],
                color: "#EA4C8B",
                dataLabels: { enabled: true },
            }]
        });
    }, [currKHIS.malesOnART, currKHIS.femalesOnART, currentOnArtBySexData.currentOnArtMale, currentOnArtBySexData.currentOnArtFemale]);

    useEffect(() => {
        loadComparisonNewlyByGender();
    }, [loadComparisonNewlyByGender]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                CURRENT ON ART BY GENDER
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonNewlyByGender}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonCurrByGender;
