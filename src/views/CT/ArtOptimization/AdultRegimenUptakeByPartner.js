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

    const loadAdultRegimenUptakeByPartner = useCallback(async () => {
        let data = [];
        let regimens = _.uniq(['TLD', 'TLE'].concat(regimensOriginal));
        for(let i = 0; i < regimens.length; i++) {
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
        }
        const series = [];
        for(let i = 0; i < regimens.length; i++) {
            let color = '#55FFFF';
            if (regimens[i] === 'TLD') {
                color = '#55FFFF';
            } else if (regimens[i] === 'TLE') {
                color = '#1F77B4';
            } else {
                color = '#F28E2B';
            }
            series.push({
                name: regimens[i], type: 'column', data: data[i], color: color
            });
        }
        setAdultRegimenUptakeByPartner({
            title: { text: '' },
            xAxis: { categories: partners.map(a => a.toUpperCase()), title: { text: 'PARTNER' }, crosshair: true },
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
