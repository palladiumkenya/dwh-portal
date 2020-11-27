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
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY")
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/pnsSexualContactsByYear', params);
        const result2 = await getAll('hts/pnsChildrenByYear', params);
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
            let testedR = parseInt(result[i].tested, 10) + parseInt(result2[i] ? result2[i].tested:0, 10);
            let positiveR = parseInt(result[i].positive, 10) + parseInt(result2[i] ? result2[i].positive:0, 10);
            let linkedR = parseInt(result[i].linked, 10) + parseInt(result2[i] ? result2[i].linked:0, 10);
            tested.push(testedR);
            months.push(monthNames[result[i].month] + ' ' + result_year.toString());
            linked.push(linkedR);
            let val = 0;
            if (testedR > 0) {
                val = ((positiveR/testedR)*100).toFixed(1);
            }
            positivity.push(Number(val));
        }
        setPNSPositivityTrends({
            title: { text: '' },
            xAxis: [{ categories: months, title: { text: 'Months' }, crosshair: true }],
            yAxis: [
                { title: { text: 'No of Positive' } },
                { title: { text: 'Positivity Percentage'}, opposite: true },
            ],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number Tested', type: 'column', data: tested, yAxis: 0, color: "#485969",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Number Linked ', type: 'column', data: linked, yAxis: 0, color: "#1AB394",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Positivity Percentage', type: 'spline', data: positivity, yAxis: 1, color: "#E06F07", dataLabels: { enabled: true, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'Dash' }
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
