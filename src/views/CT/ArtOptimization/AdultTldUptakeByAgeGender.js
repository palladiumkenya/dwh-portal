import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByAgeSex';

const AdultTldUptakeByAgeGender = () => {
    const [adultTldUptakeByAgeGender, setAdultTldUptakeByAgeGender] = useState({});
    const sexGroups = useSelector(selectors.getSexGroups);
    const ageGroupsOriginal = useSelector(selectors.getAgeGroups);
    const adultsCurrentByAgeSex = useSelector(selectors.getAdultsCurrentByAgeSex);
    const adultsCurrentByAgeSexTotal = useSelector(selectors.getAdultsCurrentByAgeSexTotal);

    const loadAdultTldUptakeByAgeGender = useCallback(async () => {
        let ageGroups = _.uniq(['Under 1', '1 to 4', '5 to 9'].concat(ageGroupsOriginal));
        let data = [];
        for(let i = 0; i < sexGroups.length; i++) {
            data[i] = [];
            for(let j = 0; j < ageGroups.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < adultsCurrentByAgeSex.length; i++) {
            let sexGroupsIndex = sexGroups.indexOf(adultsCurrentByAgeSex[i].gender);
            let ageGroupsIndex = ageGroups.indexOf(adultsCurrentByAgeSex[i].datimAgeGroup);
            if(sexGroupsIndex === -1 || ageGroupsIndex === -1) {
                continue;
            }
            data[sexGroupsIndex][ageGroupsIndex] = data[sexGroupsIndex][ageGroupsIndex] + parseInt(adultsCurrentByAgeSex[i].txCurr);
        }
        for(let i = 0; i < sexGroups.length; i++) {
            const sum = _.sum(data[i]);
            data[i] = data[i].map(d => Number(((d/sum)*100).toFixed(2)));
            data[i].push(Number(((sum/adultsCurrentByAgeSexTotal)*100).toFixed(2)));
        }
        ageGroups.push('TOTAL');
        setAdultTldUptakeByAgeGender({
            title: { text: '' },
            xAxis: { categories: ageGroups, title: { text: 'AGE GROUP' }, crosshair: true },
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }, labels: { format: '{value} %'}},
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'MALE', type: 'column', data: data[1], color: "#14084D", tooltip: { valueSuffix: ' %' } },
                { name: 'FEMALE ', type: 'column', data: data[0], color: "#EA4C8B", tooltip: { valueSuffix: ' %' } },
            ],
        });
    }, [ageGroupsOriginal, sexGroups, adultsCurrentByAgeSex, adultsCurrentByAgeSexTotal]);

    useEffect(() => {
        loadAdultTldUptakeByAgeGender();
    }, [loadAdultTldUptakeByAgeGender]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TLD UPTAKE BY AGE AND GENDER AMONG PATIENTS CURRENT ON ART
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={adultTldUptakeByAgeGender} />
            </CardBody>
        </Card>
    );
};

export default AdultTldUptakeByAgeGender;
