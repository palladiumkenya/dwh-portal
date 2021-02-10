import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByPartner';
import * as currentOnArtByPartnerSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByPartner';

const AdultTldUptakeByPartner = () => {
    const [adultRegimenUptakeByPartner, setAdultTldUptakeByPartner] = useState({});
    const sexGroups = useSelector(selectors.getSexGroups);
    const partners = useSelector(selectors.getPartners);
    const adultsCurrentByPartner = useSelector(selectors.getCurrentTldByPartner);
    const currentOnArtByPartnerData = useSelector(currentOnArtByPartnerSelectors.getCurrentOnArtByPartner);

    const loadAdultTldUptakeByPartner = useCallback(async () => {
        let data = [];
        let dataCurrent = [];
        for(let i = 0; i < sexGroups.length; i++) {
            data[i] = [];
            for(let j = 0; j < partners.length; j++) {
                data[i][j] = 0;
                dataCurrent[j] = 0;
            }
        }
        for(let i = 0; i < adultsCurrentByPartner.length; i++) {
            let sexGroupsIndex = sexGroups.indexOf(adultsCurrentByPartner[i].gender);
            let partnersIndex = partners.indexOf(adultsCurrentByPartner[i].partner);
            if(sexGroupsIndex === -1 || partnersIndex === -1) {
                continue;
            }
            data[sexGroupsIndex][partnersIndex] = data[sexGroupsIndex][partnersIndex] + parseInt(adultsCurrentByPartner[i].txCurr);
        }
        for(let i = 0; i < currentOnArtByPartnerData.currentOnArt.length; i++) {
            let partnerIndex = partners.indexOf(currentOnArtByPartnerData.partners[i]);
            if(partnerIndex === -1) {
                continue;
            }
            dataCurrent[partnerIndex] = dataCurrent[partnerIndex] + parseInt(currentOnArtByPartnerData.currentOnArt[i]);
        }
        let final = [];
        if (data[0]) {
            final = data[0].map((d, x) => {
                let total = (d + data[1][x]);
                let percentage = Number(((total/dataCurrent[x])*100).toFixed(0));
                return {
                    y: percentage,
                    absoluteY: total.toLocaleString('en'),
                };
            });
        }
        setAdultTldUptakeByPartner({
            title: { text: '' },
            xAxis: { categories: partners.map(a => a.toUpperCase()), title: { text: 'PARTNER' }, crosshair: true },
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }},
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'TLD UPTAKE', type: 'column', data: final, color: "#485969", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
            ],
        });
    }, [partners, sexGroups, adultsCurrentByPartner, currentOnArtByPartnerData]);

    useEffect(() => {
        loadAdultTldUptakeByPartner();
    }, [loadAdultTldUptakeByPartner]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TLD UPTAKE AMONG PATIENTS CURRENT ON ART BY PARTNER
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={adultRegimenUptakeByPartner} />
            </CardBody>
        </Card>
    );
};

export default AdultTldUptakeByPartner;
