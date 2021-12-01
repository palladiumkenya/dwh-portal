import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as covidTrendsPLHIVVaccinationInTheLast12MonthsSelectors
    from '../../../selectors/CT/Covid/covidTrendsPLHIVVaccinationInTheLast12Months';

const COVIDTrendsOfAdultPLHIVVaccinationInTheLast12Months = () => {
    const [covidTrendsOfPLHIVVaccination, setCovidTrendsOfPLHIVVaccination] = useState({});
    const trendsPLHIVVaccinationInTheLast12Months = useSelector(covidTrendsPLHIVVaccinationInTheLast12MonthsSelectors.getTrendsPLHIVVaccinationInTheLast12Months);

    const loadTrendsOfPLHIVVaccination = useCallback(async () => {
        setCovidTrendsOfPLHIVVaccination({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: trendsPLHIVVaccinationInTheLast12Months.yearMonthTrends, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'PARTIALLY VACCINATED', data: trendsPLHIVVaccinationInTheLast12Months.trendsPartiallyVaccinated, type: 'column', color: "#F08532", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'FULLY VACCINATED', data: trendsPLHIVVaccinationInTheLast12Months.trendsFullyVaccinated, type: 'column', color: "#69B34C", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, []);

    useEffect(() => {
        loadTrendsOfPLHIVVaccination();
    }, []);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                TRENDS OF ADULT PLHIV VACCINATION IN THE LAST 12 MONTHS
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={covidTrendsOfPLHIVVaccination} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDTrendsOfAdultPLHIVVaccinationInTheLast12Months;

