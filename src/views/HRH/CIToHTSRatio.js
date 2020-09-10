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

        const data = await getAll('/getHTSDensity/');
        setChart({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Case identification to HTS providers\' ratio by County'
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
                name: 'CI to HTS Providers Ratio',
                type: 'spline',
                data: data.ratio,
                tooltip: {
                    valueSuffix: ''
                }
            }]
        });
    };
    
    useEffect(() => {
        loadChart();
    }, [globalFilter]);

    return (
        <div className="row">
            <div className="col-12">
                <legend>Case identification to HTS providers' ratio by County</legend>
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
