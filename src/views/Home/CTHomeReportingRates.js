import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment';
import { getAll } from './../Shared/Api';

const CTHomeReportingRates = ({ globalFilter }) => {
    const [expected, setExpected] = useState(0);
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

    const getPerc = (count, total) => {
        return parseInt((count / total) * 100);
    };

    const loadExpected = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const data = await getAll('manifests/expected/CT', params);
        setExpected(data.expected);
    }, [globalFilter]);

    const loadRecencyTrend = useCallback(async () => {
        let params = null;
        
        if (globalFilter) {
            params = { ...globalFilter };
        }

        delete params.period;
        const result = await getAll('manifests/recency/trends/CT', params);
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
            series: [ { name: "Reporting Rates", data: Object.values(data).slice(-12), color: "#1AB394" } ]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadExpected();
        loadRecencyTrend();
    }, [loadExpected, loadRecencyTrend]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        <span className="trends-text">
                            REPORTING RATES IN CARE & TREATMENT
                        </span>
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={recency} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CTHomeReportingRates;
