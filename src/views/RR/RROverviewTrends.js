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
    const [expected, setExpected] = useState(0);
    const [overallReportingTrend, setOverallReportingTrend] = useState({});
    const [consistency, setConsistencyTrend] = useState({});

    const loadExpected = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate
                ? filters.fromDate
                : moment()
                      .subtract(2, 'month')
                      .add(16, 'days')
                      .format('MMM YYYY'),
        };
        params.period = moment(params.fromDate, "MMM YYYY").startOf('month').subtract(1, 'month').format('YYYY,M');
        const data = await getAll('manifests/expected/' + rrTab, params);
        setExpected(data.expected);
    }, [filters, rrTab]);

    const loadOverallReportingTrend = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate
                ? filters.fromDate
                : moment()
                      .subtract(2, 'month')
                      .add(16, 'days')
                      .format('MMM YYYY'),
        };
        // params.period = moment(params.fromDate, "MMM YYYY").startOf('month').subtract(1, 'month').format('YYYY,M');
        const result = await getAll('manifests/recency/trends/' + rrTab, params);
        const months = {};
        const data = {};
        const periodDate = moment(
            filters.fromDate
                ? filters.fromDate
                : moment().subtract(2, 'month').add(16, 'days'),
            'MMM YYYY'
        );
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
        const categories = Object.values(months).slice(-12);
        const dataRecent = Object.values(data).slice(-12);
        const dataProcessed = dataRecent.map(d => Math.round((d/expected) * 100));
        setOverallReportingTrend({
            title: { text: '', },
            xAxis: [{ labels: { style: { fontSize: '9px' } },categories: categories.map(name => name ? name.toUpperCase() : name), crosshair: true }],
            yAxis: [{ title: { text: 'Percentage'.toUpperCase() }, labels: { format: '{value}' } }],
            plotOptions: { column: { dataLabels: { enabled: true, format: '<b>{point.y} %</b>' } } },
            legend: { enabled: false },
            series: [ { name: "Overall Reporting Rates", type: "column", data: dataProcessed, color: "#1AB394", tooltip: { valueSuffix: ' %' } } ]
        });
    }, [filters, rrTab, expected]);

    const loadConsistencyTrend = useCallback(async () => {
        const numberOfMonths = 12;
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate
                ? filters.fromDate
                : moment()
                      .subtract(2, 'month')
                      .add(16, 'days')
                      .format('MMM YYYY'),
        };
        params.period = moment(params.fromDate, 'MMM YYYY')
            .subtract(2, 'month')
            .add(16, 'days')
            .format('YYYY,M');
        let endDate = moment()
            .subtract(2, 'month')
            .add(16, 'days')
            .endOf('month');
        if (filters.toDate || filters.fromDate) {
            endDate = moment(filters.toDate ? filters.toDate: filters.fromDate, 'MMM YYYY').endOf('month');
        }
        const startDate = endDate
            .clone()
            .subtract(numberOfMonths, 'month')
            .subtract(2, 'month')
            .add(16, 'days')
            .startOf('month');
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
        const categories = Object.values(months).slice(-12);
        const dataRecent = Object.values(data).slice(-12);
        const dataProcessed = dataRecent.map(d => Math.round((d/expected) * 100));
        setConsistencyTrend({
            title: { text: '', },
            xAxis: [{ labels: { style: { fontSize: '9px' } }, categories: categories.map(name => name ? name.toUpperCase() : name), crosshair: true }],
            yAxis: [{ title: { text: 'Percentage'.toUpperCase() }}],
            plotOptions: { column: { dataLabels: { enabled: true, format: '<b>{point.y} %</b>' }}},
            legend: { enabled: false },
            series: [ { name: "Consistency of Reporting", type: "column", data: dataProcessed, color: "#2F4050", tooltip: { valueSuffix: ' %' }}]
        });
    }, [filters, rrTab, expected]);

    useEffect(() => {
        loadExpected();
        loadOverallReportingTrend();
        loadConsistencyTrend();
    }, [loadExpected, loadOverallReportingTrend, loadConsistencyTrend]);

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
