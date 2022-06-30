import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/newlyStartedOnArtKHIS';


const ComparisonNewlyByAge = () => {
    const filters = useSelector(state => state.filters);
    const [comparisonNewlyByAge, setComparisonNewlyByAge] = useState({});
    let newlyKHIS =  useSelector(newlyStartedOnArtKHIS.getNewlyStartedOnArtKHIS);

    const loadComparisonNewlyByAge = useCallback(async () => {
        setComparisonNewlyByAge({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['UNDER 1', '1-9', '10-14', '15-19', '20-24', '25+'],
                crosshair: true,
                title: {
                    text: 'AGE GROUP'
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
                data: newlyKHIS.newlyStartedByAge,
                color: "#1AB394"
            }]
        });
    }, [newlyKHIS]);

    useEffect(() => {
        loadComparisonNewlyByAge();
    }, [loadComparisonNewlyByAge]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DISTRIBUTION OF PATIENTS NEWLY STARTED ON ART BY GENDER
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonNewlyByAge}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonNewlyByAge;
