import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcServDistributionByPartnerSelector from '../../../selectors/CT/OVC/ovcServDistributionByPartner';

const OVCServDistributionByPartner = () => {
    const [ovcServDistributionByPartner, setOvcServDistributionByPartner] = useState({});
    const servDistributionByPartner = useSelector(ovcServDistributionByPartnerSelector.getOvcServDistributionByPartner);

    const loadOvcServDistributionByPartner = useCallback(async () => {
        setOvcServDistributionByPartner({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: servDistributionByPartner.map(obj => obj.partner),
                crosshair: true
            },
            yAxis: {
                title: {
                    text: 'NUMBER OF PATIENTS'
                },
            },
            legend: {
                enabled: false
            },
            series: [
                {
                    name: 'OVC DISTRIBUTION BY PARTNER',
                    data: servDistributionByPartner,
                    color: '#14084D',
                }
            ]
        });
    }, [servDistributionByPartner]);

    useEffect(() => {
        loadOvcServDistributionByPartner();
    }, [loadOvcServDistributionByPartner]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OVC DISTRIBUTION BY PARTNER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcServDistributionByPartner} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCServDistributionByPartner;
