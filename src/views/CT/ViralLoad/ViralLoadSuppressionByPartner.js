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
            yAxis: [{ title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}],
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.text; } } }},
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: viralLoadOverallUptakeSuppressionByPartnerData.data, type: 'column', color: "#485969", tooltip: { valueSuffix: ' % ({point.absoluteY})' }},
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
