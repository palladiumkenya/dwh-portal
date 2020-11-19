import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const PNSContactsTestingPositivityByPartner = ({ globalFilters }) => {
    const [pnsContactsTestingPositivityByPartner, setPNSContactsTestingPositivityByPartner] = useState({});
    const loadPNSContactsTestingPositivityByPartner = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const partners = [];
        let tested = [];
        let positivity = [];
        const result = await getAll('hts/uptakeByPartner', params);
        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].Partner);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }
        setPNSContactsTestingPositivityByPartner({
            title: { text: '' },
            xAxis: [{ categories: partners, title: { text: 'Service delivery Partners' }, crosshair: true }],
            yAxis: [
                { title: { text: 'No of Sexual Contacts Tested' } },
                { title: { text: 'Positivity (%)'}, opposite: true },
            ],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Total Tested', type: 'column', data: tested, yAxis: 0, color: "#485969",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Positivity Percentage', type: 'spline', data: positivity, yAxis: 1, color: "#E06F07", tooltip: { valueSuffix: ' %' }, dashStyle: 'Dash' }
            ],
        });
    }, [globalFilters]);

    useEffect(() => {
        loadPNSContactsTestingPositivityByPartner();
    }, [loadPNSContactsTestingPositivityByPartner]);

    return (
        <Card>
            <CardHeader className="cardTitle">SEXUAL CONTACT TESTING AND POSITIVITY BY PARTNER</CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={pnsContactsTestingPositivityByPartner} />
            </CardBody>
        </Card>
    );
};

export default PNSContactsTestingPositivityByPartner;
