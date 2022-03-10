import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { capitalize, getAll } from '../Shared/Api';
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
        params.period = filters.fromDate ?
            moment(params.fromDate, "MMM YYYY").startOf('month').subtract(0, 'month').format('YYYY,M') :
            moment().startOf('month').subtract(1, 'month').format('YYYY,M');
        const overallReportingRateResult = await getAll('manifests/recencyreportingbycounty/' + rrTab, params);
        params.period = filters.fromDate ?
            moment(params.fromDate, "MMM YYYY").startOf('month').subtract(1, 'month').format('YYYY,M') :
            moment().startOf('month').subtract(2, 'month').format('YYYY,M');
        const consistencyResult = await getAll('manifests/consistencyreportingbycountypartner/' + rrTab + '?reportingType=county', params);
        const rrData = await getAll('manifests/expectedPartnerCounty/' + rrTab + '?reportingType=county', params);

        /* Overall reporting */
        const overAllReportingData = _.orderBy(overallReportingRateResult, [function(resultItem) { return parseInt(resultItem.Percentage, 10); }], ['desc']);
        const overAllReportingCounties = overAllReportingData.map(({ county  }) => capitalize(county));
        let overAllReportingSeriesData = overAllReportingData.map(({ Percentage }) => parseInt(Percentage, 10) > 100 ? 100 : parseInt(Percentage, 10));
        overAllReportingSeriesData = overAllReportingSeriesData.map(function(r) {
            if (r <= 50) {
                return {
                    y: r,
                    color: '#BB1414'
                }
            } else if (r >= 51 && r <= 89) {
                return { y: r, color: '#f7941d' }
            } else if (r >= 90) {
                return { y: r, color: '#59A14F' }
            } else {
                return {
                    y: r,
                    color: '#BB1414'
                }
            }
        });

        /* Consistency of reporting */
        const consistency_values = [];
        let expected = 0;
        for (const [key, value] of Object.entries(consistencyResult)) {
            const expectedCounty =  rrData.filter(obj => obj.county === key);
            if (expectedCounty.length > 0) {
                expected = expectedCounty[0].totalexpected;
            }

            const cos = expected === 0 ? 0 : parseInt(((value/expected)*100).toString());
            if (cos <= 50) {
                consistency_values.push({
                    county: key,
                    y: cos,
                    color: '#BB1414'
                });
            } else if (cos >= 51 && cos <= 89) {
                consistency_values.push({ county: key, y: cos, color: '#f7941d' });
            } else if (cos >= 90) {
                consistency_values.push({ county: key, y: cos > 100 ? 100 : cos, color: '#59A14F' });
            } else {
                consistency_values.push({
                    county: key,
                    y: cos,
                    color: '#BB1414'
                });
            }
        }
        consistency_values.sort(function(a, b) {
            return b.y - a.y;
        });
        const consistency_counties = consistency_values.map(obj => capitalize(obj.county));

        const counties = overallReportingRateResult.map(({ county  }) => county);
        const emrResultSeries = overallReportingRateResult.map(({ expected }) => parseInt(expected, 10));

        setReportingByCounty({
            title: { text: '' },
            xAxis: [{ categories: counties.map(name=> name?name.toUpperCase(): name), title: { text: 'Counties'.toUpperCase() }, crosshair: true }],
            yAxis: [
                { title: { text: 'NUMBER OF EMR SITES' } }
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
            xAxis: { categories: overAllReportingCounties.map(name=> name?name.toUpperCase(): name), title: { text: null } },
            yAxis: { min: 0, max: 120, title: { text: 'Percentage (%) of Overall Reporting Rates'.toUpperCase(), align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true, format: '{y} %' } } },
            legend: { enabled: false },
            series: [{ name: "Overall Reporting Rates", data: overAllReportingSeriesData, tooltip: { valueSuffix: ' %' } }]
        });

        setConsistencyOfReportingByCounty({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: consistency_counties.map(name=> name?name.toUpperCase(): name), title: { text: null } },
            yAxis: { min: 0, max: 120, title: { text: 'Percentage (%) of Consistency of Reporting'.toUpperCase(), align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true, format: '{y} %' } } },
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
