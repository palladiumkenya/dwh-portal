import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadUptakeByAgeSelectors from '../../../selectors/CT/ViralLoad/viralLoadUptakeByAge';

const ViralLoadUptakeByAge = () => {
    const [viralLoadUptakeByAge, setViralLoadUptakeByAge] = useState({});
    const viralLoadUptakeByAgeData = useSelector(viralLoadUptakeByAgeSelectors.getViralLoadUptakeByAge);

    const loadViralLoadUptakeByAge = useCallback(async () => {
        setViralLoadUptakeByAge({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: viralLoadUptakeByAgeData.ageCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'MALE', data: viralLoadUptakeByAgeData.data[0], type: 'column', color: "#14084D", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'FEMALE', data: viralLoadUptakeByAgeData.data[1], type: 'column', color: "#EA4C8B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [viralLoadUptakeByAgeData]);

    useEffect(() => {
        loadViralLoadUptakeByAge();
    }, [loadViralLoadUptakeByAge]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG CURRENT ON ART PATIENTS BY AGE GROUP
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadUptakeByAge} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadUptakeByAge;
