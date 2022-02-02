import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';

import * as covidAdultPLHIVVaccinatedByAgeGroupSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVVaccinatedByAgeGroup';

const COVIDAdultPLHIVVaccinatedByAge = () => {
    const [covidVaccinatedByAge, setCovidVaccinatedByAge] = useState({});
    const fullyVaccinated = useSelector(covidAdultPLHIVVaccinatedByAgeGroupSelectors.getAdultPLHIVVaccinatedByAgeGroups);

    const loadVaccinatedByAge = useCallback(async () => {
        setCovidVaccinatedByAge({
            title: { text: '' },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    tooltip: {
                        valueSuffix: ' ({point.percentage:.0f}%)'
                    },
                    dataLabels: {
                        formatter: function() {
                            if (this.y) {
                                return Math.round(100 * this.y / this.total) + '%';
                            }
                            return '0%';
                        },
                        enabled: true
                    }
                }
            },
            xAxis: [{ categories: fullyVaccinated.ageGroups, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' } }],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'NOT VACCINATED',
                    data: fullyVaccinated.notVaccinated.map(obj => obj.text),
                    type: 'column',
                    color: 'red'
                },
                {
                    name: 'PARTIALLY VACCINATED',
                    data: fullyVaccinated.partiallyVaccinated.map(obj => obj.text),
                    type: 'column',
                    color: '#F08532'
                },
                {
                    name: 'FULLY VACCINATED',
                    data: fullyVaccinated.fullyVaccinated.map(obj => obj.text),
                    type: 'column',
                    color: '#69B34C'
                }
            ]
        });
    }, [fullyVaccinated]);

    useEffect(() => {
        loadVaccinatedByAge();
    }, [loadVaccinatedByAge]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{ textTransform: 'none' }}>
                ADULT PLHIV VACCINATED AGAINST COVID-19 BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={covidVaccinatedByAge}/>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDAdultPLHIVVaccinatedByAge;
