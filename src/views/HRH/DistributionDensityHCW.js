import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/HRHApi';

const DistributionDensityHCW = ({ globalFilter }) => {
    const [chartData, setChart] = useState({
        chart: { type: "column" },
        title: { text: "", style: { display: "none" } },
        xAxis: { categories: [], title: { text: null } },
        yAxis: { min: 0, title: { text: "", align: "high" }, labels: { overflow: "justify" } },
        plotOptions: { bar: { dataLabels: { enabled: true } } },
        legend: { enabled: false },
        credits: { enabled: true },
        responsive: { rules: [ { condition: { maxWidth: 500, }, chartOptions: { legend: { enabled: false } } } ] },
        series: [ { data: [], color: "#1AB394" } ]
    });

    useEffect(() => {
        loadChart();
    }, [globalFilter]);

    const loadChart = async () => {
        let params = null;
        
        if (globalFilter) {
            params = { ...globalFilter };
        }

        const data = await getAll('/getHCWDensity/0/all/all/all');
        setChart({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Distribution and Density of HCW by County'
            },
            subtitle: {
                text: 'Source: regulatory HRIS'
            },
            xAxis: [{
                categories: data.counties,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: ' {value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Ratio per 10,000 population',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'No of HCWs',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}',
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
                y: 100,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Density',
                type: 'column',
                yAxis: 1,
                data: data.count,
                tooltip: {
                    valueSuffix: ''
                }
        
            }, {
                name: 'Ratio to 10,000 pop',
                type: 'spline',
                data: data.ratio,
                tooltip: {
                    valueSuffix: ''
                }
            }]
        });
    };
    
    return (
        <div className="row">
            <div className="col-12">
                <legend>Distribution and Density of HCW by County</legend>
                <Card className="trends-card">
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={chartData} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DistributionDensityHCW;
