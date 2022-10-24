import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSContactsTestingPositivityTrends = () => {
    const filters = useSelector(state => state.filters);
    const [pnsContactsTestingPositivityTrends, setPNSContactsTestingPositivityTrends] = useState({});

    const loadPNSContactsTestingPositivityTrends = useCallback(async () => {
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
                : moment().subtract(14, 'month').format('YYYYMM'),
            toDate: filters.toDate
                ? moment(filters.toDate, 'MMM YYYY').format('YYYYMM')
                : moment()
                      .subtract(2, 'month')
                      .add(17, 'days')
                      .format('YYYYMM'),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/pnsSexualContactsByYear', params);
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
        let tested = [];
        let positive = [];
        for(let i = 0; i < result.length; i++) {
            const result_month = result[i].month;
            const result_year = result[i].year.toString();
            if((year.toString() === fullYear.toString()) && (result_month <= lastYearMonth && result_year.toString() === lastFullYear.toString())) {
                continue;
            }
            tested.push(parseInt(result[i].tested, 10));
            months.push(monthNames[result[i].month] + ' ' + result_year.toString());
            positive.push(parseInt(result[i].positive, 10));
            let val = 0;
            if (parseInt(result[i].tested, 10) > 0) {
                val = ((parseFloat(result[i].positive)/parseFloat(result[i].tested))*100).toFixed(1);
            }
            positivity.push(Number(val));
        }
        setPNSContactsTestingPositivityTrends({
            title: { text: '' },
            xAxis: [{ categories: months.slice(-12), title: { text: 'Months' }, crosshair: true }],
            yAxis: [
                { title: { text: 'No of Sexual Contacts' } },
                { title: { text: 'Positivity Percentage'}, opposite: true },
            ],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Sexual Contacts Tested', type: 'column', data: tested.slice(-12), yAxis: 0, color: "#142459",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Sexual Contacts Positive ', type: 'column', data: positive.slice(-12), yAxis: 0, color: "#1AB394",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Positivity Percentage', type: 'spline', data: positivity.slice(-12), yAxis: 1, color: "#E06F07", dataLabels: { enabled: true, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' }
            ],
        });
    }, [filters]);

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
