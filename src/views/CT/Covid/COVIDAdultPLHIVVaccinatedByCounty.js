import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as covidAdultPLHIVVaccinatedByCountySelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVVaccinatedByCounty';

const COVIDAdultPLHIVVaccinatedByCounty = () => {
    const [covidVaccinatedByCounty, setCovidVaccinatedByCounty] = useState({});
    const countiesVaccinated = useSelector(covidAdultPLHIVVaccinatedByCountySelectors.getAdultPLHIVVaccinatedByCounty);

    const loadVaccinatedByCounty = useCallback(async () => {
        setCovidVaccinatedByCounty({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent',
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
                        enabled: false
                    } } },
            xAxis: [{ categories: countiesVaccinated.counties, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients'.toUpperCase() }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'NOT VACCINATED', data: countiesVaccinated.notVaccinated.map(obj => obj.text), type: 'column', color: "#bb1414" },
                { name: 'PARTIALLY VACCINATED', data: countiesVaccinated.partiallyVaccinated.map(obj => obj.text), type: 'column', color: "#F08532" },
                { name: 'FULLY VACCINATED', data: countiesVaccinated.fullyVaccinated.map(obj => obj.text), type: 'column', color: "#00AD30" },
            ]
        });
    }, [countiesVaccinated]);

    useEffect(() => {
        loadVaccinatedByCounty();
    }, [loadVaccinatedByCounty]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PLHIV VACCINATED AGAINST COVID-19 BY COUNTY
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={covidVaccinatedByCounty} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDAdultPLHIVVaccinatedByCounty;
