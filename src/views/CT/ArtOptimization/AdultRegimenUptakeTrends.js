import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationNewByYear';

const AdultRegimenUptakeTrends = () => {
    const [adultRegimenUptakeByYear, setAdultRegimenUptakeTrends] = useState({});
    const regimensOriginal = useSelector(selectors.getRegimens);
    const monthYear = useSelector(selectors.getMonthYear);
    const newByYear = useSelector(selectors.getNewByYear);

    const loadAdultRegimenUptakeTrends = useCallback(async () => {
        let data = [];
        let regimens = _.uniq(['Other Regimen', 'TLE', 'TLD'].concat(regimensOriginal));
        for(let i = 0; i < regimens.length; i++) {
            data[i] = [];
            for(let j = 0; j < monthYear.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < newByYear.length; i++) {
            let regimensIndex = regimens.indexOf(newByYear[i].startRegimen);
            let monthYearIndex = monthYear.indexOf(newByYear[i].month + " " + newByYear[i].year);
            if(regimensIndex === -1 || monthYearIndex === -1) {
                continue;
            }
            data[regimensIndex][monthYearIndex] = data[regimensIndex][monthYearIndex] + parseInt(newByYear[i].txCurr);
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
        setAdultRegimenUptakeTrends({
            title: { text: '' },
            xAxis: { categories: monthYear.map(name=> name? name.toUpperCase(): name), title: { text: 'YEAR' }, crosshair: true },
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
    }, [monthYear, regimensOriginal, newByYear]);

    useEffect(() => {
        loadAdultRegimenUptakeTrends();
    }, [loadAdultRegimenUptakeTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TRENDS OF ART REGIMEN UPTAKE AMONG PATIENTS NEWLY STARTED ON ART
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={adultRegimenUptakeByYear} />
            </CardBody>
        </Card>
    );
};

export default AdultRegimenUptakeTrends;
