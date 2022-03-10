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
            xAxis: [{ categories: appointmentDurationByAgeData.ObjectArr, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients'.toUpperCase() }}],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, reversed: true },
            series: [
                { name: 'NON MMD', data: appointmentDurationByAgeData.groupedVals[1],type: 'column', color: "#142459", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'MMD', data: appointmentDurationByAgeData.groupedVals[0], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
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
                        MMD UPTAKE BY AGE GROUP
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
