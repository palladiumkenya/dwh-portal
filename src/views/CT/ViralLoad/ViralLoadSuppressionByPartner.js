import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadOverallUptakeSuppressionByFacilitySelectors from '../../../selectors/CT/ViralLoad/viralLoadOverallUptakeSuppressionByFacility';

const ViralLoadSuppressionByPartner = () => {
    const [viralLoadSuppressionByPartner, setViralLoadSuppressionByPartner] = useState({});
    const viralLoadOverallUptakeSuppressionByPartnerData = useSelector(viralLoadOverallUptakeSuppressionByFacilitySelectors.getViralLoadOverallUptakeSuppressionByPartner);

    const loadViralLoadSuppressionByPartner = useCallback(async () => {
        setViralLoadSuppressionByPartner({
            title: { text: '' },
            xAxis: [{ categories: viralLoadOverallUptakeSuppressionByPartnerData.partners, crosshair: true, title: { text: 'Service Delivery Partner' } }],
            yAxis: [
                { title: { text: 'Number of Patients' } },
            ],
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: viralLoadOverallUptakeSuppressionByPartnerData.data, type: 'column', color: "#485969" },
            ]
        });
    }, [viralLoadOverallUptakeSuppressionByPartnerData]);

    useEffect(() => {
        loadViralLoadSuppressionByPartner();
    }, [loadViralLoadSuppressionByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL SUPPRESSION AMONG CURRENT ON ART PATIENTS BY partner
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadSuppressionByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByPartner;
