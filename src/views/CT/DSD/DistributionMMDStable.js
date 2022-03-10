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
            xAxis: [{ categories: stableMmdModels.data.map(a => a.name.toUpperCase()), crosshair: true }],
            yAxis: [
                {
                    min: 0,
                    max: 100,
                    title: {
                        text: 'PERCENT OF PATIENTS'
                    }
                }
            ],
            plotOptions: { column: { dataLabels: { enabled: true, format: '{point.y:,.0f}%' } } },
            tooltip: { formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.point.text;
                } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'PERCENT OF PATIENTS',
                    data: stableMmdModels.data,
                    type: 'column',
                    color: "#142459"
                },
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
