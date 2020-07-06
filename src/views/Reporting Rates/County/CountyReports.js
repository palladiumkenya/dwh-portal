import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const CountyReports = ({ globalFilter }) => {
    const [emrDistribution, setEmrDistribution] = useState({
    });

    const [overAllReportingCT, setOverAllReportingCTByCounty] = useState({});

    const [overAllReportingPKVByCounty, setOverAllReportingPKVByCounty] = useState({});

    useEffect(() => {
        loademrDistribution();
        loadOverAllReportingRatesCTByCounty();
        loadOverAllReportingCTPKVByCounty();
    }, [globalFilter]);

    const loademrDistribution = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('manifests/emrdistribution/CT?reportingType=county', params);
        const counties = result.map(({ county: county  }) => county);
        const counties_series = result.map(({ facilities_count }) => parseInt(facilities_count, 10));

        setEmrDistribution({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: counties, title: { text: null }, visible: true },
            yAxis: { min: 0, title: { text: 'Number of Facilities by county', align: 'high' }, labels: { overflow: 'justify' }, visible: true },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { layout: 'vertical', align: 'center', verticalAlign: 'top', floating: true, borderWidth: 0, backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF', shadow: true },
            credits: { enabled: false },
            responsive: { rules: [ { chartOptions: { legend: { enabled: false } } } ] },
            series: [{ data: counties_series, color: "#2F4050;", name: 'Distribution of EMR Sites by County' }]
        });
    };

    const loadOverAllReportingRatesCTByCounty = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('manifests/overallreporting/CT?reportingType=county', params);
        const counties = result.map(({ county: county  }) => county);
        const counties_series = result.map(({ facilities_count }) => parseInt(facilities_count, 10));

        setOverAllReportingCTByCounty({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: counties, title: { text: null } },
            yAxis: { min: 0, title: { text: 'Percentage (%) of uploads by county', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { layout: 'vertical', align: 'center', verticalAlign: 'top', floating: true, borderWidth: 1, backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF', shadow: true },
            credits: { enabled: false },
            series: [{ data: counties_series, color: "#59A14F", name: 'Overall Reporting Care & Treatment by County' }]
        });
    };

    const loadOverAllReportingCTPKVByCounty = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('manifests/overallreporting/PKV?reportingType=county', params);
        const counties = result.map(({ county: county  }) => county);
        const counties_series = result.map(({ facilities_count }) => parseInt(facilities_count, 10));

        setOverAllReportingPKVByCounty({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: counties, title: { text: null } },
            yAxis: { min: 0, title: { text: 'Reporting Rate', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { layout: 'vertical', align: 'center', verticalAlign: 'top', floating: true, borderWidth: 1, backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF', shadow: true },
            credits: { enabled: false },
            series: [{ data: counties_series, color: "#F28E2B", name: 'Overall Reporting - PKVs by County' }]
        });
    };

    return (
        <div className="row">
            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Distribution of EMR sites by County
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={emrDistribution} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Overall Reporting - Care & Treatment by County March 2020
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={overAllReportingCT} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Overall Reporting - PKVs by County March 2020
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={overAllReportingPKVByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CountyReports;
