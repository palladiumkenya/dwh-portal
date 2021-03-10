import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as treatmentOutcomesByYearSelectors from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesByYear';

const TreatmentOutcomesByYear = () => {
    const [treatmentOutcomesByYear, setTreatmentOutcomesByYear] = useState({});
    const treatmentOutcomesByYearData = useSelector(treatmentOutcomesByYearSelectors.getTreatmentOutcomesByYear);

    const loadTreatmentOutcomesByYear = useCallback(async () => {
        setTreatmentOutcomesByYear({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' }},
            xAxis: [{ categories: treatmentOutcomesByYearData.yearCategories, title: { text: 'Year of start from 2011' }, crosshair: true}],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'DEAD', data: treatmentOutcomesByYearData.data[1], type: 'column', color: "#E15759", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LTFU', data: treatmentOutcomesByYearData.data[2], type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'ACTIVE', data: treatmentOutcomesByYearData.data[0], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [treatmentOutcomesByYearData]);

    useEffect(() => {
        loadTreatmentOutcomesByYear();
    }, [loadTreatmentOutcomesByYear]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART TREATMENT OUTCOMES BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesByYear} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesByYear;
