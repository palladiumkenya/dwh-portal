import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HtsUptakeByCounty = ({ globalFilter }) => {
    const [uptakeByCounty, setUptakeByCounty] = useState({});

    useEffect(() => {
        loadUptakeByCounty();
    }, [globalFilter]);

    const loadUptakeByCounty = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        setUptakeByCounty({
            chart: { zoomType: 'xy' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: ['BARINGO', 'NAIROBI', 'KAJIADO', 'MOMBASA', 'LAMU', 'MERU', 'KIAMBU', 'NYERI', 'SIAYA', 'KISUMU', 'HOMABAY', 'KISII', 'NAKURU', 'TANA RIVER', 'WAJIR', 'ISIOLO', 'TURKANA', 'KAKAMEGA'], title: { text: null }, visible: true, scrollbar: { enabled: true } },
            yAxis: { min: 0, title: { text: 'TESTS' }, stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                } },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            credits: { enabled: false },
            responsive: { rules: [ { condition: { maxWidth: 400, }, chartOptions: { legend: { enabled: false } } } ] },
            series: [{
                type: 'column',
                data: [5, 3, 4, 7, 20, 10, 6, 15, 17, 19, 22, 13, 12, 16, 11, 10, 24, 12, 13, 18, 19],
                color: "#2F4050"
            },{
                name: 'NS',
                type: 'spline',

                data: [3, 2, 3, 5, 17, 8, 5, 10, 13, 15, 16, 20, 11, 10, 9, 8, 17, 8, 10, 15, 17],
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UPTAKE BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByCounty} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeByCounty;
