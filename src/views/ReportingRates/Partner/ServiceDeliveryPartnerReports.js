import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from 'moment';

const ServiceDeliveryPartnerReports = ({ globalFilter }) => {
    const monthYear = moment(globalFilter.period, 'YYYY,M').format('MMMM YYYY');
    const [emrDistributionByPartner, setEmrDistributionByPartner] = useState({
    });

    const [recencyOfReportingByPartner, setRecencyOfReportingByPartner] = useState({});

    const [consistencyOfReportingByPartner, setConsistencyOfReportingByPartner] = useState({});

    

    const loademrDistributionByPartner = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('manifests/emrdistribution/' + params.docket + '?reportingType=partner', params);
        const partners = result.map(({ partner  }) => partner);
        const partners_series = result.map(({ facilities_count }) => parseInt(facilities_count, 10));

        setEmrDistributionByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: partners, title: { text: null } },
            yAxis: { min: 0, max: 200, title: { text: 'Number of Facilities by Partner', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { layout: 'vertical', align: 'right', verticalAlign: 'top', x: -40, y: 80, floating: true, borderWidth: 1, backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF', shadow: true },
            credits: { enabled: false },
            series: [{ data: partners_series, color: "#2F4050;", name: 'Distribution of EMR Sites by Partner' }]
        });
    }, [globalFilter]);

    const loadRecencyOfReportingByPartner = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('manifests/recencyreportingbypartner/' + params.docket, params);
        const partners = result.map(({ partner  }) => partner);
        const partners_series = result.map(({ Percentage }) => parseInt(Percentage, 10));

        setRecencyOfReportingByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: partners, title: { text: null } },
            yAxis: { min: 0, title: { text: 'Percentage (%) of Uploads by Partner', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { layout: 'vertical', align: 'right', verticalAlign: 'top', x: -40, y: 80, floating: true, borderWidth: 1, backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF', shadow: true },
            credits: { enabled: false },
            series: [{ data: partners_series, color: "#59A14F", name: 'Overall Reporting - Care & Treatment by Partner March 2020' }]
        });
    }, [globalFilter]);

    const loadConsistencyOfReportingByPartner = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('manifests/consistencyreportingbycountypartner/' + params.docket + '?reportingType=partner', params);
        const partners = Object.keys(result);
        const partners_series = Object.values(result);

        setConsistencyOfReportingByPartner({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: partners, title: { text: null } },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage (%) of Uploaded PKVs by Partner', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { layout: 'vertical', align: 'right', verticalAlign: 'top', x: -40, y: 80, floating: true, borderWidth: 1, backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF', shadow: true },
            credits: { enabled: false },
            series: [{ data: partners_series, color: "#F28E2B", name: 'Consistency Of Reporting - ' + params.docket + ' by Partner ' + monthYear }]
        });
    }, [globalFilter, monthYear]);

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
                        Distribution of EMR sites by Partner
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
                        Recency Of Reporting - { globalFilter.dockets[globalFilter.docket] } by Partner { monthYear }
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
                        Consistency Of Reporting - { globalFilter.dockets[globalFilter.docket] } by Partner { monthYear }
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

export default ServiceDeliveryPartnerReports;
