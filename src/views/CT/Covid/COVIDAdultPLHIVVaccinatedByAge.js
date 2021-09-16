import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';

import * as covidAdultPLHIVVaccinatedByAgeGroupSelectors from '../../../selectors/CT/Covid/covidAdultPLHIVVaccinatedByAgeGroup';

const COVIDAdultPLHIVVaccinatedByAge = () => {
    const [covidVaccinatedByAge, setCovidVaccinatedByAge] = useState({});

    const fullyVaccinated = useSelector(covidAdultPLHIVVaccinatedByAgeGroupSelectors.getAdultPLHIVVaccinatedByAgeGroups);

    const loadVaccinatedByAge = useCallback(async () => {
        setCovidVaccinatedByAge({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: fullyVaccinated.ageGroups, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'PARTIALLY VACCINATED', data: fullyVaccinated.partiallyVaccinated, type: 'column', color: "#F08532", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'FULLY VACCINATED', data: fullyVaccinated.fullyVaccinated, type: 'column', color: "#69B34C", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
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
