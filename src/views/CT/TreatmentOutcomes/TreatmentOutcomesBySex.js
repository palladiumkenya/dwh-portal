import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as treatmentOutcomesBySexSelectors from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesBySex';

const TreatmentOutcomesBySex = () => {
    const [treatmentOutcomesBySex, setTreatmentOutcomesBySex] = useState({});
    const activeBySex = useSelector(treatmentOutcomesBySexSelectors.getActiveBySex);
    const deadBySex = useSelector(treatmentOutcomesBySexSelectors.getDeadBySex);
    const ltfuBySex = useSelector(treatmentOutcomesBySexSelectors.getLtfuBySex);
    const stoppedBySex = useSelector(treatmentOutcomesBySexSelectors.getStoppedBySex);
    const transferOutBySex = useSelector(treatmentOutcomesBySexSelectors.getTransferOutBySex);

    const loadTreatmentOutcomesBySex = useCallback(async () => {
        setTreatmentOutcomesBySex({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: ['Male', 'Female'], crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'ACTIVE', data: activeBySex, type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'DEAD', data: deadBySex, type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LTFU', data: ltfuBySex, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'STOPPED', data: stoppedBySex, type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'TRANSFER OUT', data: transferOutBySex, type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [activeBySex, deadBySex, ltfuBySex, stoppedBySex, transferOutBySex]);

    useEffect(() => {
        loadTreatmentOutcomesBySex();
    }, [loadTreatmentOutcomesBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART TREATMENT OUTCOMES BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesBySex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesBySex;
