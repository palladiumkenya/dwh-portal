import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionByAgeSelector from '../../../selectors/CT/OTZ/otzVlSuppressionByAge';

const OtzVlSuppressionByAge = () => {
    const [otzVlSuppressionByAge, setOtzVlSuppressionByCounty] = useState({});
    const vlSuppressionAge = useSelector(otzVlSuppressionByAgeSelector.getOtzVlSuppressionByAge);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL SUPPRESSION AMONG ALHIV ENROLLED IN OTZ BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzVlSuppressionByAge} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzVlSuppressionByAge;
