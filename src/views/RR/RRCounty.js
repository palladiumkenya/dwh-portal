import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import moment from 'moment';
import Highcharts from "highcharts";
import Highstock from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/Api';

const RRCounty = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [emrDistribution, setEmrDistribution] = useState({});
    const [recencyOfReportingByCounty, setRecencyOfReportingByCounty] = useState({});
    const [consistencyOfReportingByCounty, setConsistencyOfReportingByCounty] = useState({});

    const loademrDistribution = useCallback(async () => {
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
        const result = await getAll('manifests/emrdistribution/' + rrTab + '?reportingType=county', params);
        const counties = result.map(({ county  }) => county);
        const counties_series = result.map(({ facilities_count }) => parseInt(facilities_count, 10));
        setEmrDistribution({
            chart: { type: 'bar', height: '120%', spacingLeft:0, spacingRight:0, spacingBottom:0 },
            title: { text: '' },
            xAxis: { categories: counties, title: { text: '' }, labels: { style: { fontSize: '10px' } } },
            yAxis: { title: { text: 'Number of Facilities' }},
            legend: { enabled: false },
            series: [{ name: "Distribution of EMR Sites", data: counties_series, color: "#2F4050" }]
        });
    }, [filters, rrTab]);

    const loadRecencyOfReportingByCounty = useCallback(async () => {
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
        const result = await getAll('manifests/recencyreportingbycounty/' + rrTab, params);
        const counties = result.map(({ county  }) => county);
        const counties_series = result.map(({ Percentage }) => parseInt(Percentage, 10) > 100 ? 100:parseInt(Percentage, 10));
        const data = counties_series.map(d => ({ y: d, color: d >= 70 ? '#59A14F': (d >= 30 && d <70) ? '#F28E2B' : '#E15759' }));
        setRecencyOfReportingByCounty({
            chart: { type: 'bar', height: '120%', spacingLeft:0, spacingRight:0, spacingBottom:0 },
            title: { text: '' },
            xAxis: { categories: counties, title: { text: '' }, labels: { style: { fontSize: '10px' } } },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage (%) Reporting Rate' }},
            legend: { enabled: false },
            series: [{ name: "Overall Reporting Rates", data: data, color: "#59A14F", tooltip: { valueSuffix: ' %' } }]
        });
    }, [filters, rrTab]);

    const loadConsistencyOfReportingByCounty = useCallback(async () => {
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
        const result = await getAll('manifests/consistencyreportingbycountypartner/' + rrTab + '?reportingType=county', params);
        const counties = Object.keys(result);
        const counties_series = Object.values(result);
        const data = counties_series.map(d => ({ y: d, color: d >= 70 ? '#59A14F': (d >= 30 && d <70) ? '#F28E2B' : '#E15759' }));
        setConsistencyOfReportingByCounty({
            chart: { type: 'bar', height: '120%', spacingLeft:0, spacingRight:0, spacingBottom:0 },
            title: { text: '' },
            xAxis: { categories: counties, title: { text: '' }, labels: { style: { fontSize: '10px' } } },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage (%) Reporting Rate' }},
            legend: { enabled: false },
            series: [{ name: 'Consistency of Reporting', data: data, tooltip: { valueSuffix: ' %' } }]
        });
    }, [filters, rrTab]);

    useEffect(() => {
        loademrDistribution();
        loadRecencyOfReportingByCounty();
        loadConsistencyOfReportingByCounty();
    }, [loademrDistribution, loadRecencyOfReportingByCounty, loadConsistencyOfReportingByCounty]);

    return (
        <div className="row">
            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Distribution of EMR sites
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highstock} options={emrDistribution} />
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
                            <HighchartsReact highcharts={Highcharts} options={recencyOfReportingByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Consistency Of Reporting
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={consistencyOfReportingByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default RRCounty;
