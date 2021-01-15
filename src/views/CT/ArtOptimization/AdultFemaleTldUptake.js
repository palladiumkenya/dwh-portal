import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';

const AdultFemaleTldUptake = () => {
    const [adultTldUptakeByAgeGender, setAdultFemaleTldUptake] = useState({});
    const females = useSelector(selectors.getFemales);
    const femalesOnTld = useSelector(selectors.getFemalesOnTld);

    const loadAdultFemaleTldUptake = useCallback(async () => {
        setAdultFemaleTldUptake({
            title: { text: '' },
            xAxis: { categories: ['FEMALES CURRENT ON ART', 'FEMALES ON TLD'], title: { text: '' }, crosshair: true, labels: { rotation: 270 } },
            yAxis: { title: { text: 'NUMBER OF PATIENTS' }},
            tooltip: { shared: true },
            legend: { enabled: false },
            plotOptions: { column: { dataLabels: { enabled: true, formatter: function () {
                return '' + this.point.text;
            }}}},
            series: [
                { name: 'FEMALE TLD UPTAKE', type: 'column', data: [
                    { y: females, text: females.toLocaleString('en') },
                    { y: femalesOnTld, text: femalesOnTld.toLocaleString('en') + ' (' + parseFloat(((femalesOnTld/females)*100).toString()).toFixed(0) + '%)' },
                ], color: "#EA4C8B" },
            ],
        });
    }, [females, femalesOnTld]);

    useEffect(() => {
        loadAdultFemaleTldUptake();
    }, [loadAdultFemaleTldUptake]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                FEMALE TLD UPTAKE
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={adultTldUptakeByAgeGender} />
            </CardBody>
        </Card>
    );
};

export default AdultFemaleTldUptake;
