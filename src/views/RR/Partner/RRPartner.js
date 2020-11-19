import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const RRPartner = ({ globalFilters }) => {
    const [emrDistributionByPartner, setEmrDistributionByPartner] = useState({});
    const [recencyOfReportingByPartner, setRecencyOfReportingByPartner] = useState({});
    const [consistencyOfReportingByPartner, setConsistencyOfReportingByPartner] = useState({});

    const loademrDistributionByPartner = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            period: globalFilters.year + ',' + (globalFilters.month ? globalFilters.month:moment().startOf('month').subtract(1, 'month').format('M'))

        };
        const result = await getAll('manifests/emrdistribution/' + globalFilters.rrTab + '?reportingType=partner', params);
        const partners = result.map(({ partner  }) => partner);
        const partners_series = result.map(({ facilities_count }) => parseInt(facilities_count, 10));

        setEmrDistributionByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: partners, title: { text: null } },
            yAxis: { min: 0, title: { text: 'Number of Facilities', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            series: [{ data: partners_series, color: "#2F4050;", name: 'Distribution of EMR Sites' }]
        });
    }, [globalFilters]);

    const loadRecencyOfReportingByPartner = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            period: globalFilters.year + ',' + (globalFilters.month ? globalFilters.month:moment().startOf('month').subtract(1, 'month').format('M'))
        };
        const result = await getAll('manifests/recencyreportingbypartner/' + globalFilters.rrTab, params);
        const partners = result.map(({ partner  }) => partner);
        const partners_series = result.map(({ Percentage }) => parseInt(Percentage, 10) > 100 ? 100:parseInt(Percentage, 10));

        setRecencyOfReportingByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: partners, title: { text: null } },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage (%) of Overall Reporting Rates', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            series: [{ data: partners_series, color: "#59A14F", name: 'Overall Reporting Rates' }]
        });
    }, [globalFilters]);

    const loadConsistencyOfReportingByPartner = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            period: globalFilters.year + ',' + (globalFilters.month ? globalFilters.month:moment().startOf('month').subtract(1, 'month').format('M'))
        };
        const result = await getAll('manifests/consistencyreportingbycountypartner/' + globalFilters.rrTab + '?reportingType=partner', params);
        const partners = Object.keys(result);
        const partners_series = Object.values(result);

        setConsistencyOfReportingByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: partners, title: { text: null } },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage (%) of Consistency of Reporting', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            series: [{ data: partners_series, color: "#F28E2B", name: 'Consistency of Reporting' }]
        });
    }, [globalFilters]);

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
