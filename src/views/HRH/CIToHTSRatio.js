import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/HRHApi';

const DistributionHTSCI = () => {
    const [chartData, setChart] = useState({});

    const loadChart = useCallback(async () => {
        const data = await getAll('/getHTSDensity/');
        setChart({
            title: { text: 'Case identification to HTS providers\' ratio by County' },
            subtitle: { text: 'Source: NASCOP HRIS' },
            xAxis: [{ categories: data.counties, crosshair: true }],
            yAxis: [{ title: { text: 'CI to HTS Providers Ratio' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, floating: true, borderWidth: 1 },
            series: [
                { name: 'CI to HTS Providers Ratio', type: 'spline', data: data.ratio, color: "#E06F07" }
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

export default DistributionHTSCI;
