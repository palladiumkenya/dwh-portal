import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDAdultPLHIVVaccinatedByAge = () => {
    const [covidVaccinatedByAge, setCovidVaccinatedByAge] = useState({});

    const loadVaccinatedByAge = useCallback(async () => {
        setCovidVaccinatedByAge({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: ['18-25 YRS', '26-35 YRS', '36-45 YRS', '46-55 YRS', '56-65 YRS', '>=66 YRS'], crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'PARTIALLY VACCINATED', data: [45, 80, 30, 25, 66, 22], type: 'column', color: "#F08532", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'FULLY VACCINATED', data: [55, 20, 78, 90, 21, 22], type: 'column', color: "#69B34C", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, []);

    useEffect(() => {
        loadVaccinatedByAge();
    }, []);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                ADULT PLHIV VACCINATED AGAINST COVID-19 BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={covidVaccinatedByAge} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDAdultPLHIVVaccinatedByAge;
