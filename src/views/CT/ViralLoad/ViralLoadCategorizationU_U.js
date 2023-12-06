import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';

const ViralLoadCategorizationU_U = () => {
    const [viralLoadUptake, setViralLoadUptake] = useState({});
    const highRisk = useSelector(viralLoadSelectors.getHighRisk);

    const lowRisk = useSelector(viralLoadSelectors.getLowRisk);
    const ldl = useSelector(viralLoadSelectors.getLDL);
    const unsuppressed = useSelector(viralLoadSelectors.getUnsuppressed);

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
                        format: '{point.name}: <br/>{point.percentage:.1f}% <br/>({point.y})',
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
                            y: ldl,
                            color: '#57A14D',
                        },
                        {
                            name: '50-199 COPIES',
                            y: lowRisk,
                            color: '#F69323',
                        },
                        {
                            name: '200-999 COPIES',
                            y: highRisk,
                            color: '#8E2B15',
                        },
                        {
                            name: '1000+ COPIES',
                            y: unsuppressed,
                            color: '#142359',
                        },
                    ],
                },
            ],
        });
    }, [unsuppressed, ldl, lowRisk, highRisk]);

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
