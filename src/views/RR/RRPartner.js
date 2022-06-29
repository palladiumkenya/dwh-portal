import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { capitalize, getAll } from '../Shared/Api';
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

    const loadReportingByPartner = useCallback(async () => {
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
                      .add(15, 'days')
                      .format('MMM YYYY'),
        };
        params.period = filters.fromDate ?
            moment(params.fromDate, "MMM YYYY").startOf('month').subtract(0, 'month').format('YYYY,M') :
            moment().subtract(2, 'month').add(15, 'days').format('YYYY,M');
        const overallReportingRateResult = await getAll('manifests/recencyreportingbypartner/' + rrTab, params);
        params.period = filters.fromDate
            ? moment(params.fromDate, 'MMM YYYY')
                  .startOf('month')
                  .subtract(1, 'month')
                  .format('YYYY,M')
            : moment()
                  .subtract(3, 'month')
                  .add(15, 'days')
                  .format('YYYY,M');
        const consistencyResult = await getAll('manifests/consistencyreportingbycountypartner/' + rrTab + '?reportingType=partner', params);
        const rrData = await getAll('manifests/expectedPartnerCounty/' + rrTab + '?reportingType=partner', params);
        const partners = overallReportingRateResult.map(({ partner  }) => partner);
        const emrResultSeries = overallReportingRateResult.map(({ expected }) => parseInt(expected, 10));

        /* Overall reporting */
        const overAllReportingData = _.orderBy(overallReportingRateResult, [function(resultItem) { return parseInt(resultItem.Percentage, 10); }], ['desc']);
        const overAllReportingPartners = overAllReportingData.map(({ partner  }) => capitalize(partner));
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

        /* Comparison of reporting */
        const consistency_values = [];
        let expected = 0;
        for (const [key, value] of Object.entries(consistencyResult)) {
            const expectedPartner =  rrData.filter(obj => obj.partner === key);
            if (expectedPartner.length > 0) {
                expected = expectedPartner[0].totalexpected;
            }

            const cos =
                expected === 0
                    ? 0
                    : Math.round(((value / expected) * 100).toString());
            if (cos <= 50) {
                consistency_values.push({
                    partner: key,
                    y: cos,
                    color: '#BB1414'
                });
            } else if (cos >= 51 && cos <= 89) {
                consistency_values.push({ partner: key, y: cos, color: '#f7941d' });
            } else if (cos >= 90) {
                consistency_values.push({ partner: key, y: cos > 100 ? 100 : cos, color: '#59A14F' });
            } else {
                consistency_values.push({
                    partner: key,
                    y: cos,
                    color: '#BB1414'
                });
            }
        }
        consistency_values.sort(function(a, b) {
            return b.y - a.y;
        });
        const consistency_partners = consistency_values.map(obj => obj.partner);

        setReportingByPartner({
            title: { text: '' },
            xAxis: [{ categories: partners.map(name => name.toUpperCase()), title: { text: 'Partners'.toUpperCase() }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number of EMR Sites'.toUpperCase() } },
                // { title: { text: 'Percentage (%) Reporting Rate'}, opposite: true, min: 0, max: 100 },
            ],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, enabled: false },
            tooltip: { shared: true },
            series: [
                { name: 'Distribution of EMR Sites', type: 'column', data: emrResultSeries, color: "#2F4050" },
                // { name: 'Overall Reporting Rate', type: 'spline', data: overallReportingRateResultSeries, yAxis: 1, color: "#E06F07", dataLabels: { enabled: false, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' },
                // { name: 'Comparison of Reporting', type: 'spline', data: consistencyResultSeries, yAxis: 1, color: "#59A14F", dataLabels: { enabled: false, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' }
            ]
        });

        setOverAllReportingByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: overAllReportingPartners.map(name => name.toUpperCase()), title: { text: null } },
            yAxis: { min: 0, max: 120, title: { text: 'Percentage (%) of Overall Reporting Rates'.toUpperCase(), align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true, format: '{y} %' } } },
            legend: { enabled: false },
            series: [{ data: overAllReportingSeriesData, color: "#59A14F", name: 'Overall Reporting Rates' }]
        });

        setConsistencyOfReportingByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: consistency_partners.map(name => name.toUpperCase()), title: { text: null } },
            yAxis: { min: 0, max: 120, title: { text: 'Percentage (%) of Comparison of Reporting'.toUpperCase(), align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true, format: '{y} %' } } },
            legend: { enabled: false },
            series: [{ data: consistency_values, name: 'Comparison of Reporting' }]
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
