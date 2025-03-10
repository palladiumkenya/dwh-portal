import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtByAgeSexSelectors from '../../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import * as htsTestKHIS from '../../../../selectors/Operational&HIS/Comparison/htsTestByGenderKHIS';


const ComparisonTestedByGender = () => {

    const [comparisonNewlyByGender, setComparisonNewlyByGender] = useState({});
    let testKHIS = useSelector(htsTestKHIS.getHTSTESTKHIS);
    const currentOnArtBySexData = useSelector(
        currentOnArtByAgeSexSelectors.getCurrentOnArtBySex
    ); // Sex info for DWH

    const loadComparisonNewlyByGender = useCallback(async () => {
        setComparisonNewlyByGender({
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
                    text: 'SOURCE',
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
                    data: [testKHIS.malesTested, testKHIS.genderDWH.male],
                    color: '#14084D',
                    dataLabels: { enabled: true },
                },
                {
                    name: 'FEMALE',
                    data: [testKHIS.femalesTested, testKHIS.genderDWH.female],
                    color: '#EA4C8B',
                    dataLabels: { enabled: true },
                },
            ],
        });
    }, [testKHIS.malesTested, testKHIS.femalesTested, testKHIS.genderDWH]);

    useEffect(() => {
        loadComparisonNewlyByGender();
    }, [loadComparisonNewlyByGender]);

    return (
        <Card>
            <CardHeader className="cardTitle">HTS TESTED BY SEX</CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={comparisonNewlyByGender}
                />
            </CardBody>
        </Card>
    );
};

export default ComparisonTestedByGender;
