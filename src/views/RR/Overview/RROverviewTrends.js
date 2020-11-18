import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment';
import { getAll } from '../../Shared/Api';

const RROverviewTrends = ({ globalFilters }) => {
    const [recency, setRecencyTrend] = useState({
        chart: { type: "column" },
        title: { text: "", style: { display: "none" } },
        xAxis: { categories: [], title: { text: null } },
        yAxis: { min: 0, title: { text: "", align: "high" }, labels: { overflow: "justify" } },
        plotOptions: { bar: { dataLabels: { enabled: true } } },
        legend: { enabled: false },
        credits: { enabled: true },
        responsive: { rules: [ { condition: { maxWidth: 500, }, chartOptions: { legend: { enabled: false } } } ] },
        series: [ { data: [], color: "#1AB394" } ]
    });
    const [consistency, setConsistencyTrend] = useState({
        chart: { type: "column" },
        title: { text: "", style: { display: "none" } },
        xAxis: { categories: [], title: { text: null } },
        yAxis: { min: 0, title: { text: "", align: "high" }, labels: { overflow: "justify" } },
        plotOptions: { bar: { dataLabels: { enabled: true } } },
        legend: { enabled: false },
        credits: { enabled: true },
        responsive: { rules: [ { condition: { maxWidth: 500, }, chartOptions: { legend: { enabled: false } } } ] },
        series: [ { data: [], color: "#1AB394" } ]
    });

    const loadRecencyTrend = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency
        };
        const result = await getAll('manifests/recency/trends/' + globalFilters.rrTab, params);
        const months = {};
        const data = {};
        const periodDate = moment(globalFilters.fromDate, 'MMM YYYY');
        
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
        
        setRecencyTrend({
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
    }, [globalFilters]);

    const loadConsistencyTrend = useCallback(async () => {
        const numberOfMonths = 12;
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency
        };

        let endDate = moment().endOf('month');
        if (globalFilters.toDate || globalFilters.fromDate) {
            endDate = moment(globalFilters.toDate ? globalFilters.toDate: globalFilters.fromDate, 'MMM YYYY').endOf('month');
        }
        const startDate = endDate.clone().subtract(numberOfMonths, 'month').add(1, 'month').startOf('month');
        
        params.startDate = startDate.format('YYYY-MM-DD');
        params.endDate = endDate.format('YYYY-MM-DD');

        let result = await getAll('manifests/consistency/trends/' + globalFilters.rrTab, params);

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
    }, [globalFilters]);

    useEffect(() => {
        loadRecencyTrend();
        loadConsistencyTrend();
    }, [loadRecencyTrend, loadConsistencyTrend]);

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
                            <HighchartsReact highcharts={Highcharts} options={recency} />
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
