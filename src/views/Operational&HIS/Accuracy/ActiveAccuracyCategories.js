import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ActiveAccuracyCategories = () => {
    const filters = useSelector((state) => state.filters);
    const [activeAccuracyCategories, setActiveAccuracyCategories] =
        useState({});

    const loadActiveAccuracyCategories = useCallback(async () => {
        setActiveAccuracyCategories({
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
                        { name: 'INACCURATE RECORDS', y: 183.6, color: '#BB1414' },
                        { name: 'ACCURATE RECORDS', y: 69, color: '#00AD30' },
                    ],
                    size: '90%',
                    innerSize: '85%',
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
        loadActiveAccuracyCategories();
    }, [loadActiveAccuracyCategories]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                ACTIVE ART DATA QUALITY CATEGORIES
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={activeAccuracyCategories}
                />
            </CardBody>
        </Card>
    );
};

export default ActiveAccuracyCategories;
