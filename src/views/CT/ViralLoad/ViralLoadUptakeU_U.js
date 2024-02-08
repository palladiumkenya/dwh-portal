import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as vlSelectors from '../../../selectors/CT/ViralLoad/viralLoadUToU';

const ViralLoadUptakeU_U = () => {
    const [viralLoadUptake, setViralLoadUptake] = useState({});
    const vl = useSelector(vlSelectors.getViralLoadUptakeUToU);

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
                        format: '{point.y:,.0f}',
                        verticalAlign: 'top',
                        y: -20,
                    },
                },
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'ELIGIBLE FOR VL TEST',
                    data: [vl?.EligibleVL],
                    type: 'column',
                    color: '#F69323',
                },
                {
                    name: 'VALID VIRAL LOAD RESULTS',
                    data: [null, vl?.HasValidVL],
                    type: 'column',
                    color: '#19A367',
                },
            ],
        });
    }, [vl]);

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
