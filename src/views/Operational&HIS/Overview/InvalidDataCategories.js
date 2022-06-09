import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const InvalidDataCategories = () => {
    const filters = useSelector((state) => state.filters);
    const [invalidDataCategories, setInvalidDataCategories] = useState({});

    const loadInvalidDataCategories = useCallback(async () => {
        setInvalidDataCategories({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'ACCURATE & COMPLETE',
                    'INACCURATE & COMPLETE',
                    'INACCURATE & INCOMPLETE',
                ],
                crosshair: true,
                title: {
                    text: '',
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
                    data: [893, 578, 120],
                    color: '#2F4050',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadInvalidDataCategories();
    }, [loadInvalidDataCategories]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                INVALID DATA - CATEGORIES
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={invalidDataCategories}
                />
            </CardBody>
        </Card>
    );
};

export default InvalidDataCategories;
