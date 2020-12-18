import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/Api';
import { Card, CardBody, CardHeader } from 'reactstrap';
const _ = require("lodash");

const RRPartner = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [reportingByPartner, setReportingByPartner] = useState({});
    const [overAllReportingByPartner, setOverAllReportingByPartner] = useState({});
    const [consistencyOfReportingByPartner, setConsistencyOfReportingByPartner] = useState({});

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

    const loadReportingByPartner = useCallback(async () => {
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
        const overallReportingRateResult = await getAll('manifests/recencyreportingbypartner/' + rrTab, params);
        const consistencyResult = await getAll('manifests/consistencyreportingbycountypartner/' + rrTab + '?reportingType=partner', params);
        const partners = overallReportingRateResult.map(({ partner  }) => partner);
        const emrResultSeries = overallReportingRateResult.map(({ expected }) => parseInt(expected, 10));

        /* Overall reporting */
        const overAllReportingData = _.orderBy(overallReportingRateResult, [function(resultItem) { return parseInt(resultItem.Percentage, 10); }], ['desc']);
        const overAllReportingPartners = overAllReportingData.map(({ partner  }) => partner.capitalize());
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
        const consistency_partners = Object.keys(consistencyResult).map(r => r.capitalize());
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

        setReportingByPartner({
            title: { text: '' },
            xAxis: [{ categories: partners, title: { text: 'Partners' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number of EMR Sites' } },
                { title: { text: 'Percentage (%) Reporting Rate'}, opposite: true, min: 0, max: 100 },
            ],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, enabled: false },
            tooltip: { shared: true },
            series: [
                { name: 'Distribution of EMR Sites', type: 'column', data: emrResultSeries, color: "#2F4050" },
                // { name: 'Overall Reporting Rate', type: 'spline', data: overallReportingRateResultSeries, yAxis: 1, color: "#E06F07", dataLabels: { enabled: false, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' },
                // { name: 'Consistency of Reporting', type: 'spline', data: consistencyResultSeries, yAxis: 1, color: "#59A14F", dataLabels: { enabled: false, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' }
            ]
        });

        setOverAllReportingByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: overAllReportingPartners, title: { text: null } },
            yAxis: { min: 0, max: 120, title: { text: 'Percentage (%) of Overall Reporting Rates', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            series: [{ data: overAllReportingSeriesData, color: "#59A14F", name: 'Overall Reporting Rates' }]
        });

        setConsistencyOfReportingByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: consistency_partners, title: { text: null } },
            yAxis: { min: 0, max: 120, title: { text: 'Percentage (%) of Consistency of Reporting', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            series: [{ data: consistency_values, name: 'Consistency of Reporting' }]
        });
    }, [filters, rrTab]);

    useEffect(() => {
        loadReportingByPartner();
    }, [loadReportingByPartner]);

    return (
        <div className={"row"}>
            <div className={"col-4"}>
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Distribution of EMR sites - { tab } by Partner
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={reportingByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className={"col-4"}>
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Overall Reporting Rates - { tab } by Partner
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={overAllReportingByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className={"col-4"}>
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Consistency of Reporting - { tab } by Partner
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={consistencyOfReportingByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default RRPartner;
