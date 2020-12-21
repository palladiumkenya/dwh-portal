import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';

const AdultMaleTldUptake = () => {
    const [adultTldUptakeByAgeGender, setAdultMaleTldUptake] = useState({});
    const males = useSelector(selectors.getMales);
    const malesOnTld = useSelector(selectors.getMalesOnTld);

    const loadAdultMaleTldUptake = useCallback(async () => {
        setAdultMaleTldUptake({
            title: { text: '' },
            xAxis: { categories: ['MALES CURRENT ON ART', 'MALES ON TLD'], title: { text: '' }, crosshair: true },
            yAxis: { title: { text: 'NUMBER OF PATIENTS' }},
            tooltip: { shared: true },
            legend: { enabled: false },
            series: [
                { name: 'MALE TLD UPTAKE', type: 'column', data: [males, malesOnTld], color: "#14084D" },
            ],
        });
    }, [males, malesOnTld]);

    useEffect(() => {
        loadAdultMaleTldUptake();
    }, [loadAdultMaleTldUptake]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                MALE TLD UPTAKE
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={adultTldUptakeByAgeGender} />
            </CardBody>
        </Card>
    );
};

export default AdultMaleTldUptake;
