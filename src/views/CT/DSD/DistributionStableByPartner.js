import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as dsdStabilityStatusByPartnerSelectors from '../../../selectors/CT/Dsd/dsdStabilityStatusByPartner';

const DistributionStableByPartner = () => {
    const [distributionStableByPartner, setDistributionStableByPartner] = useState({});
    const stabilityStatusByPartner = useSelector(dsdStabilityStatusByPartnerSelectors.getStabilityStatusByPartner);

    const loadTxCurrDistributionByPartner = useCallback(async () => {
        setDistributionStableByPartner({
            title: { text: ''},
            xAxis: [{ categories: stabilityStatusByPartner.partners, title: { text: 'Partner' }, crosshair: true }],
            yAxis: { title: { text: 'Number of Patients' }},
            legend: { enabled: false },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            series: [
                { data: stabilityStatusByPartner.stability, name: 'Number of Patients', type: 'column', color: "#485969" }
            ]
        });
    }, [stabilityStatusByPartner]);

    useEffect(() => {
        loadTxCurrDistributionByPartner();
    }, [loadTxCurrDistributionByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF STABLE PATIENTS BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={distributionStableByPartner} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default DistributionStableByPartner;
