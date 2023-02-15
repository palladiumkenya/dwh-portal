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
            year: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('YYYY')
                : '',
            fromDate: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('YYYYMM')
                : moment()
                      .subtract(2, 'month')
                      .add(17, 'days')
                      .format('YYYYMM'),
            toDate: filters.toDate
                ? moment(filters.toDate, 'MMM YYYY').format('YYYYMM')
                : moment()
                      .subtract(2, 'month')
                      .add(17, 'days')
                      .format('YYYYMM'),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        let result = await getAll('hts/pnsKnowledgeHivStatusCascade', params);
        result = result.pop()
        let pnsSexualContactsCascade = {
            elicited: result.elicited ? parseInt(result.elicited):0,
            tested: result.tested ? parseInt(result.tested):0,
            positive: result.positive ? parseInt(result.positive):0,
            linked: result.linked ? parseInt(result.linked):0,
            knownPositive: result.knownPositive ? parseInt(result.knownPositive):0,
            newNegatives: result.newNegatives ? parseInt(result.newNegatives):0,
            newPositives: result.newPositives ? parseInt(result.newPositives):0,
            unknownStatus: result.unknownStatus ? parseInt(result.unknownStatus):0
        };
        setPNSContactsHivStatus({
            title: { text: '' },
            xAxis: [{ categories: [''], crosshair: true }],
            yAxis: [{ title: { text: '' } }],
            plotOptions: { column: { stacking: 'normal' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Unknown HIV status', type: 'column', data: [pnsSexualContactsCascade.unknownStatus], color: "#EF0909" },
                { name: 'New Negatives', type: 'column', data: [pnsSexualContactsCascade.newNegatives], color: "#59A14F" },
                { name: 'New Positives', type: 'column', data: [pnsSexualContactsCascade.newPositives], color: "#F1450E" },
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
