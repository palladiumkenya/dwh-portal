import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDAdultPLHIVVaccinatedByPartner = () => {
    const [covidVaccinatedByPartner, setCovidVaccinatedByPartner] = useState({});

    const loadVaccinatedByPartner = useCallback(async () => {
        setCovidVaccinatedByPartner({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: ['COLUMBIA STARS', 'CHS SHINDA', 'AHF', 'HCM', 'COPTIC SCHOOLS', 'EDARP', 'AFYA JIJINI', 'AFYA ZIWANI', 'WRP-NAIROBI', 'AMREF'], crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'PARTIALLY VACCINATED', data: [45, 80, 30, 25, 66, 22, 33, 12, 1, 56], type: 'column', color: "#F08532", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'FULLY VACCINATED', data: [55, 20, 78, 90, 21, 22, 33, 12, 1, 56], type: 'column', color: "#69B34C", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, []);

    useEffect(() => {
        loadVaccinatedByPartner();
    }, []);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                ADULT PLHIV VACCINATED AGAINIST COVID-19 BY PARTNER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={covidVaccinatedByPartner} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDAdultPLHIVVaccinatedByPartner;

