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
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }},
            legend: { enabled: false },
            tooltip: { formatter: function () {
                    return '<b>TXCurr: ' + this.point.text + '</b>';
                }
            },
            plotOptions: { column: { dataLabels: { enabled: true, format: '{point.y:,.0f}%' } } },
            series: [
                { data: stabilityStatusByPartner.stability, name: 'PERCENT OF PATIENTS', type: 'column', color: "#485969" }
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
