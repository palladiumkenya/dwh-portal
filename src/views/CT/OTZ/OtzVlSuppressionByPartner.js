import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionByPartnerSelector from '../../../selectors/CT/OTZ/otzVlSuppressionByPartner';

const OtzVlSuppressionByPartner = () => {
    const [otzVlSuppressionByPartner, setOtzVlSuppressionByPartner] = useState({});
    const vlSuppressionPartner = useSelector(otzVlSuppressionByPartnerSelector.getOtzVlSuppressionByPartner);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL SUPPRESSION AMONG ALHIV ENROLLED IN OTZ BY PARTNER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzVlSuppressionByPartner} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzVlSuppressionByPartner;
