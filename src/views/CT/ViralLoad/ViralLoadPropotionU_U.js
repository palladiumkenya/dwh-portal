import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as vlSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';

const ViralLoadPropotionU_U = () => {
    const [viralLoadUptake, setViralLoadUptake] = useState({});
    const eligibleForVl = useSelector(vlSelectors.getEligibleForVl);
    const hasCurrentVl = useSelector(vlSelectors.getHasCurrentVl);

    const loadViralLoadUptake = useCallback(async () => {
        setViralLoadUptake({
            title: { text: '' },
            xAxis: [
                {
                    categories: [
                        'ELIGIBLE FOR AT LEAST 2 VL TEST',
                        'LDL (LAST ONE TEST)',
                        'DURABLE LDL (U=U)',
                    ],
                    title: { text: '' },
                    crosshair: true,
                },
            ],
            yAxis: [
                {
                    title: { text: 'NUMBER OF PATIENTS' },
                    labels: { format: '{value}' },
                },
            ],
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        crop: false,
                        overflow: 'none',
                        color: 'black',
                        format: '{y}',
                        verticalAlign: 'top',
                        y: -20,
                    },
                },
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'ELIGIBLE FOR AT LEAST 2 VL TEST',
                    data: [903329],
                    type: 'column',
                    color: '#F69323',
                },
                {
                    name: 'LDL (LAST ONE TEST)',
                    data: [null, 430435],
                    type: 'column',
                    color: '#19A367',
                },
                {
                    name: 'DURABLE LDL (U=U)',
                    data: [null, null, 123844],
                    type: 'column',
                    color: '#142359',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadViralLoadUptake();
    }, [loadViralLoadUptake]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        PROPORTION OF UNDETECTABLE LEVELS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={viralLoadUptake}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadPropotionU_U;
