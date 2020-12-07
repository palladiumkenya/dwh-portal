import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/Api';

const RRPartner = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [emrDistributionByPartner, setEmrDistributionByPartner] = useState({});
    const [recencyOfReportingByPartner, setRecencyOfReportingByPartner] = useState({});
    const [consistencyOfReportingByPartner, setConsistencyOfReportingByPartner] = useState({});

    const loademrDistributionByPartner = useCallback(async () => {
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
        const result = await getAll('manifests/emrdistribution/' + rrTab + '?reportingType=partner', params);
        const partners = result.map(({ partner  }) => partner);
        const partners_series = result.map(({ facilities_count }) => parseInt(facilities_count, 10));
        setEmrDistributionByPartner({
            chart: { type: 'bar', height: '120%', spacingLeft:0, spacingRight:0, spacingBottom:0 },
            title: { text: '' },
            xAxis: { categories: partners, title: { text: '' }, labels: { style: { fontSize: '8px' } } },
            yAxis: { title: { text: 'Number of Facilities' }},
            legend: { enabled: false },
            series: [{ name: "Distribution of EMR Sites", data: partners_series, color: "#2F4050" }]
        });
    }, [filters, rrTab]);

    const loadRecencyOfReportingByPartner = useCallback(async () => {
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
        const result = await getAll('manifests/recencyreportingbypartner/' + rrTab, params);
        const partners = result.map(({ partner  }) => partner);
        const partners_series = result.map(({ Percentage }) => parseInt(Percentage, 10) > 100 ? 100:parseInt(Percentage, 10));
        const data = partners_series.map(d => ({ y: d, color: d >= 90 ? '#59A14F': (d >= 30 && d <90) ? '#F28E2B' : '#E15759' }));
        setRecencyOfReportingByPartner({
            chart: { type: 'bar', height: '120%', spacingLeft:0, spacingRight:0, spacingBottom:0 },
            title: { text: '' },
            xAxis: { categories: partners, title: { text: '' }, labels: { style: { fontSize: '8px' } } },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage (%) Reporting Rate' }},
            legend: { enabled: false },
            series: [{ name: "Overall Reporting Rates", data: data, color: "#59A14F", tooltip: { valueSuffix: ' %' } }]
        });
    }, [filters, rrTab]);

    const loadConsistencyOfReportingByPartner = useCallback(async () => {
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
        const result = await getAll('manifests/consistencyreportingbycountypartner/' + rrTab + '?reportingType=partner', params);
        const partners = Object.keys(result);
        const partners_series = Object.values(result);
        const data = partners_series.map(d => ({ y: d, color: d >= 90 ? '#59A14F': (d >= 30 && d <90) ? '#F28E2B' : '#E15759' }));
        setConsistencyOfReportingByPartner({
            chart: { type: 'bar', height: '120%', spacingLeft:0, spacingRight:0, spacingBottom:0 },
            title: { text: '' },
            xAxis: { categories: partners, title: { text: '' }, labels: { style: { fontSize: '8px' } } },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage (%) Reporting Rate' }},
            legend: { enabled: false },
            series: [{ name: 'Consistency of Reporting', data: data, tooltip: { valueSuffix: ' %' } }]
        });
    }, [filters, rrTab]);

    useEffect(() => {
        loademrDistributionByPartner();
        loadRecencyOfReportingByPartner();
        loadConsistencyOfReportingByPartner();
    }, [loademrDistributionByPartner, loadRecencyOfReportingByPartner, loadConsistencyOfReportingByPartner]);

    return (
        <div className="row">
            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Distribution of EMR sites
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={emrDistributionByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Overall Reporting Rates
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={recencyOfReportingByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Consistency of Reporting
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
