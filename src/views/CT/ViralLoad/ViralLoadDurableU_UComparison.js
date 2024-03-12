import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as vlSelectors from '../../../selectors/CT/ViralLoad/viralLoadUToU';

const ViralLoadDurableU_UComparison = () => {
    const [viralLoadUptake, setViralLoadUptake] = useState({});
    const vl = useSelector(vlSelectors.getViralLoadUptakeUToU);

    const loadViralLoadUptake = useCallback(async () => {
        setViralLoadUptake({
            chart: {
                type: 'pie',
            },
            title: { text: '' },
            plotOptions: {
                pie: {
                    innerSize: '80%',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: <br/>{point.percentage:.2f}% <br/>({point.y:,.0f})',
                        style: {
                            textAlign: 'center',
                        },
                    },
                },
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'Patients',
                    data: [
                        {
                            name: 'DURABLE LDL',
                            y: vl?.DurableLDL,
                            color: '#57A14D',
                        },
                        {
                            name: 'NON-DURABLE LDL',
                            y: vl?.TwoConsTests - vl?.DurableLDL,
                            color: '#8E2B15',
                        }
                    ],
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
                        PROPORTION OF DURABLE PATIENTS
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

export default ViralLoadDurableU_UComparison;
