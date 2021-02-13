import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as dsdStabilityStatusByCountySelectors from '../../../selectors/CT/Dsd/dsdStabilityStatusByCounty';

const AppointmentDurationStableByCounty = () => {
    const [appointmentDurationStableByCounty, setAppointmentDurationStableByCounty] = useState({});
    const stabilityStatusByCountyMmd = useSelector(dsdStabilityStatusByCountySelectors.getStabilityStatusByCountyMmd);
    const stabilityStatusByCountyNonMmd = useSelector(dsdStabilityStatusByCountySelectors.getStabilityStatusByCountyNonMmd);

    const loadAppointmentDurationStableByCounty = useCallback(async () => {
        setAppointmentDurationStableByCounty({
            title: { text: '' },
            xAxis: [{ categories: stabilityStatusByCountyMmd.counties, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'NON MMD', data: stabilityStatusByCountyNonMmd.nonMmd, type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'MMD', data: stabilityStatusByCountyMmd.mmd, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [stabilityStatusByCountyMmd, stabilityStatusByCountyNonMmd]);

    useEffect(() => {
        loadAppointmentDurationStableByCounty();
    }, [loadAppointmentDurationStableByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MMD UPTAKE IN PATIENTS CURRENTLY ON ART BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={appointmentDurationStableByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentDurationStableByCounty;
