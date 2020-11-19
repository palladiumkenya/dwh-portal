import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const PNSContactsTestingPositivityByCounty = ({ globalFilters }) => {
    const [pnsContactsTestingPositivityByCounty, setPNSContactsTestingPositivityByCounty] = useState({});
    const loadPNSContactsTestingPositivityByCounty = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const counties = [];
        let tested = [];
        let positivity = [];
        const result = await getAll('hts/uptakeByCounty', params);
        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].County);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }
        setPNSContactsTestingPositivityByCounty({
            title: { text: '' },
            xAxis: [{ categories: counties, title: { text: 'Counties' }, crosshair: true }],
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
        loadPNSContactsTestingPositivityByCounty();
    }, [loadPNSContactsTestingPositivityByCounty]);

    return (
        <Card>
            <CardHeader className="cardTitle">SEXUAL CONTACT TESTING AND POSITIVITY BY COUNTY</CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={pnsContactsTestingPositivityByCounty} />
            </CardBody>
        </Card>
    );
};

export default PNSContactsTestingPositivityByCounty;
