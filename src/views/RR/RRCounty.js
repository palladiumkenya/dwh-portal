import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/Api';
import { Card, CardBody, CardHeader } from 'reactstrap';
const _ = require("lodash");

const RRCounty = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [reportingByCounty, setReportingByCounty] = useState({});
    const [overAllReportingByCounty, setOverAllReportingByCounty] = useState({});
    const [consistencyOfReportingByCounty, setConsistencyOfReportingByCounty] = useState({});
    let tab = null;
    if (rrTab.toUpperCase() === "CT") {
        tab = "Care & Treatment";
    } else if (rrTab.toUpperCase() === "HTS") {
        tab = "HTS";
    } else if (rrTab.toUpperCase() === "PKV") {
        tab = "PKV";
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
    }

    const loadReportingByCounty = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate ? filters.fromDate : moment().format("MMM YYYY")
        };
        params.period = moment(params.fromDate, "MMM YYYY").startOf('month').subtract(1, 'month').format('YYYY,M');
        const overallReportingRateResult = await getAll('manifests/recencyreportingbycounty/' + rrTab, params);
        const consistencyResult = await getAll('manifests/consistencyreportingbycountypartner/' + rrTab + '?reportingType=county', params);

        /* Overall reporting */
        const overAllReportingData = _.orderBy(overallReportingRateResult, [function(resultItem) { return parseInt(resultItem.Percentage, 10); }], ['desc']);
        const overAllReportingCounties = overAllReportingData.map(({ county  }) => county.capitalize());
        let overAllReportingSeriesData = overAllReportingData.map(({ Percentage }) => parseInt(Percentage, 10) > 100 ? 100 : parseInt(Percentage, 10));
        overAllReportingSeriesData = overAllReportingSeriesData.map(function(r) {
            if (r <= 50) {
                return {
                    y: r,
                    color: 'red'
                }
            } else if (r >= 51 && r <= 89) {
                return { y: r, color: '#E06F07' }
            } else if (r >= 90) {
                return { y: r, color: '#59A14F' }
            }
        });

        /* Consistency of reporting */
        const consistency_counties = Object.keys(consistencyResult).map(r => r.capitalize());
        const consistency_values = Object.values(consistencyResult).map(function(r) {
            if (r <= 50) {
                return {
                    y: r,
                    color: 'red'
                }
            } else if (r >= 51 && r <= 89) {
                return { y: r, color: '#E06F07' }
            } else if (r >= 90) {
                return { y: r > 100 ? 100 : r, color: '#59A14F' }
            }
        });

        const counties = overallReportingRateResult.map(({ county  }) => county);
        const emrResultSeries = overallReportingRateResult.map(({ expected }) => parseInt(expected, 10));

        setReportingByCounty({
            title: { text: '' },
            xAxis: [{ categories: counties, title: { text: 'Counties' }, crosshair: true }],
            yAxis: [
                { title: { text: '' } }
            ],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, enabled: false },
            tooltip: { shared: true },
            series: [
                { name: 'Distribution of EMR Sites', type: 'column', data: emrResultSeries, color: "#2F4050" },
                // { name: 'Overall Reporting Rate', type: 'spline', data: overallReportingRateResultSeries, yAxis: 1, color: "#E06F07", dataLabels: { enabled: false, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' },
                // { name: 'Consistency of Reporting', type: 'spline', data: consistencyResultSeries, yAxis: 1, color: "#59A14F", dataLabels: { enabled: false, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' }
            ]
        });

        setOverAllReportingByCounty({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: overAllReportingCounties, title: { text: null } },
            yAxis: { min: 0, max: 120, title: { text: 'Percentage (%) of Overall Reporting Rates', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            series: [{ name: "Overall Reporting Rates", data: overAllReportingSeriesData, tooltip: { valueSuffix: ' %' } }]
        });

        setConsistencyOfReportingByCounty({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: consistency_counties, title: { text: null } },
            yAxis: { min: 0, max: 120, title: { text: 'Percentage (%) of Consistency of Reporting', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            series: [{ data: consistency_values, name: 'Consistency of Reporting', tooltip: { valueSuffix: ' %' } }]
        });
    }, [filters, rrTab]);

    useEffect(() => {
        loadReportingByCounty();
    }, [loadReportingByCounty]);

    return (
        <div className="row">
            <div className={"col-4"}>
                <Card className={"trends-card"}>
                    <CardHeader className={"trends-header"}>
                        Distribution of EMR sites - { tab } By County
                    </CardHeader>
                    <CardBody className={"trends-body"}>
                        <div className={"col-12"}>
                            <HighchartsReact highcharts={Highcharts} options={reportingByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className={"col-4"}>
                <Card className={"trends-card"}>
                    <CardHeader className={"trends-header"}>
                        Overall Reporting - { tab } By County
                    </CardHeader>
                    <CardBody className={"trends-body"}>
                        <div className={"col-12"}>
                            <HighchartsReact highcharts={Highcharts} options={overAllReportingByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className={"col-4"}>
                <Card className={"trends-card"}>
                    <CardHeader className={"trends-header"}>
                        Consistency of Reporting - { tab } By County
                    </CardHeader>
                    <CardBody className={"trends-body"}>
                        <div className={"col-12"}>
                            <HighchartsReact highcharts={Highcharts} options={consistencyOfReportingByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default RRCounty;
