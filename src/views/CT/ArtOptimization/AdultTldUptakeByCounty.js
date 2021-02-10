import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByCounty';
import * as currentOnArtByCountySelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByCounty';

const AdultTldUptakeByCounty = () => {
    const [adultRegimenUptakeByCounty, setAdultTldUptakeByCounty] = useState({});
    const sexGroups = useSelector(selectors.getSexGroups);
    const counties = useSelector(selectors.getCounties);
    const adultsCurrentByCounty = useSelector(selectors.getCurrentTldByCounty);
    const currentOnArtByCountyData = useSelector(currentOnArtByCountySelectors.getCurrentOnArtByCounty);

    const loadAdultTldUptakeByCounty = useCallback(async () => {
        let data = [];
        let dataCurrent = [];
        for(let i = 0; i < sexGroups.length; i++) {
            data[i] = [];
            for(let j = 0; j < counties.length; j++) {
                data[i][j] = 0;
                dataCurrent[j] = 0;
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
        for(let i = 0; i < currentOnArtByCountyData.currentOnArt.length; i++) {
            let countyIndex = counties.indexOf(currentOnArtByCountyData.counties[i]);
            if(countyIndex === -1) {
                continue;
            }
            dataCurrent[countyIndex] = dataCurrent[countyIndex] + parseInt(currentOnArtByCountyData.currentOnArt[i]);
        }
        let final = [];
        if (data[0]) {
            final = data[0].map((d, x) => {
                let total = (d + data[1][x]);
                let percentage = Number(((total/dataCurrent[x])*100).toFixed(0));
                return {
                    y: percentage > 100 ? 100: percentage,
                    absoluteY: total.toLocaleString('en'),
                };
            });
        }
        setAdultTldUptakeByCounty({
            title: { text: '' },
            xAxis: { categories: counties.map(a => a.toUpperCase()), title: { text: 'COUNTY' }, crosshair: true },
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }},
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'TLD UPTAKE', type: 'column', data: final, color: "#485969", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
            ],
        });
    }, [counties, sexGroups, adultsCurrentByCounty, currentOnArtByCountyData]);

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
