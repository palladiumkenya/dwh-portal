import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getNursesMidwivesByCounty } from '../../selectors/HRH/practitionersCountByCountyQualification';

const DistributionDensityNCK = () => {
    const nursesMidwivesByCounty = useSelector(getNursesMidwivesByCounty);
    const distributionAndDensityOfHCWByCounty = {
        title: { text: 'Distribution and Density of Nurses and Midwives by County' },
        subtitle: { text: 'Source: regulatory HRIS' },
        xAxis: [{ categories: nursesMidwivesByCounty.counties, crosshair: true }],
        yAxis: [
            { title: { text: 'Ratio per 10,000 population' }},
            { title: { text: 'No of HCWs' }, opposite: true }
        ],
        tooltip: { shared: true },
        legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, floating: true, borderWidth: 1 },
        series: [
            { name: 'Density', type: 'column', yAxis: 1, data: nursesMidwivesByCounty.count, color: "#485969" },
            { name: 'Ratio to 10,000 pop', type: 'spline', data: nursesMidwivesByCounty.population, color: "#E06F07" }
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

export default DistributionDensityNCK;
