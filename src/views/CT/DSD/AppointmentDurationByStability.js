import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as dsdAppointmentDurationByStabilityStatusSelectors from '../../../selectors/CT/Dsd/dsdAppointmentDurationByStabilityStatus';

const AppointmentDurationByStability = () => {
    const [appointmentDurationByStability, setAppointmentDurationByStability] = useState({});
    const appointmentDurationByStabilityStatus = useSelector(dsdAppointmentDurationByStabilityStatusSelectors.getAppointmentDurationByStabilityStatus);

    const loadAppointmentDurationByStability = useCallback(async () => {
        setAppointmentDurationByStability({
            title: { text: '' },
            xAxis: [{ categories: appointmentDurationByStabilityStatus.stabilityCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: '<3 MONTHS', data: appointmentDurationByStabilityStatus.data[0], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '<3-5 MONTHS', data: appointmentDurationByStabilityStatus.data[1], type: 'column', color: "#3281CC", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '>6+ MONTHS', data: appointmentDurationByStabilityStatus.data[2], type: 'column', color: "#2F4050", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [appointmentDurationByStabilityStatus]);

    useEffect(() => {
        loadAppointmentDurationByStability();
    }, [loadAppointmentDurationByStability]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MMD UPTAKE BY STABILITY STATUS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={appointmentDurationByStability} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentDurationByStability;
