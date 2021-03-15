import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as treatmentOutcomesByPopulationTypeSelectors from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesByPopulationType';

const TreatmentOutcomesByPopulationType = () => {
    const [treatmentOutcomesByPopulationType, setTreatmentOutcomesByPopulationType] = useState({});
    const activeByPopulationType = useSelector(treatmentOutcomesByPopulationTypeSelectors.getActiveByPopulationType);
    const deadByPopulationType = useSelector(treatmentOutcomesByPopulationTypeSelectors.getDeadByPopulationType);
    const ltfuByPopulationType = useSelector(treatmentOutcomesByPopulationTypeSelectors.getLtfuByPopulationType);

    const loadTreatmentOutcomesByPopulationType = useCallback(async () => {
        setTreatmentOutcomesByPopulationType({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: ['General Population', 'Key Population'], crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'DEAD', data: deadByPopulationType, type: 'column', color: "#E15759", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LTFU', data: ltfuByPopulationType, type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'ACTIVE', data: activeByPopulationType, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [activeByPopulationType, deadByPopulationType, ltfuByPopulationType]);

    useEffect(() => {
        loadTreatmentOutcomesByPopulationType();
    }, [loadTreatmentOutcomesByPopulationType]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART TREATMENT OUTCOMES BY POPULATION TYPE*
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesByPopulationType} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12">
                *This indicator is computed and displayed for the last completed month.
            </div>
        </div>
    );
};

export default TreatmentOutcomesByPopulationType;
