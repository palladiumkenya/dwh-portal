import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadUptakeByPartnerSelectors from '../../../selectors/CT/ViralLoad/viralLoadUptakeByPartner';

const ViralLoadUptakeByPartner = () => {
    const [viralLoadUptakeByPartner, setViralLoadUptakeByPartner] = useState({});
    const viralLoadUptakeByPartnerData = useSelector(viralLoadUptakeByPartnerSelectors.getViralLoadUptakeByPartner);

    const loadViralLoadUptakeByPartner = useCallback(async () => {
        setViralLoadUptakeByPartner({
            title: { text: '' },
            xAxis: [{ categories: viralLoadUptakeByPartnerData.partners, title: { text: 'Service Delivery Partner' }, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y} %' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: viralLoadUptakeByPartnerData.data, type: 'column', color: "#485969", tooltip: { valueSuffix: ' % ({point.absoluteY})'} },
            ]
        });
    }, [viralLoadUptakeByPartnerData]);

    useEffect(() => {
        loadViralLoadUptakeByPartner();
    }, [loadViralLoadUptakeByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG CURRENT ON ART PATIENTS BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadUptakeByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadUptakeByPartner;
