import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSContactsCascade = () => {
    const filters = useSelector(state => state.filters);
    const [pnsContactsCascade, setPNSContactsCascade] = useState({});
    
    const loadPNSContactsCascade = useCallback(async () => {
        let categories = [
            'Index Clients',
            'Contacts',
            'Known Positive',
            'Sexual Contacts Eligible',
            'Sexual Contacts Tested',
            'Sexual Contacts Positive',
            'Sexual Contacts Linked',
        ];
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
        const result1 = await getAll('hts/pnsSexualContactsCascade', params);
        let pnsSexualContactsCascade = {
            elicited: result1.elicited ? result1.elicited:0,
            tested: result1.tested ? result1.tested:0,
            positive: result1.positive ? result1.positive:0,
            linked: result1.linked ? result1.linked:0,
            knownPositive: result1.knownPositive ? result1.knownPositive:0
        };
        const result2 = await getAll('hts/pnsIndex', params);
        let data = [
            result2.indexClients ? result2.indexClients : 0,
            pnsSexualContactsCascade.elicited ? pnsSexualContactsCascade.elicited : 0,
            pnsSexualContactsCascade.knownPositive ? pnsSexualContactsCascade.knownPositive : 0,
            (parseInt(pnsSexualContactsCascade.elicited, 10) - parseInt(pnsSexualContactsCascade.knownPositive, 10)) > 0 ? (parseInt(pnsSexualContactsCascade.elicited, 10) - parseInt(pnsSexualContactsCascade.knownPositive, 10)) : 0,
            pnsSexualContactsCascade.tested ? pnsSexualContactsCascade.tested : 0,
            pnsSexualContactsCascade.positive ? pnsSexualContactsCascade.positive : 0,
            pnsSexualContactsCascade.linked ? pnsSexualContactsCascade.linked : 0,
        ].map(x => Number(parseFloat(x).toFixed(0)));
        setPNSContactsCascade({
            title: { text: '' },
            xAxis: { categories: categories, crosshair: true },
            yAxis: { title: { text: '' } },
            legend: { enabled: false, },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () {
                return '' + this.point.text;
            }}}},
            series: [{ name: 'PNS Cascade of Sexual Contacts', color: "#485969", type: 'column', data: [
                { name: categories[0], y: data[0], text: data[0].toLocaleString('en') },
                { name: categories[1], y: data[1], text: data[1].toLocaleString('en') },
                { name: categories[2], y: data[2], text: data[2].toLocaleString('en') + ' (' + parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%)' },
                { name: categories[3], y: data[3], text: data[3].toLocaleString('en') + ' (' + parseFloat(((data[2]/data[0])*100).toString()).toFixed(0) + '%)' },
                { name: categories[4], y: data[4], text: data[4].toLocaleString('en') + ' (' + parseFloat(((data[3]/data[0])*100).toString()).toFixed(0) + '%)' },
                { name: categories[5], y: data[5], text: data[5].toLocaleString('en') + ' (' + parseFloat(((data[4]/data[0])*100).toString()).toFixed(0) + '%)' },
                { name: categories[6], y: data[6], text: data[6].toLocaleString('en') + ' (' + parseFloat(((data[5]/data[0])*100).toString()).toFixed(0) + '%)' },
            ]}]
        });
    }, [filters]);

    useEffect(() => {
        loadPNSContactsCascade();
    }, [loadPNSContactsCascade]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="cardTitle">PNS CASCADE OF SEXUAL CONTACTS</CardTitle>
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={pnsContactsCascade} />
            </CardBody>
        </Card>
    );
};

export default PNSContactsCascade;
