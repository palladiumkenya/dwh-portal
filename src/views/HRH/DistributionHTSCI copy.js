import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
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

    const loadChart = async () => {
        let params = null;
        
        if (globalFilter) {
            params = { ...globalFilter };
        }

        console.log(params.docket);
        if (params.docket === 'HTS') {
            const data = await getAll('/getHTSDensity/');
            setChart({
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'Case Identification to HTS Providers Ratio'
                },
                subtitle: {
                    text: 'Source: NASCOP HRIS'
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
                        text: 'CI to HTS Providers Ratio',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: 'No of HTS Cases',
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
                    name: 'No of HTS Cases',
                    type: 'column',
                    yAxis: 1,
                    data: data.count,
                    tooltip: {
                        valueSuffix: ''
                    }
            
                }, {
                    name: 'CI to HTS Providers Ratio',
                    type: 'spline',
                    data: data.ratio,
                    tooltip: {
                        valueSuffix: ''
                    }
                }]
            });
        }
        else if (params.docket === 'DIST') {
            const data = await getAll('/getHCWDensity/0/all/all/all');
            setChart({
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'Distribution and Density of health workers ('+ globalFilter.carders +')'
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
        }
        else if (params.docket === 'DIST2') {
            const data = await getAll('/getHTSDensityScatter');
            setChart({
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Distribution of HTS providers and Case Identification'
                },
                subtitle: {
                    text: 'Source: NASCOP HRIS'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'HTS Providers'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'No of HTS Cases'
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
        }
    };

    useEffect(() => {
        loadChart();
    }, [globalFilter]);
    
    return (
        <div className="row">
            <div className="col-12">
                <legend>Case Identification to HTS Providers Ratio</legend>
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
