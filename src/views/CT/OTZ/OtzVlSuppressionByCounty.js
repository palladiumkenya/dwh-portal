import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionByCountySelector from '../../../selectors/CT/OTZ/otzVlSuppressionByCounty';

const OtzVlSuppressionByCounty = () => {
    const [otzVlSuppressionByCounty, setOtzVlSuppressionByCounty] = useState({});
    const vlSuppressionCounty = useSelector(otzVlSuppressionByCountySelector.getOtzVlSuppressionByCounty);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL SUPPRESSION AMONG ALHIV ENROLLED IN OTZ BY COUNTY
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzVlSuppressionByCounty} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzVlSuppressionByCounty;
