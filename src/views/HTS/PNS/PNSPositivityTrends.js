import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSPositivityTrends = () => {
    const filters = useSelector(state => state.filters);
    const [pnsPositivityTrends, setPNSPositivityTrends] = useState({});

    const loadPNSPositivityTrends = useCallback(async () => {
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
        const result = await getAll('hts/pnsSexualContactsByYear', params);
        const result2 = await getAll('hts/pnsChildrenByYear', params);
        const result3 = await getAll('hts/linkageNumberPositive', params);
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
        let linked = [];
        for(let i = 0; i < result.length; i++) {
            const result_month = result[i].month;
            const result_year = result[i].year.toString();
            if((year.toString() === fullYear.toString()) && (result_month <= lastYearMonth && result_year.toString() === lastFullYear.toString())) {
                continue;
            }
            let positiveR = parseInt(result[i].positive, 10) + parseInt(result2[i] ? result2[i].positive:0, 10);
            let positiveRT = parseInt(result3[i].positive ? result3[i].positive:0, 10);
            tested.push(positiveRT);
            months.push(monthNames[result[i].month] + ' ' + result_year.toString());
            linked.push(positiveR);
            let val = 0;
            if (positiveRT > 0) {
                val = ((positiveR/positiveRT)*100).toFixed(1);
            }
            positivity.push(Number(val));
        }
        setPNSPositivityTrends({
            title: { text: '' },
            xAxis: [{ categories: months.slice(-12), title: { text: 'Months' }, crosshair: true }],
            yAxis: [
                { title: { text: 'No of Positive' } },
                { title: { text: 'Positivity Percentage'}, opposite: true},
            ],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Total Positive', type: 'column', data: tested.slice(-12), yAxis: 0, color: "#142459",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'PNS Positive ', type: 'column', data: linked.slice(-12), yAxis: 0, color: "#1AB394",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Percentage', type: 'spline', data: positivity.slice(-12), yAxis: 1, color: "#E06F07", dataLabels: { enabled: true, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' }
            ],
        });
    }, [filters]);

    useEffect(() => {
        loadPNSPositivityTrends();
    }, [loadPNSPositivityTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                PNS CONTRIBUTION TO TOTAL POSITIVE
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={pnsPositivityTrends} />
            </CardBody>
        </Card>
    );
};

export default PNSPositivityTrends;
