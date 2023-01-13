import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionByPartnerSelector from '../../../selectors/CT/OTZ/otzVlSuppressionByPartner';

const OtzVlSuppressionByPartner = () => {
    const [otzVlSuppressionByPartner, setOtzVlSuppressionByPartner] = useState({});
    const vlSuppressionPartner = useSelector(otzVlSuppressionByPartnerSelector.getOtzVlSuppressionByPartner);

    const loadVlSuppressionByPartner = useCallback(async () => {
        setOtzVlSuppressionByPartner({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [
                { categories: vlSuppressionPartner.partners, crosshair: true },
            ],
            yAxis: [{ title: { text: 'PERCENTAGE OF PATIENTS' } }],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'HVL',
                    data: vlSuppressionPartner.data[0],
                    type: 'column',
                    color: '#bb1414',
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'LLV',
                    data: vlSuppressionPartner.data[1],
                    type: 'column',
                    color: '#F08532',
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'VS',
                    data: vlSuppressionPartner.data[2],
                    type: 'column',
                    color: '#00AD30',
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
            ],
        });
    }, [vlSuppressionPartner]);

    useEffect(() => {
        loadVlSuppressionByPartner();
    }, [loadVlSuppressionByPartner]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL SUPPRESSION AMONG CALHIV ENROLLED IN OTZ BY PARTNER
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
