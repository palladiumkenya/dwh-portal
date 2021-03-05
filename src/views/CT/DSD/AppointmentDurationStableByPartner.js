import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as dsdStabilityStatusByPartnerSelectors from '../../../selectors/CT/Dsd/dsdStabilityStatusByPartner';

const AppointmentDurationStableByPartner = () => {
    const [appointmentDurationStableByPartner, setAppointmentDurationStableByPartner] = useState({});
    const stabilityStatusByPartnerMmd = useSelector(dsdStabilityStatusByPartnerSelectors.getStabilityStatusByPartnerMmd);
    const stabilityStatusByPartnerNonMmd = useSelector(dsdStabilityStatusByPartnerSelectors.getStabilityStatusByPartnerNonMmd);

    const loadAppointmentDurationStableByPartner = useCallback(async () => {
        setAppointmentDurationStableByPartner({
            title: { text: '' },
            xAxis: [{ categories: stabilityStatusByPartnerNonMmd.partners, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'NON MMD', data: stabilityStatusByPartnerNonMmd.nonMmd, type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'MMD', data: stabilityStatusByPartnerMmd.mmd, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [stabilityStatusByPartnerMmd, stabilityStatusByPartnerNonMmd]);

    useEffect(() => {
        loadAppointmentDurationStableByPartner();
    }, [loadAppointmentDurationStableByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MMD UPTAKE IN PATIENTS CURRENTLY ON ART BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={appointmentDurationStableByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentDurationStableByPartner;
