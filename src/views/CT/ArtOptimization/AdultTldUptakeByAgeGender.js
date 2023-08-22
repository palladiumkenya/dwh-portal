import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByAgeSex';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';

const AdultTldUptakeByAgeGender = () => {
    const [adultTldUptakeByAgeGender, setAdultTldUptakeByAgeGender] = useState({});
    const sexGroups = useSelector(selectors.getSexGroups);
    const ageGroupsOriginal = useSelector(selectors.getAgeGroups);
    const adultsCurrentByAgeSex = useSelector(selectors.getCurrentTldByAgeSex);
    const currentOnArtByAgeSexData = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtByAgeSexList);

    const loadAdultTldUptakeByAgeGender = useCallback(async () => {
        let ageGroups = _.remove(
            _.uniq(
                [' Under 1', '01 to 04', '05 to 09', '10 to 14'].concat(
                    ageGroupsOriginal
                )
            ),
            function (element) {
                return (
                    element !== ' Under 1' &&
                    element !== '01 to 04' &&
                    element !== '05 to 09' &&
                    element !== '10 to 14'
                );
            }
        );
        let data = [];
        let dataCurrent = [];
        for(let i = 0; i < sexGroups.length; i++) {
            data[i] = [];
            dataCurrent[i] = [];
            for(let j = 0; j < ageGroups.length; j++) {
                data[i][j] = 0;
                dataCurrent[i][j] = 0;
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

        for(let i = 0; i < currentOnArtByAgeSexData.length; i++) {
            if (!currentOnArtByAgeSexData[i].ageGroup) {
                continue;
            }
            let sexGroupsIndex = sexGroups.indexOf(currentOnArtByAgeSexData[i].Gender);
            let ageGroupsIndex = ageGroups.indexOf(currentOnArtByAgeSexData[i].ageGroup.replace(/-/g, " to "));

            if(sexGroupsIndex === -1 || ageGroupsIndex === -1) {
                continue;
            }
            dataCurrent[sexGroupsIndex][ageGroupsIndex] = dataCurrent[sexGroupsIndex][ageGroupsIndex] + parseInt(currentOnArtByAgeSexData[i].txCurr);
        }

        for(let i = 0; i < sexGroups.length; i++) {
            const sum = _.sum(data[i]);
            const sumCurrent = _.sum(dataCurrent[i]);
            data[i] = data[i].map((d, x) => {
                return {
                    y: Number(((d/dataCurrent[i][x])*100).toFixed(0)),
                    absoluteY: d.toLocaleString('en'),
                };
            });
            data[i].push({
                y: Number(((sum/sumCurrent)*100).toFixed(0)),
                absoluteY: sum.toLocaleString('en'),
            });
        }
        ageGroups.push('TOTAL');
        setAdultTldUptakeByAgeGender({
            title: { text: '' },
            xAxis: { categories: ageGroups, title: { text: 'AGE GROUP' }, crosshair: true },
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }, labels: { format: '{value} %'}},
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'MALE', type: 'column', data: data[1] ? data[1] : [], color: "#14084D", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
                { name: 'FEMALE ', type: 'column', data: data[0] ? data[0] : [], color: "#EA4C8B", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
            ],
        });
    }, [ageGroupsOriginal, sexGroups, adultsCurrentByAgeSex, currentOnArtByAgeSexData]);

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
