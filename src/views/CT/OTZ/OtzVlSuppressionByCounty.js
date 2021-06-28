import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionByCountySelector from '../../../selectors/CT/OTZ/otzVlSuppressionByCounty';

const OtzVlSuppressionByCounty = () => {
    const [otzVlSuppressionByCounty, setOtzVlSuppressionByCounty] = useState({});
    const vlSuppressionCounty = useSelector(otzVlSuppressionByCountySelector.getOtzVlSuppressionByCounty);

    const loadVlSuppressionByCounty = useCallback(async () => {
        setOtzVlSuppressionByCounty({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: vlSuppressionCounty.counties, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'HVL', data: vlSuppressionCounty.data[0], type: 'column', color: "#E15759", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LLV', data: vlSuppressionCounty.data[1], type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'VS', data: vlSuppressionCounty.data[2], type: 'column', color: "#3475B3", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [vlSuppressionCounty]);

    useEffect(() => {
        loadVlSuppressionByCounty();
    }, [loadVlSuppressionByCounty]);

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
