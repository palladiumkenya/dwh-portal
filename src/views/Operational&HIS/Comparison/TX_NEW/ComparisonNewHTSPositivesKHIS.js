import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/newlyStartedOnArtKHIS';
import * as htsPositivesTrendsKHIS from '../../../../selectors/Operational&HIS/Comparison/htsPositivesTrendsKHIS';


const ComparisonNewVsHTSPositivesKHIS = () => {
    const filters = useSelector(state => state.filters);
    const [comparisonNewVsHTSPositivesKHIS, setComparisonNewVsHTSPositivesKHIS] = useState({});

    const newlyKHIS =  useSelector(newlyStartedOnArtKHIS.getNewlyStartedOnArtTrendsKHIS);
    const htsKHIS =  useSelector(htsPositivesTrendsKHIS.getHTSPositivesTrendsKHIS);

    const loadComparisonNewVsHTSPositivesKHIS = useCallback(async () => {
        setComparisonNewVsHTSPositivesKHIS({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories:  newlyKHIS.labels,
                crosshair: true,
                title: {
                    text: 'MONTHS',
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
                scatter: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}%',
                    },
                },
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'TOTAL NEW ON TREATMENT',
                    data: newlyKHIS.data,
                    color: '#14084D',
                    dataLabels: { enabled: true },
                },
                {
                    name: 'TOTAL HTS POSITIVES',
                    data: htsKHIS.data,
                    color: '#00a65a',
                    dataLabels: { enabled: true },
                }
            ],
        });
    }, [newlyKHIS]);

    useEffect(() => {
        loadComparisonNewVsHTSPositivesKHIS();
    }, [loadComparisonNewVsHTSPositivesKHIS]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                NEW ON TREATMENT COMPARED TO HTS POSITIVES - KHIS
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={comparisonNewVsHTSPositivesKHIS}/>
            </CardBody>
        </Card>
    );
};

export default ComparisonNewVsHTSPositivesKHIS;
