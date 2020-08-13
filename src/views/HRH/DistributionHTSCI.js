import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/HRHApi';

const DistributionHTSCI = ({ globalFilter }) => {
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

        const data = await getAll('/getHTSDensityScatter/');
        setChart({
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Distribution of HTS providers and case identification, 2019'
            },
            subtitle: {
                text: 'Source: NASCOP HRIS'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'No of HTS providers'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'No of cases identified'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} Cases, {point.y} HTS Providers'
                    }
                }
            },
            series: [{
                name: 'Cases & HTS Providers Distribution',
                color: 'rgba(223, 83, 83, .5)',
                data: data.count
            }]
        });
    };
    
    return (
        <div className="row">
            <div className="col-12">
                <legend>Distribution of HTS providers and case identification, 2019</legend>
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

export default DistributionHTSCI;
