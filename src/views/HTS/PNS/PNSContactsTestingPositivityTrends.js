import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const PNSContactsTestingPositivityTrends = ({ globalFilters }) => {
    const [pnsContactsTestingPositivityTrends, setPNSContactsTestingPositivityTrends] = useState({});

    const loadPNSContactsTestingPositivityTrends = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        const result = await getAll('hts/numberTestedAndPositivity', params);
        const result_positivity = await getAll('hts/uptakeByPositivity', params);
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };

        const today = new Date();
        const today_lastyear = new Date();
        const lastYear = new Date(today_lastyear.setFullYear(today.getFullYear() - 1));
        const lastFullYear = lastYear.getFullYear();
        const lastYearMonth = lastYear.getMonth() + 1;
        const fullYear = today.getFullYear();
        const year = params.year;

        let months = [];
        let positivity = [];
        let tested_new = [];
        let tested_retest = [];

        for(let i = 0; i < result.length; i++) {
            const result_month = result[i].month;
            const result_year = result[i].year.toString();

            if((year.toString() === fullYear.toString()) && (result_month <= lastYearMonth && result_year.toString() === lastFullYear.toString())) {
                continue;
            }

            if(result[i].TestedBefore === 'New') {
                tested_new.push(parseInt(result[i].Tested, 10));
                months.push(monthNames[result[i].month] + ' ' + result_year.toString());
            } else if(result[i].TestedBefore === 'Retest') {
                tested_retest.push(parseInt(result[i].Tested, 10));
            }
        }

        for(let i = 0; i < result_positivity.length; i++) {
            const result_month = result_positivity[i].MONTH;
            const result_year = result_positivity[i].YEAR.toString();
            if ((year.toString() === fullYear.toString()) && (result_month <= lastYearMonth && result_year.toString() === lastFullYear.toString())) {
                continue;
            }

            const val = parseFloat(parseFloat(result_positivity[i].positivity).toFixed(1));
            positivity.push(val);
        }

        setPNSContactsTestingPositivityTrends({
            title: { text: '' },
            xAxis: [{ categories: months, title: { text: 'Months' }, crosshair: true }],
            yAxis: [
                { title: { text: 'No of Sexual Contacts' } },
                { title: { text: 'Positivity Percentage'}, opposite: true },
            ],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Sexual Contacts Tested', type: 'column', data: tested_new, yAxis: 0, color: "#485969",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Sexual Contacts Linked ', type: 'column', data: tested_retest, yAxis: 0, color: "#1AB394",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Positivity Percentage', type: 'spline', data: positivity, yAxis: 1, color: "#E06F07", dataLabels: { enabled: true, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'Dash' }
            ],
        });
    }, [globalFilters]);

    useEffect(() => {
        loadPNSContactsTestingPositivityTrends();
    }, [loadPNSContactsTestingPositivityTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TRENDS IN SEXUAL CONTACT TESTING AND POSITIVITY
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={pnsContactsTestingPositivityTrends} />
            </CardBody>
        </Card>
    );
};

export default PNSContactsTestingPositivityTrends;
