import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const PNSContactsTestingPositivityByCounty = ({ globalFilters }) => {
    const [pnsContactsTestingPositivityByCounty, setPNSContactsTestingPositivityByCounty] = useState({});
    const loadPNSContactsTestingPositivityByCounty = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            year: globalFilters.year,
            month: globalFilters.month
        };
        const counties = [];
        let tested = [];
        let positivity = [];
        const result = await getAll('hts/pnsSexualContactsByCounty', params);
        for(let i = 0; i < result.length; i++) {
            let testedR = parseInt(result[i].tested, 10);
            let positiveR = parseInt(result[i].positive, 10);
            let pos = 0;
            if (testedR > 0) {
                pos = ((positiveR/testedR)*100).toFixed(1);
            }
            counties.push(result[i].county);
            tested.push(testedR);
            positivity.push(Number(pos));
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
