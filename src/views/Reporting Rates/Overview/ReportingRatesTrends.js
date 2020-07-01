import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment';
import { getAll } from '../../Shared/Api';

const ReportingRatesTrends = ({ globalFilter }) => {
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

    useEffect(() => {
        loadRecencyTrend();
        loadConsistencyTrend();
    }, [globalFilter]);

    const loadRecencyTrend = async () => {
        let params = null;
        
        if (globalFilter) {
            params = { ...globalFilter };
        }

        delete params.period;
        const result = await getAll('manifests/recency/trends/' + params.docket, params);
        const months = {};
        const data = {};
        const periodDate = moment(globalFilter.period, 'YYYY,M');
        
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
            series: [ { data: Object.values(data).slice(-12), color: "#1AB394" } ]
        });
    };

    const loadConsistencyTrend = async () => {
        let params = null;
        const numberOfMonths = 12;
        
        if (globalFilter) {
            params = { ...globalFilter };
        }

        let result = [];
        const endDate = moment(globalFilter.period, 'YYYY,M');
        const startDate = endDate.clone().subtract(numberOfMonths, 'month');

        for (let i = 0; i < numberOfMonths; i++) {
            params.period = startDate.format('YYYY,M');
            let res = await getAll('manifests/consistency/trends/' + params.docket, params);
            result = result.concat(res);
            startDate.add(1, 'month');
        }

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
            series: [ { data: Object.values(data).slice(numberOfMonths*-1), color: "#2F4050" } ]
        });
    };

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        <span className="trends-text">
                            TRENDS IN REPORTING ({globalFilter.dockets[globalFilter.docket]} - RECENCY)
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
                            TRENDS IN REPORTING ({globalFilter.dockets[globalFilter.docket]} - CONSISTENCY)
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

export default ReportingRatesTrends;
