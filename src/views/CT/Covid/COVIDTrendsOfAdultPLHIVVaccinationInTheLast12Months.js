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
            xAxis: [{ categories: trendsPLHIVVaccinationInTheLast12Months.yearMonthTrends.map(n=>n.toUpperCase()), crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients'.toUpperCase() } }],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'NOT VACCINATED',
                    data: trendsPLHIVVaccinationInTheLast12Months.trendsNotVaccinated,
                    type: 'column',
                    color: '#bb1414'
                },
                {
                    name: 'PARTIALLY VACCINATED',
                    data: trendsPLHIVVaccinationInTheLast12Months.trendsPartiallyVaccinated,
                    type: 'column',
                    color: '#F08532'
                },
                {
                    name: 'FULLY VACCINATED',
                    data: trendsPLHIVVaccinationInTheLast12Months.trendsFullyVaccinated,
                    type: 'column',
                    color: '#00AD30'
                }
            ]
        });
    }, [trendsPLHIVVaccinationInTheLast12Months]);

    useEffect(() => {
        loadTrendsOfPLHIVVaccination();
    }, [loadTrendsOfPLHIVVaccination]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{ textTransform: 'none' }}>
                TRENDS OF PLHIV VACCINATION IN THE LAST 12 MONTHS
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={covidTrendsOfPLHIVVaccination}/>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDTrendsOfAdultPLHIVVaccinationInTheLast12Months;

