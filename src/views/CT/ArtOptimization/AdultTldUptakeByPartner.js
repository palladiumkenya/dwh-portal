import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByPartner';

const AdultTldUptakeByPartner = () => {
    const [adultRegimenUptakeByPartner, setAdultTldUptakeByPartner] = useState({});
    const sexGroups = useSelector(selectors.getSexGroups);
    const partners = useSelector(selectors.getPartners);
    const adultsCurrentByPartner = useSelector(selectors.getAdultsCurrentByPartner);

    const loadAdultTldUptakeByPartner = useCallback(async () => {
        let data = [];
        for(let i = 0; i < sexGroups.length; i++) {
            data[i] = [];
            for(let j = 0; j < partners.length; j++) {
                data[i][j] = 0;
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
        setAdultTldUptakeByPartner({
            title: { text: '' },
            xAxis: { categories: partners.map(a => a.toUpperCase()), title: { text: 'PARTNER' }, crosshair: true },
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }},
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'MALE', type: 'column', data: data[1], color: "#14084D" },
                { name: 'FEMALE ', type: 'column', data: data[0], color: "#EA4C8B" },
            ],
        });
    }, [partners, sexGroups, adultsCurrentByPartner]);

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
