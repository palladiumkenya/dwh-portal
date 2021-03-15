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

    function mapOrder (array, order, key) {
        array.sort( function (a, b) {
            let A = a[key], B = b[key];

            if (order.indexOf(A) > order.indexOf(B)) {
                return 1;
            } else {
                return -1;
            }

        });
        return array;
    }

    const loadAdultRegimenUptakeByCounty = useCallback(async () => {
        let data = [];
        let regimens = _.uniq(['Other Regimen', 'TLE', 'TLD'].concat(regimensOriginal));
        for (const county of counties) {
            let totalCounty = 0;
            const filteredValuesCounty = newByCounty.filter(obj => obj.county === county);
            filteredValuesCounty.map(obj => totalCounty = totalCounty + obj.txCurr);
            for (const regimen of regimens) {
                let total = 0;
                const filteredValues = newByCounty.filter(obj => obj.startRegimen === regimen && obj.county === county);
                filteredValues.map(obj => total = total + obj.txCurr);

                data.push(
                    {
                        regimen: regimen,
                        county: county,
                        y: total,
                        perc: total > 0 && totalCounty > 0 ? ((total/totalCounty)*100) : 0
                    }
                );
            }
        }
        const tle = data.filter(obj => obj.regimen === "TLE");
        const tld = data.filter(obj => obj.regimen === "TLD");
        const otherRegimen = data.filter(obj => obj.regimen === "Other Regimen");
        tld.sort(function(a, b) {
            return b.perc - a.perc;
        });
        const orderedCounties = tld.map(item => item.county);
        const orderedTle = mapOrder(tle, orderedCounties, 'county');
        const orderedOther = mapOrder(otherRegimen, orderedCounties, 'county');

        const series = [];
        for(let i = 0; i < regimens.length; i++) {
            let color = '#55FFFF';
            let chartData = [];
            if (regimens[i] === 'TLD') {
                color = '#2D73F5';
                chartData = tld;
            } else if (regimens[i] === 'TLE') {
                color = '#1AB394';
                chartData = orderedTle;
            } else {
                color = '#142459';
                chartData = orderedOther;
            }
            series.push({
                name: regimens[i], type: 'column', data: chartData, color: color
            });
        }
        setAdultRegimenUptakeByCounty({
            title: { text: '' },
            xAxis: { categories: orderedCounties, title: { text: 'COUNTY' }, crosshair: true },
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
