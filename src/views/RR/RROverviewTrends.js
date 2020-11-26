import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment';
import { getAll } from '../Shared/Api';

const RROverviewTrends = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [overallReportingTrend, setOverallReportingTrend] = useState({});
    const [consistency, setConsistencyTrend] = useState({});

    const loadOverallReportingTrend = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            fromDate: filters.fromDate ? filters.fromDate : moment().format("MMM YYYY")
        };
        // params.period = moment(params.fromDate, "MMM YYYY").startOf('month').subtract(1, 'month').format('YYYY,M');
        const result = await getAll('manifests/recency/trends/' + rrTab, params);
        const months = {};
        const data = {};
        const periodDate = moment(filters.fromDate, 'MMM YYYY');
        for (const element of result) {
            let dataDate = moment(element.year + "-" + element.month, 'YYYY-M');
            if (dataDate.isAfter(periodDate)) {
                continue;
            }
            let monthYear = dataDate.format('YYYYMM');
            if (typeof months[monthYear] !== 'undefined') {
                data[monthYear] = parseInt(data[monthYear]) + parseInt(element.recency);
            } else {
                months[monthYear] = dataDate.format('MMM YYYY');
                data[monthYear] = parseInt(element.recency);
            }
        }
        setOverallReportingTrend({
            chart: { type: "column" },
            title: { text: "", style: { display: "none" } },
            xAxis: { categories: Object.values(months).slice(-12), title: { text: null } },
            yAxis: { min: 0, title: { text: "", align: "high" }, labels: { overflow: "justify" } },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            credits: { enabled: true },
            responsive: { rules: [ { condition: { maxWidth: 500, }, chartOptions: { legend: { enabled: false } } } ] },
            series: [ { name: "Overall Reporting Rates", data: Object.values(data).slice(-12), color: "#1AB394" } ]
        });
    }, [filters, rrTab]);

    const loadConsistencyTrend = useCallback(async () => {
        const numberOfMonths = 12;
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            fromDate: filters.fromDate ? filters.fromDate : moment().format("MMM YYYY")
        };
        params.period = moment(params.fromDate, "MMM YYYY").startOf('month').subtract(1, 'month').format('YYYY,M');
        let endDate = moment().endOf('month');
        if (filters.toDate || filters.fromDate) {
            endDate = moment(filters.toDate ? filters.toDate: filters.fromDate, 'MMM YYYY').endOf('month');
        }
        const startDate = endDate.clone().subtract(numberOfMonths, 'month').add(1, 'month').startOf('month');
        params.startDate = startDate.format('YYYY-MM-DD');
        params.endDate = endDate.format('YYYY-MM-DD');
        let result = await getAll('manifests/consistency/trends/' + rrTab, params);
        const months = {};
        const data = {};
        for (const element of result) {
            let monthYear = moment(element.endPeriod).format('YYYYMM');
            if (typeof months[monthYear] !== 'undefined') {
                data[monthYear] = parseInt(data[monthYear]) + parseInt(element.consistency);
            } else {
                months[monthYear] = moment(element.endPeriod).format('MMM YYYY');
                data[monthYear] = parseInt(element.consistency);
            }
        }
        setConsistencyTrend({
            chart: { type: "column" },
            title: { text: "", style: { display: "none" } },
            xAxis: { categories: Object.values(months).slice(numberOfMonths*-1), title: { text: null } },
            yAxis: { min: 0, title: { text: "", align: "high" }, labels: { overflow: "justify" } },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            credits: { enabled: true },
            responsive: { rules: [ { condition: { maxWidth: 500, }, chartOptions: { legend: { enabled: false } } } ] },
            series: [ { name: "Consistency of Reporting", data: Object.values(data).slice(numberOfMonths*-1), color: "#2F4050" } ]
        });
    }, [filters, rrTab]);

    useEffect(() => {
        loadOverallReportingTrend();
        loadConsistencyTrend();
    }, [loadOverallReportingTrend, loadConsistencyTrend]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        <span className="trends-text">
                            TRENDS IN OVERALL REPORTING
                        </span>
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={overallReportingTrend} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        <span className="trends-text">
                            TRENDS IN CONSISTENCY OF REPORTING
                        </span>
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={consistency} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default RROverviewTrends;
