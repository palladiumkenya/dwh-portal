import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionBySexSelector from '../../../selectors/CT/OTZ/otzVlSuppressionBySex';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OtzVlSuppressionBySex = () => {
    const [otzVlSuppressionBySex, setOtzVlSuppressionBySex] = useState({});
    const vlSuppressionGender = useSelector(otzVlSuppressionBySexSelector.getOtzVlSuppressionBySex);


    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL SUPPRESSION AMONG ALHIV ENROLLED IN OTZ BY SEX
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzVlSuppressionBySex} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzVlSuppressionBySex;
