import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as dsdAppointmentDurationByAgeSelectors from '../../../selectors/CT/Dsd/dsdAppointmentDurationByAge';

const AppointmentDurationByAge = () => {
    const [appointmentDurationByAge, setAppointmentDurationByAge] = useState({});
    const appointmentDurationByAgeData = useSelector(dsdAppointmentDurationByAgeSelectors.getAppointmentDurationByAge);

    const loadAppointmentDurationByAge = useCallback(async () => {
        setAppointmentDurationByAge({
            title: { text: '' },
            xAxis: [{ categories: appointmentDurationByAgeData.ageCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'NON MMD', data: appointmentDurationByAgeData.data[1], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'MMD', data: appointmentDurationByAgeData.data[0], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [appointmentDurationByAgeData]);

    useEffect(() => {
        loadAppointmentDurationByAge();
    }, [loadAppointmentDurationByAge]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MMD UPTAKE PRACTICES BY AGE GROUP
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={appointmentDurationByAge} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentDurationByAge;
