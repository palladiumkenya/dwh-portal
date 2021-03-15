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
        for(let i = 0; i < adultsCurrentByPartner.length; i++) {
            data.push(
                {
                    Male: adultsCurrentByPartner[i].gender === "Male" ? adultsCurrentByPartner[i].txCurr : 0,
                    Female: adultsCurrentByPartner[i].gender === "Female" ? adultsCurrentByPartner[i].txCurr : 0,
                    partner: adultsCurrentByPartner[i].partner ? adultsCurrentByPartner[i].partner.toUpperCase() : null
                }
            );
        }
        const valChartData = [];
        partners.map(partner => {
            const partnerData = data.filter(x => x.partner === partner);
            let totalPartnerTld = 0;
            if (partnerData.length > 0) {
                for (const partnerDatum of partnerData) {
                    totalPartnerTld = totalPartnerTld + partnerDatum.Female + partnerDatum.Male;
                }

                const partnerIndex = currentOnArtByPartnerData.partners.indexOf(partner);
                const partnerTxcurr = parseInt(currentOnArtByPartnerData.currentOnArt[partnerIndex]);
                let percentage = totalPartnerTld === 0 || partnerTxcurr === 0 ? 0 : Number(((totalPartnerTld/partnerTxcurr)*100).toFixed(0));
                valChartData.push(
                    {
                        y: percentage > 100 ? 100: percentage,
                        absoluteY: totalPartnerTld.toLocaleString('en'),
                        partner: partner,
                        text: (percentage > 100 ? 100: percentage) + '%',
                    }
                );
            }
        });

        valChartData.sort(function(a, b){
            return b.y - a.y;
        });

        setAdultTldUptakeByPartner({
            title: { text: '' },
            xAxis: { categories: valChartData.map(a => a.partner.toUpperCase()), title: { text: 'PARTNER' }, crosshair: true },
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }},
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            plotOptions: { column: { dataLabels: { enabled: true, formatter: function () { return '' + this.point.text; } } }},
            series: [
                { name: 'TLD UPTAKE', type: 'column', data: valChartData, color: "#485969", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
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
