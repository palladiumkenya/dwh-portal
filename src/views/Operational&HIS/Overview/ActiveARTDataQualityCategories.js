import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ActiveARTDataQualityCategories = () => {
    const filters = useSelector((state) => state.filters);
    const [activeARTDataQualityCategories, setActiveARTDataQualityCategories] =
        useState({});

    const loadActiveARTDataQualityCategories = useCallback(async () => {
        setActiveARTDataQualityCategories({
            chart: {
                type: 'pie',
            },
            title: {
                text: '',
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{point.key}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                shadow: false,
            },
            plotOptions: {
                pie: {
                    shadow: false,
                },
            },
            series: [
                {
                    name: 'Records',
                    data: [
                        { name: 'INVALID RECORDS', y: 183.6, color: '#BB1414' },
                        { name: 'VALID RECORDS', y: 69, color: '#00AD30' },
                    ],
                    size: '60%',
                    innerSize: '80%',
                    showInLegend: true,
                    dataLabels: {
                        distance: 5,
                        format: '{point.name}<br>{point.percentage:.1f} %',
                        connectorWidth: 0,
                        style: {
                            textOverflow: 'clip',
                            fontSize: '0.8em',
                        },
                    },
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadActiveARTDataQualityCategories();
    }, [loadActiveARTDataQualityCategories]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                ACTIVE ART DATA QUALITY CATEGORIES
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={activeARTDataQualityCategories}
                />
            </CardBody>
        </Card>
    );
};

export default ActiveARTDataQualityCategories;
