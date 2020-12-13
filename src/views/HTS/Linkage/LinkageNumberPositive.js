import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const LinkageNumberPositive = () => {
    const filters = useSelector(state => state.filters);
    const [numberPositiveLinked, setNumberPositiveLinked] = useState({});

    const loadNumberPositiveLinked = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") :  new Date().getFullYear()
        };
        // params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/linkageNumberPositiveByType', params);
        const result2 = await getAll('hts/linkageNumberPositive', params);
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };
        let months = [];
        let positive = [[], []];
        let linked = [];
        let linkage = [];

        const year = params.year;
        const today = new Date();
        const today_lastyear = new Date();
        const lastYear = new Date(today_lastyear.setFullYear(today.getFullYear() - 1));
        const lastFullYear = lastYear.getFullYear();
        const lastYearMonth = lastYear.getMonth() + 1;
        const fullYear = today.getFullYear();

        for(let i = 0; i < result.length; i++) {
            const result_month = result[i].month;
            const result_year = result[i].year.toString();
            if((year.toString() === fullYear.toString()) && (result_month <= lastYearMonth && result_year.toString() === lastFullYear.toString())) {
                continue;
            }

            const monthYearFilterNew = result.filter(y => y.month === result[i].month && y.year.toString() === result_year && result[i].TestedBefore === 'New');
            const monthYearFilterRetest = result.filter(y => y.month === result[i].month && y.year.toString() === result_year && result[i].TestedBefore === 'Retest');
            if (monthYearFilterNew.length > 1) {
                if (!months.includes(monthNames[result[i].month] + ' ' + result_year.toString())) {
                    months.push(monthNames[result[i].month] + ' ' + result_year.toString());
                }
                positive[0].push(parseInt(monthYearFilterNew[0].positive, 10));
                positive[1].push(parseInt(monthYearFilterNew[1].positive, 10));
            } else if (monthYearFilterNew.length === 0 && monthYearFilterRetest.length === 1) {
                if (!months.includes(monthNames[result[i].month] + ' ' + result_year.toString())) {
                    months.push(monthNames[result[i].month] + ' ' + result_year.toString());
                    positive[0].push(0);
                    positive[1].push(parseInt(monthYearFilterRetest[0].positive, 10));
                }
            } else if (monthYearFilterNew.length === 1 && monthYearFilterRetest.length === 0) {
                if (!months.includes(monthNames[result[i].month] + ' ' + result_year.toString())) {
                    months.push(monthNames[result[i].month] + ' ' + result_year.toString());
                    positive[0].push(parseInt(monthYearFilterNew[0].positive, 10));
                    positive[1].push(0);
                }
            }
        }
        for(let i = 0; i < result2.length; i++) {
            const result_month = result2[i].month;
            const result_year = result2[i].year.toString();
            if ((year.toString() === fullYear.toString()) && (result_month <= lastYearMonth && result_year.toString() === lastFullYear.toString())) {
                continue;
            }

            linked.push(parseInt(result2[i].linked, 10));
            linkage.push(Number(parseFloat(result2[i].linkage).toFixed(1)));
        }

        setNumberPositiveLinked({
            title: { text: '', },
            xAxis: [{ categories: months, title: { text: 'Months' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number Positive' } },
                { title: { text: 'Linkage (%)'}, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'normal' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'New', type: 'column', data: positive[0], color: "#1AB394" },
                { name: 'Retest', type: 'column', data: positive[1], color: "#485969" },
                { name: 'Linkage', type: 'spline', data: linkage, yAxis: 1, color: "#E06F07", dashStyle: 'ShortDot', tooltip: { valueSuffix: '%' } }
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadNumberPositiveLinked();
    }, [loadNumberPositiveLinked]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                    HTS Linkage by month
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={numberPositiveLinked} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default LinkageNumberPositive;
