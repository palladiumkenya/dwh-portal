import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationNewByPartner';

const AdultRegimenUptakeByPartner = () => {
    const [adultRegimenUptakeByPartner, setAdultRegimenUptakeByPartner] = useState({});
    const regimensOriginal = useSelector(selectors.getRegimens);
    const partners = useSelector(selectors.getPartners);
    const newByPartner = useSelector(selectors.getNewByPartner);

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

    const loadAdultRegimenUptakeByPartner = useCallback(async () => {
        let data = [];
        let regimens = _.uniq(['Other Regimen', 'TLE', 'TLD'].concat(regimensOriginal));
        for (const partner of partners) {
            let totalPartner = 0;
            const filteredValuesPartner = newByPartner.filter(obj => obj.partner === partner);
            filteredValuesPartner.map(obj => totalPartner = totalPartner + obj.txCurr);
            for (const regimen of regimens) {
                let total = 0;
                const filteredValues = newByPartner.filter(obj => obj.startRegimen === regimen && obj.partner === partner);
                filteredValues.map(obj => total = total + obj.txCurr);

                data.push(
                    {
                        regimen: regimen,
                        partner: partner,
                        y: total,
                        perc: total > 0 && totalPartner > 0 ? ((total/totalPartner)*100) : 0
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
        const orderedPartners = tld.map(item => item.partner);
        const orderedTle = mapOrder(tle, orderedPartners, 'partner');
        const orderedOther = mapOrder(otherRegimen, orderedPartners, 'partner');

        /*for(let i = 0; i < regimens.length; i++) {
            data[i] = [];
            for(let j = 0; j < partners.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < newByPartner.length; i++) {
            let regimensIndex = regimens.indexOf(newByPartner[i].startRegimen);
            let partnersIndex = partners.indexOf(newByPartner[i].partner);
            if(regimensIndex === -1 || partnersIndex === -1) {
                continue;
            }
            data[regimensIndex][partnersIndex] = data[regimensIndex][partnersIndex] + parseInt(newByPartner[i].txCurr);
        }*/
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
        setAdultRegimenUptakeByPartner({
            title: { text: '' },
            xAxis: { categories: orderedPartners.map(a => a.toUpperCase()), title: { text: 'PARTNER' }, crosshair: true },
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
    }, [partners, regimensOriginal, newByPartner]);

    useEffect(() => {
        loadAdultRegimenUptakeByPartner();
    }, [loadAdultRegimenUptakeByPartner]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DISTRIBUTION OF ART REGIMEN AMONG PATIENTS NEWLY STARTED ON ART BY PARTNER
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={adultRegimenUptakeByPartner} />
            </CardBody>
        </Card>
    );
};

export default AdultRegimenUptakeByPartner;
