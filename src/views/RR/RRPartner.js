import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/Api';

const RRPartner = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [reportingByPartner, setReportingByPartner] = useState({});

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
        const overallReportingRateResultSeries = overallReportingRateResult.map(({ Percentage }) => parseInt(Percentage, 10) > 100 ? 100:parseInt(Percentage, 10));
        const consistencyResultPartners = Object.keys(consistencyResult);
        const consistencyResultData = Object.values(consistencyResult);
        let consistencyResultSeries = [];
        for (let i = 0; i < partners.length; i++) {
            consistencyResultSeries[i] = 0;
        }
        for(let i = 0; i < consistencyResultPartners.length; i++) {
            let resultPartner = consistencyResultPartners[i];
            resultPartner = resultPartner.toLowerCase();
            resultPartner = resultPartner.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
            resultPartner = resultPartner.replace(' ', '');
            for (let j = 0; j < partners.length; j++) {
                let mappedPartner = partners[j];
                mappedPartner = mappedPartner.toLowerCase();
                mappedPartner = mappedPartner.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
                mappedPartner = mappedPartner.replace(' ', '');
                if (mappedPartner === resultPartner && emrResultSeries[j] > 0) {
                    consistencyResultSeries[j] = parseInt((consistencyResultData[i]/emrResultSeries[j]) * 100);
                    continue;
                }
            }
        }
        setReportingByPartner({
            title: { text: '' },
            xAxis: [{ categories: partners, title: { text: 'Partners' } }],
            yAxis: [
                { title: { text: 'Number of EMR Sites' } },
                { title: { text: 'Percentage (%) Reporting Rate'}, opposite: true },
            ],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: { shared: true },
            series: [
                { name: 'Distribution of EMR Sites', type: 'column', data: emrResultSeries, color: "#2F4050" },
                { name: 'Overall Reporting Rate', type: 'spline', data: overallReportingRateResultSeries, yAxis: 1, color: "#E06F07", dataLabels: { enabled: false, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' },
                { name: 'Consistency of Reporting', type: 'spline', data: consistencyResultSeries, yAxis: 1, color: "#59A14F", dataLabels: { enabled: false, format: '{y} %' }, tooltip: { valueSuffix: ' %' }, dashStyle: 'ShortDot' }
            ]
        });
    }, [filters, rrTab]);

    useEffect(() => {
        loadReportingByPartner();
    }, [loadReportingByPartner]);

    return (
        <HighchartsReact highcharts={Highcharts} options={reportingByPartner} />
    );
};

export default RRPartner;
