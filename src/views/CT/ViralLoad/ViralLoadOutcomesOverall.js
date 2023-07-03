import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadOutcomesBySexSelectors from '../../../selectors/CT/ViralLoad/viralLoadOutcomesBySex';

const ViralLoadOutcomesOverall = () => {
    const [viralLoadOutcomesOverall, setViralLoadOutcomesOverall] = useState({});
    const viralLoadOutcomesOverallData = useSelector(viralLoadOutcomesBySexSelectors.getViralLoadOutcomesOverall);

    const loadViralLoadOutcomesOverall = useCallback(async () => {
        setViralLoadOutcomesOverall({
            chart: { type: 'pie' },
            title: {
                text: 'OVERALL',
                align: 'center',
                verticalAlign: 'middle',
            },
            subtitle: { text: '' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    },
                    innerSize: '75%',
                },
            },
            series: [
                {
                    name: 'Overall VL Outcomes',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'LDL',
                            y: viralLoadOutcomesOverallData.data[0],
                            color: '#142459',
                        },
                        {
                            name: 'HIGH RISK LLV',
                            y: viralLoadOutcomesOverallData.data[2],
                            color: '#1AB394',
                        },
                        {
                            name: 'LOW RISK LLV',
                            y: viralLoadOutcomesOverallData.data[1],
                            color: '#BBE65F',
                        },
                    ],
                },
            ],
        });
    }, [viralLoadOutcomesOverallData]);

    useEffect(() => {
        loadViralLoadOutcomesOverall();
    }, [loadViralLoadOutcomesOverall]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL VL OUTCOMES AMONG TXCURR PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadOutcomesOverall} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadOutcomesOverall;
