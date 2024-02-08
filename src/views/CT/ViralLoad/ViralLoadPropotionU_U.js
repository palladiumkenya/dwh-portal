import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as vlSelectors from '../../../selectors/CT/ViralLoad/viralLoadUToU';

const ViralLoadPropotionU_U = () => {
    const [viralLoadUptake, setViralLoadUptake] = useState({});
    const vl = useSelector(vlSelectors.getViralLoadUptakeUToU);

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
                    // labels: { format: '{value}' },
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
                    name: 'ELIGIBLE FOR AT LEAST 2 VL TEST',
                    data: [vl?.TwoEligibleTests],
                    type: 'column',
                    color: '#F69323',
                },
                {
                    name: 'LDL (LAST ONE TEST)',
                    data: [null, vl?.LDLLastOneTest],
                    type: 'column',
                    color: '#19A367',
                },
                {
                    name: 'DURABLE LDL (U=U)',
                    data: [null, null, vl?.DurableLDL],
                    type: 'column',
                    color: '#142359',
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
