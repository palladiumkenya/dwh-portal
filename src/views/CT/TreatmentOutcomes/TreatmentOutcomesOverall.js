import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as treatmentOutcomesBySexSelectors from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesBySex';

const TreatmentOutcomesOverall = () => {
    const [treatmentOutcomesOverall, setTreatmentOutcomesOverall] = useState({});
    const active = useSelector(treatmentOutcomesBySexSelectors.getActive);
    const dead = useSelector(treatmentOutcomesBySexSelectors.getDead);
    const ltfu = useSelector(treatmentOutcomesBySexSelectors.getLtfu);
    const stopped = useSelector(treatmentOutcomesBySexSelectors.getStopped);
    const transferOut = useSelector(treatmentOutcomesBySexSelectors.getTransferOut);

    const loadTreatmentOutcomesOverall = useCallback(async () => {
        setTreatmentOutcomesOverall({
            chart: { type: 'pie' },
            title: { text: '' },
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
                name:"Overall Treatment Outcomes",
                colorByPoint: true,
                data: [
                    { name: 'ACTIVE', y: active, color: "#485969" },
                    { name: 'DEAD', y: dead, color: "#60A6E5" },
                    { name: 'LTFU', y: ltfu, color: "#1AB394" },
                    { name: 'STOPPED', y: stopped, color: "#BBE65F" },
                    { name: 'TRANSFER OUT', y: transferOut, color: "#F28E2B" },
                ]
            }]
        });
    }, [active, dead, ltfu, stopped, transferOut]);

    useEffect(() => {
        loadTreatmentOutcomesOverall();
    }, [loadTreatmentOutcomesOverall]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL ART TREATMENT OUTCOMES
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesOverall} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesOverall;
