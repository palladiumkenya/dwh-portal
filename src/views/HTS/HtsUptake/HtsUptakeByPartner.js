import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const HtsUptakeByPartner = ({ globalFilter }) => {
    const [uptakeByPartner, setUptakeByPartner] = useState({});

    const loadUptakeByPartner = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const partners = [];
        let tested = [];
        let positivity = [];

        const result = await getAll('hts/uptakeByPartner', params);
        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].Partner);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }

        setUptakeByPartner({
            chart: {
                zoomType: 'xy'
            },
            title: {
                useHTML: true,
                text: ' &nbsp;',
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: partners,
                crosshair: true,
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Number Tested',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'HIV Positivity',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 7,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Number Tested',
                type: 'column',
                color: "#1AB394",
                data: tested,
                tooltip: {
                    valueSuffix: ' '
                }

            }, {
                name: 'HIV Positivity',
                type: 'spline',
                data: positivity,
                color: "#E06F07",
                yAxis: 1,
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    };

    useEffect(() => {
        loadUptakeByPartner();
    }, [globalFilter]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UPTAKE BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByPartner} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeByPartner;
