import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDTrendsOfAdultPLHIVVaccinationInTheLast12Months = () => {
    const [covidTrendsOfPLHIVVaccination, setCovidTrendsOfPLHIVVaccination] = useState({});

    const loadTrendsOfPLHIVVaccination = useCallback(async () => {
        setCovidTrendsOfPLHIVVaccination({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'], crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'PARTIALLY VACCINATED', data: [45, 100, 130, 155, 177, 188, 200, 250, 270, 300], type: 'column', color: "#F08532", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'FULLY VACCINATED', data: [55, 110, 128, 160, 170, 22, 195, 220, 260, 290, 300], type: 'column', color: "#69B34C", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
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

