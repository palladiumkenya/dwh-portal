import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/Api';

const RRCounty = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [reportingByCounty, setReportingByCounty] = useState({});

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
        const counties = overallReportingRateResult.map(({ county  }) => county);
        const emrResultSeries = overallReportingRateResult.map(({ expected }) => parseInt(expected, 10));
        const overallReportingRateResultSeries = overallReportingRateResult.map(({ Percentage }) => parseInt(Percentage, 10) > 100 ? 100:parseInt(Percentage, 10));
        const consistencyResultCounties = Object.keys(consistencyResult);
        const consistencyResultData = Object.values(consistencyResult);
        let consistencyResultSeries = [];
        for (let i = 0; i < counties.length; i++) {
            consistencyResultSeries[i] = 0;
        }
        for(let i = 0; i < consistencyResultCounties.length; i++) {
            let resultCounty = consistencyResultCounties[i];
            resultCounty = resultCounty.toLowerCase();
            resultCounty = resultCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
            resultCounty = resultCounty.replace(' ', '');
            for (let j = 0; j < counties.length; j++) {
                let mappedCounty = counties[j];
                mappedCounty = mappedCounty.toLowerCase();
                mappedCounty = mappedCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
                mappedCounty = mappedCounty.replace(' ', '');
                if (mappedCounty === resultCounty && emrResultSeries[j] > 0) {
                    consistencyResultSeries[j] = parseInt((consistencyResultData[i]/emrResultSeries[j]) * 100);
                    if (consistencyResultSeries[j] > 100) {
                        consistencyResultSeries[j] = 100;
                    }
                    continue;
                }
            }
        }
        setReportingByCounty({
            title: { text: '' },
            xAxis: [{ categories: counties, title: { text: 'Counties' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number of EMR Sites' } },
                { title: { text: 'Percentage (%) Reporting Rate'}, opposite: true, min: 0, max: 100 },
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
        loadReportingByCounty();
    }, [loadReportingByCounty]);

    return (
        <HighchartsReact highcharts={Highcharts} options={reportingByCounty} />
    );
};

export default RRCounty;
