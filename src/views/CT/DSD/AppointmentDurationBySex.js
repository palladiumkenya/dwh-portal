import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as dsdAppointmentDurationBySexSelectors from '../../../selectors/CT/Dsd/dsdAppointmentDurationBySex';

const AppointmentDurationBySex = () => {
    const [appointmentDurationBySex, setAppointmentDurationBySex] = useState({});
    const appointmentDurationBySexData = useSelector(dsdAppointmentDurationBySexSelectors.getAppointmentDurationBySex);

    const loadAppointmentDurationBySex = useCallback(async () => {
        setAppointmentDurationBySex({
            title: { text: '' },
            xAxis: [{ categories: appointmentDurationBySexData.sexCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'NON MMD', data: appointmentDurationBySexData.data[1], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'MMD', data: appointmentDurationBySexData.data[0], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [appointmentDurationBySexData]);

    useEffect(() => {
        loadAppointmentDurationBySex();
    }, [loadAppointmentDurationBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MMD UPTAKE BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={appointmentDurationBySex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentDurationBySex;
