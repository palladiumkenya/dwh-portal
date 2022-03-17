import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as covidAdmissionSymptomaticByAgeSelector
    from '../../../selectors/CT/Covid/covidAdmissionSymptomaticByAge';

export const COVIDAdmissionByAge = () => {
    const [admissionOfSymptomaticByAge, setAdmissionOfSymptomaticByAge] = useState({});
    const covidAdmissionSymptomaticByAge = useSelector(covidAdmissionSymptomaticByAgeSelector.getCovidAdmissionSymptomaticByAge);

    console.log(covidAdmissionSymptomaticByAge);
    const loadCovidAdmissionSymptomaticByAge = useCallback(async () => {
        setAdmissionOfSymptomaticByAge({
            title: { text: '' },
            plotOptions: {
                column: {
                    stacking: 'column'
                }
            },
            xAxis: [{
                categories: covidAdmissionSymptomaticByAge.ageGroups.map(n => n.toUpperCase()),
                crosshair: true
            }],
            yAxis: [{ title: { text: 'Percentage of Patients'.toUpperCase() } }],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'PATIENTS ADMITTED',
                    data: covidAdmissionSymptomaticByAge.symptomaticPatients,
                    type: 'column',
                    color: '#1AB394'
                }
            ]
        });
    }, [covidAdmissionSymptomaticByAge]);

    useEffect(() => {
        loadCovidAdmissionSymptomaticByAge();
    }, [loadCovidAdmissionSymptomaticByAge]);


    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{ textTransform: 'none' }}>
                ADMISSION OF COVID-19 SYMPTOMATIC PATIENTS BY AGE
            </CardHeader>
            <CardBody className="">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={admissionOfSymptomaticByAge}/>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDAdmissionByAge;
