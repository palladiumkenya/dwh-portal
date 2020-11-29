import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const UptakeNumberTestedAndPositivity = () => {
    const filters = useSelector(state => state.filters);
    const [numberTestedPositivity, setNumberTestedPositivity] = useState({});

    const loadNumberTestedPositivity = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") : moment().format("YYYY"),
        };
        // params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
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
        setNumberTestedPositivity({
            title: { text: '', },
            xAxis: [{ categories: months, title: { text: 'Months' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number Tested' } },
                { title: { text: 'HIV Positivity'}, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'normal' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'New', type: 'column', data: tested_new, yAxis: 0, color: "#1AB394" },
                { name: 'Retest', type: 'column', data: tested_retest, yAxis: 0, color: "#485969" },
                { name: 'HIV Positivity', type: 'spline', data: positivity, yAxis: 1, color: "#E06F07", dashStyle: 'ShortDot', tooltip: { valueSuffix: ' %' } }
            ],
        });
    }, [filters]);

    useEffect(() => {
        loadNumberTestedPositivity();
    }, [loadNumberTestedPositivity]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HIV TESTING SERVICES Uptake and Hiv Positivity by Month
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={numberTestedPositivity} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UptakeNumberTestedAndPositivity;
