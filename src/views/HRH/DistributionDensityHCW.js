import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/HRHApi';

const DistributionDensityHCW = () => {
    const [chartData, setChart] = useState({});

    const loadChart = useCallback(async () => {
        const data = await getAll('/getHCWDensity/0/all/all/all');
        setChart({
            title: { text: 'Distribution and Density of HCW by County' },
            subtitle: { text: 'Source: Regulatory HRIS' },
            xAxis: [{ categories: data.counties, crosshair: true }],
            yAxis: [
                { title: { text: 'Ratio per 10,000 population' }},
                { title: { text: 'No of HCWs' }, opposite: true }
            ],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, floating: true, borderWidth: 1 },
            series: [
                { name: 'Density', type: 'column', yAxis: 1, data: data.count, color: "#485969" },
                { name: 'Ratio to 10,000 pop', type: 'spline', data: data.ratio, color: "#E06F07" },
            ]
        });
    }, []);

    useEffect(() => {
        loadChart();
    }, [loadChart]);
    
    return (
        <Card>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={chartData} />
            </CardBody>
        </Card>
    );
};

export default DistributionDensityHCW;
