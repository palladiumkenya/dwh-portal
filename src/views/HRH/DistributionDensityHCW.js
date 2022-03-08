import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getHealthCareWorkersByCounty } from '../../selectors/HRH/practitionersCountByCountyQualification';

const DistributionDensityHCW = () => {
    const healthCareWorkersByCounty = useSelector(getHealthCareWorkersByCounty);
    const distributionAndDensityOfHCWByCounty = {
        title: { text: 'Distribution and Density of HCW by County' },
        subtitle: { text: 'Source: Regulatory HRIS' },
        xAxis: [{ categories: healthCareWorkersByCounty.counties, crosshair: true }],
        yAxis: [
            { title: { text: 'Ratio per 10,000 population' }, opposite: true},
            { title: { text: 'No of HCWs' } }
        ],
        tooltip: { shared: true },
        legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, floating: true, borderWidth: 1 },
        series: [
            { name: 'No of HCWs', type: 'column', data: healthCareWorkersByCounty.count, color: "#142459" },
            { name: 'Ratio to 10,000 pop', yAxis: 1, type: 'spline', data: healthCareWorkersByCounty.population, color: "#E06F07" },
        ]
    };
    return (
        <Card>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={distributionAndDensityOfHCWByCounty} />
            </CardBody>
        </Card>
    );
};

export default DistributionDensityHCW;
