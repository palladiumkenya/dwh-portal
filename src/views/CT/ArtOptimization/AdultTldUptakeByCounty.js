import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByCounty';

const AdultTldUptakeByCounty = () => {
    const [adultRegimenUptakeByCounty, setAdultTldUptakeByCounty] = useState({});
    const sexGroups = useSelector(selectors.getSexGroups);
    const counties = useSelector(selectors.getCounties);
    const adultsCurrentByCounty = useSelector(selectors.getAdultsCurrentByCounty);

    const loadAdultTldUptakeByCounty = useCallback(async () => {
        let data = [];
        for(let i = 0; i < sexGroups.length; i++) {
            data[i] = [];
            for(let j = 0; j < counties.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < adultsCurrentByCounty.length; i++) {
            let sexGroupsIndex = sexGroups.indexOf(adultsCurrentByCounty[i].gender);
            let countiesIndex = counties.indexOf(adultsCurrentByCounty[i].county);
            if(sexGroupsIndex === -1 || countiesIndex === -1) {
                continue;
            }
            data[sexGroupsIndex][countiesIndex] = data[sexGroupsIndex][countiesIndex] + parseInt(adultsCurrentByCounty[i].txCurr);
        }
        setAdultTldUptakeByCounty({
            title: { text: '' },
            xAxis: { categories: counties.map(a => a.toUpperCase()), title: { text: 'COUNTY' }, crosshair: true },
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }},
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'MALE', type: 'column', data: data[1], color: "#14084D" },
                { name: 'FEMALE ', type: 'column', data: data[0], color: "#EA4C8B" },
            ],
        });
    }, [counties, sexGroups, adultsCurrentByCounty]);

    useEffect(() => {
        loadAdultTldUptakeByCounty();
    }, [loadAdultTldUptakeByCounty]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TLD UPTAKE AMONG PATIENTS CURRENT ON ART BY COUNTY
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={adultRegimenUptakeByCounty} />
            </CardBody>
        </Card>
    );
};

export default AdultTldUptakeByCounty;
