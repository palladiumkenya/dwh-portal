import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSContactsHivStatus = () => {
    const filters = useSelector(state => state.filters);
    const [pnsContactsHivStatus, setPNSContactsHivStatus] = useState({});
    
    const loadPNSContactsHivStatus = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):""
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/pnsSexualContactsCascade', params);
        let pnsSexualContactsCascade = {
            elicited: result.elicited ? parseInt(result.elicited):0,
            tested: result.tested ? parseInt(result.tested):0,
            positive: result.positive ? parseInt(result.positive):0,
            linked: result.linked ? parseInt(result.linked):0,
            knownPositive: result.knownPositive ? parseInt(result.knownPositive):0
        };
        setPNSContactsHivStatus({
            title: { text: '' },
            xAxis: [{ categories: [''], crosshair: true }],
            yAxis: [{ title: { text: '' } }],
            plotOptions: { column: { stacking: 'normal' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Unknown HIV status', type: 'column', data: [0], color: "#EF0909" },
                { name: 'New Negatives', type: 'column', data: [0], color: "#59A14F" },
                { name: 'New Positives', type: 'column', data: [pnsSexualContactsCascade.positive], color: "#F1450E" },
                { name: 'Known Positives', type: 'column', data: [pnsSexualContactsCascade.knownPositive], color: "#1184F0" },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadPNSContactsHivStatus();
    }, [loadPNSContactsHivStatus]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="cardTitle">CONTACTS' KNOWLEDGE OF HIV STATUS</CardTitle>
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={pnsContactsHivStatus} />
            </CardBody>
        </Card>
    );
};

export default PNSContactsHivStatus;
