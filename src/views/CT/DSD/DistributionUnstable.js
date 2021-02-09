import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as dsdUnstableSelectors from '../../../selectors/CT/Dsd/dsdUnstable';

const DistributionUnstable = () => {
    const [distributionUnstable, setDistributionUnstable] = useState({});
    const ageLessThan20Years = useSelector(dsdUnstableSelectors.getAgeLessThan20Years);
    const bmiLessThan18 = useSelector(dsdUnstableSelectors.getBmiLessThan18);
    const onArtLessThan12Months = useSelector(dsdUnstableSelectors.getOnArtLessThan12Months);
    const highVl = useSelector(dsdUnstableSelectors.getHighVl);
    const poorAdherence = useSelector(dsdUnstableSelectors.getPoorAdherence);

    const loadDistributionUnstable = useCallback(async () => {
        const categories = ["HIGH VL", "ART<12 MONTHS", "AGE <20 YEARS", "POOR ADHERANCE", "BMI <18.5"];
        const data = [highVl, onArtLessThan12Months, ageLessThan20Years, poorAdherence, bmiLessThan18];
        setDistributionUnstable({
            title: { text: '' },
            xAxis: [{ categories: categories, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients'}}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: data, type: 'column', color: "#1AB394" },
            ]
        });
    }, [highVl, onArtLessThan12Months, ageLessThan20Years, poorAdherence, bmiLessThan18]);

    useEffect(() => {
        loadDistributionUnstable();
    }, [loadDistributionUnstable]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CHARACTERISTICS OF UNSTABLE PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={distributionUnstable} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DistributionUnstable;
