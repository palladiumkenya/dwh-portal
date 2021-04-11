import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getMedicalDoctorsByCounty } from '../../selectors/HRH/Practitioners/practitionersCountByCountyQualification';

const DistributionDensityMPDB = () => {
    const medicalDoctorsByCounty = useSelector(getMedicalDoctorsByCounty);
    const distributionAndDensityOfMedicalDoctorsByCounty = {
        title: { text: 'Distribution and Density of Medical Doctors by County' },
        subtitle: { text: 'Source: regulatory HRIS' },
        xAxis: [{ categories: medicalDoctorsByCounty.counties, crosshair: true }],
        yAxis: [
            { title: { text: 'Ratio per 10,000 population' }},
            { title: { text: 'No of HCWs' }, opposite: true }
        ],
        tooltip: { shared: true },
        legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, floating: true, borderWidth: 1 },
        series: [
            { name: 'Density', type: 'column', yAxis: 1, data: medicalDoctorsByCounty.count, color: "#485969" },
            { name: 'Ratio to 10,000 pop', type: 'spline', data: [], color: "#E06F07" },
        ]
    };
    return (
        <Card>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={distributionAndDensityOfMedicalDoctorsByCounty} />
            </CardBody>
        </Card>
    );
};

export default DistributionDensityMPDB;
