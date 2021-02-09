import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as dsdStableMmdModelsSelectors from '../../../selectors/CT/Dsd/dsdStableMmdModels';

const DistributionMMDStable = () => {
    const [distributionMMDStable, setDistributionMMDStable] = useState({});
    const stableMmdModels = useSelector(dsdStableMmdModelsSelectors.getStableMmdModels);

    const loadDistributionMMDStable = useCallback(async () => {
        setDistributionMMDStable({
            title: { text: '' },
            xAxis: [{ categories: stableMmdModels.models, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: stableMmdModels.data, type: 'column', color: "#485969" },
            ]
        });
    }, [stableMmdModels]);

    useEffect(() => {
        loadDistributionMMDStable();
    }, [loadDistributionMMDStable]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF MMD MODELS AMONG PATIENTS CURRENTLY ON ART
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={distributionMMDStable} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DistributionMMDStable;
