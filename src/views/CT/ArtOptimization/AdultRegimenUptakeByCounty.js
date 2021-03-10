import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationNewByCounty';

const AdultRegimenUptakeByCounty = () => {
    const [adultRegimenUptakeByCounty, setAdultRegimenUptakeByCounty] = useState({});
    const regimensOriginal = useSelector(selectors.getRegimens);
    const counties = useSelector(selectors.getCounties);
    const newByCounty = useSelector(selectors.getNewByCounty);

    const loadAdultRegimenUptakeByCounty = useCallback(async () => {
        let data = [];
        let regimens = _.uniq(['TLD', 'TLE'].concat(regimensOriginal));
        for(let i = 0; i < regimens.length; i++) {
            data[i] = [];
            for(let j = 0; j < counties.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < newByCounty.length; i++) {
            let regimensIndex = regimens.indexOf(newByCounty[i].startRegimen);
            let countiesIndex = counties.indexOf(newByCounty[i].county);
            if(regimensIndex === -1 || countiesIndex === -1) {
                continue;
            }
            data[regimensIndex][countiesIndex] = data[regimensIndex][countiesIndex] + parseInt(newByCounty[i].txCurr);
        }
        const series = [];
        for(let i = 0; i < regimens.length; i++) {
            let color = '#55FFFF';
            if (regimens[i] === 'TLD') {
                color = '#2D73F5';
            } else if (regimens[i] === 'TLE') {
                color = '#1AB394';
            } else {
                color = '#142459';
            }
            series.push({
                name: regimens[i], type: 'column', data: data[i], color: color
            });
        }
        setAdultRegimenUptakeByCounty({
            title: { text: '' },
            xAxis: { categories: counties.map(a => a.toUpperCase()), title: { text: 'COUNTY' }, crosshair: true },
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }},
            tooltip: { shared: true },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    tooltip: {
                        valueSuffix: ' ({point.percentage:.0f}%)'
                    },
                }
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: series,
        });
    }, [counties, regimensOriginal, newByCounty]);

    useEffect(() => {
        loadAdultRegimenUptakeByCounty();
    }, [loadAdultRegimenUptakeByCounty]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DISTRIBUTION OF ART REGIMEN AMONG PATIENTS NEWLY STARTED ON ART BY COUNTY
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={adultRegimenUptakeByCounty} />
            </CardBody>
        </Card>
    );
};

export default AdultRegimenUptakeByCounty;
