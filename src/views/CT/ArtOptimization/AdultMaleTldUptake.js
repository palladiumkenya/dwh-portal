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
            xAxis: { categories: ['MALES CURRENT ON ART', 'MALES ON TLD'], title: { text: '' }, crosshair: true, labels: { rotation: 270 } },
            yAxis: { title: { text: 'NUMBER OF PATIENTS' }},
            tooltip: { shared: true },
            legend: { enabled: false },
            plotOptions: { column: { dataLabels: { enabled: true, formatter: function () {
                return '' + this.point.text;
            }}}},
            series: [
                { name: 'MALE TLD UPTAKE', type: 'column', data: [
                    { y: males, text: males.toLocaleString('en') },
                    { y: malesOnTld, text: malesOnTld.toLocaleString('en') + ' (' + parseFloat(((malesOnTld/males)*100).toString()).toFixed(0) + '%)' },
                ], color: "#14084D" },
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
