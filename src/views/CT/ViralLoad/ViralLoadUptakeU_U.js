import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as vlSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';

const ViralLoadUptakeU_U = () => {
    const [viralLoadUptake, setViralLoadUptake] = useState({});
    const eligibleForVl = useSelector(vlSelectors.getEligibleForVl);
    const hasCurrentVl = useSelector(vlSelectors.getHasCurrentVl);

    const loadViralLoadUptake = useCallback(async () => {
        setViralLoadUptake({
            title: { text: '' },
            xAxis: [
                {
                    categories: [
                        'ELIGIBLE FOR VL TEST',
                        'VALID VIRAL LOAD RESULTS',
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
                    name: 'ELIGIBLE FOR VL TEST',
                    data: [eligibleForVl],
                    type: 'column',
                    color: '#F69323',
                },
                {
                    name: 'VALID VIRAL LOAD RESULTS',
                    data: [null, hasCurrentVl],
                    type: 'column',
                    color: '#19A367',
                },
            ],
        });
    }, [eligibleForVl, hasCurrentVl]);

    useEffect(() => {
        loadViralLoadUptake();
    }, [loadViralLoadUptake]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VIRAL LOAD UPTAKE
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

export default ViralLoadUptakeU_U;
