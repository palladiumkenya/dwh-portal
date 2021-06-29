import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionBySexSelector from '../../../selectors/CT/OTZ/otzVlSuppressionBySex';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OtzVlSuppressionBySex = () => {
    const [otzVlSuppressionBySex, setOtzVlSuppressionBySex] = useState({});
    const vlSuppressionGender = useSelector(otzVlSuppressionBySexSelector.getOtzVlSuppressionBySex);

    const loadVlSuppressionBySex = useCallback(async () => {
        setOtzVlSuppressionBySex({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: vlSuppressionGender.genders, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'HVL', data: vlSuppressionGender.data[0], type: 'column', color: "#E15759", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LLV', data: vlSuppressionGender.data[1], type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'VS', data: vlSuppressionGender.data[2], type: 'column', color: "#3475B3", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [vlSuppressionGender]);

    useEffect(() => {
        loadVlSuppressionBySex();
    }, [loadVlSuppressionBySex]);

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
