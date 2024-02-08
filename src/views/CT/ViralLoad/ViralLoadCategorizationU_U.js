import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as vlSelectors from '../../../selectors/CT/ViralLoad/viralLoadUToU';

const ViralLoadCategorizationU_U = () => {
    const [viralLoadUptake, setViralLoadUptake] = useState({});
    const data = useSelector(vlSelectors.getViralLoadCategorizationUToU);

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
                        format: '{point.name}: <br/>{point.percentage:.1f}% <br/>({point.y:,.0f})',
                        style: {
                            textAlign: 'center',
                        },
                    },
                },
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'Percentage of Patients',
                    data: [
                        {
                            name: '< 50 COPIES',
                            y: data[0],
                            color: '#57A14D',
                        },
                        {
                            name: '50-199 COPIES',
                            y: data[1],
                            color: '#F69323',
                        },
                        {
                            name: '200-999 COPIES',
                            y: data[2],
                            color: '#8E2B15',
                        },
                        {
                            name: '1000+ COPIES',
                            y: data[3],
                            color: '#142359',
                        },
                    ],
                },
            ],
        });
    }, [data]);

    useEffect(() => {
        loadViralLoadUptake();
    }, [loadViralLoadUptake]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VALID VIRAL LOAD RESULTS CATEGORIZATION
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

export default ViralLoadCategorizationU_U;
