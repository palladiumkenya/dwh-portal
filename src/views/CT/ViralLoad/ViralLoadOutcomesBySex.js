import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadOutcomesBySexSelectors from '../../../selectors/CT/ViralLoad/viralLoadOutcomesBySex';

const ViralLoadOutcomesBySex = () => {
    const [viralloadOutcomesBySexMale, setViralLoadOutcomesBySexMale] = useState({});
    const [viralloadOutcomesBySexFemale, setViralLoadOutcomesBySexFemale] = useState({});
    const viralLoadOutcomesBySexData = useSelector(viralLoadOutcomesBySexSelectors.getViralLoadOutcomesBySex);

    const loadViralLoadOutcomesBySex = useCallback(async () => {
        setViralLoadOutcomesBySexMale({
            chart: { type: 'pie' },
            title: { text: 'MALE', align: 'center', verticalAlign: 'middle'},
            subtitle: { text: '' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    innerSize: '75%',
                }
            },
            series: [{
                name:"VL Outcomes (Male)",
                colorByPoint: true,
                data: [
                    { name: 'SUPPRESSED', y: viralLoadOutcomesBySexData.data[0][0], color: "#485969" },
                    { name: 'HVL', y: viralLoadOutcomesBySexData.data[0][2], color: "#1AB394" },
                    { name: 'LLV', y: viralLoadOutcomesBySexData.data[0][1], color: "#BBE65F" },
                ]
            }]
        });
        setViralLoadOutcomesBySexFemale({
            chart: { type: 'pie' },
            title: { text: 'FEMALE', align: 'center', verticalAlign: 'middle'},
            subtitle: { text: '' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    innerSize: '75%',
                }
            },
            series: [{
                name:"VL Outcomes (Female)",
                colorByPoint: true,
                data: [
                    { name: 'SUPPRESSED', y: viralLoadOutcomesBySexData.data[1][0], color: "#485969" },
                    { name: 'HVL', y: viralLoadOutcomesBySexData.data[1][2], color: "#1AB394" },
                    { name: 'LLV', y: viralLoadOutcomesBySexData.data[1][1], color: "#BBE65F" },
                ]
            }]
        });
    }, [viralLoadOutcomesBySexData]);

    useEffect(() => {
        loadViralLoadOutcomesBySex();
    }, [loadViralLoadOutcomesBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL OUTCOMES AMONG TXCURR PATIENTS BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <HighchartsReact highcharts={Highcharts} options={viralloadOutcomesBySexMale} />
                                </div>
                                <div className="col-6">
                                    <HighchartsReact highcharts={Highcharts} options={viralloadOutcomesBySexFemale} />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadOutcomesBySex;
