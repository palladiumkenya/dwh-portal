import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/HRHApi';

const DistributionHTSCI = () => {
    const [chartData, setChart] = useState({});

    const loadChart = useCallback(async () => {
        const data = await getAll('/getHTSDensityScatter/');
        setChart({
            title: { text: 'Distribution of HTS providers and case identification, 2019' },
            subtitle: { text: 'Source: NASCOP HRIS' },
            xAxis: { title: { text: 'No of HTS providers' }, startOnTick: true, endOnTick: true, showLastLabel: true },
            yAxis: { title: { text: 'No of cases identified' }},
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, floating: true, borderWidth: 1 },
            plotOptions: {
                scatter: {
                    marker: { radius: 5, states: { hover: { enabled: true, lineColor: 'rgb(100,100,100)' }}},
                    states: { hover: { marker: { enabled: false }}},
                    tooltip: { headerFormat: '<b>{series.name}</b><br>', pointFormat: '{point.x} Cases, {point.y} HTS Providers' }
                }
            },
            series: [
                { name: 'Cases & HTS Providers Distribution', color: 'rgba(223, 83, 83, .5)', data: data.count, type: 'scatter' }
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
