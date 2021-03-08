import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as dsdStableMmdModelsSelectors from '../../../selectors/CT/Dsd/dsdStableMmdModels';
import { formatNumber } from '../../../utils/utils';

const DistributionMMDStable = () => {
    const [distributionMMDStable, setDistributionMMDStable] = useState({});
    const stableMmdModels = useSelector(dsdStableMmdModelsSelectors.getStableMmdModels);


    const loadDistributionMMDStable = useCallback(async () => {
        setDistributionMMDStable({
            title: { text: '' },
            xAxis: [{ categories: stableMmdModels.models, crosshair: true }],
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
                    data: [
                        {
                            name: stableMmdModels.models[0],
                            y: parseInt((Math.round((stableMmdModels.data[0]/stableMmdModels.txCurr)*100)).toString(), 10),
                            text: ' (' + formatNumber(stableMmdModels.data[0]) + ')',
                        },
                        {
                            name: stableMmdModels.models[1],
                            y: parseInt((Math.round((stableMmdModels.data[1]/stableMmdModels.txCurr)*100)).toString(), 10),
                            text: ' (' + formatNumber(stableMmdModels.data[1]) + ')'
                        },
                        {
                            name: stableMmdModels.models[2],
                            y: parseInt((Math.round((stableMmdModels.data[2]/stableMmdModels.txCurr)*100)).toString(), 10),
                            text: ' (' + formatNumber(stableMmdModels.data[2]) + ')'
                        },
                        {
                            name: stableMmdModels.models[3],
                            y: parseInt((Math.round((stableMmdModels.data[3]/stableMmdModels.txCurr)*100)).toString(), 10),
                            text: ' (' + formatNumber(stableMmdModels.data[3]) + ')'
                        },
                        {
                            name: stableMmdModels.models[4],
                            y: parseInt((Math.round((stableMmdModels.data[4]/stableMmdModels.txCurr)*100)).toString(), 10),
                            text: ' (' + formatNumber(stableMmdModels.data[4]) + ')'
                        },
                        {
                            name: stableMmdModels.models[5],
                            y: parseInt((Math.round((stableMmdModels.data[5]/stableMmdModels.txCurr)*100)).toString(), 10),
                            text: ' (' + formatNumber(stableMmdModels.data[5]) + ')'
                        }
                    ],
                    type: 'column',
                    color: "#485969"
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
