import React, { useEffect, useState, useCallback } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as overallAdmissionFemaleSelectors from '../../../selectors/CT/Covid/covidOverallAdmissionFemale';

export const COVIDOverallAdmissionFemale = () => {
    const [overallAdmissionFemale, setOverallAdmissionFemale] = useState({});
    const overallAdmissionData = useSelector(overallAdmissionFemaleSelectors.getCovidOverallAdmission);

    const loadOverallAdmissionFemale = useCallback(async () => {
        setOverallAdmissionFemale({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: { text: '' },
            tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
            accessibility: { point: { valueSuffix: '%' } },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name:"FEMALES ADMITTED",
                colorByPoint: true,
                data: [
                    { name: 'ADMITTED', y: overallAdmissionData.admittedTotal, color: "#1AB394" },
                    { name: 'NOT ADMITTED', y: overallAdmissionData.notAdmittedTotal, sliced: true, selected: true, color: "#2F4050" },
                ]
            }]
        });
    }, [overallAdmissionData]);

    useEffect(() => {
        loadOverallAdmissionFemale();
    }, [loadOverallAdmissionFemale]);

    return (
        <HighchartsReact highcharts={Highcharts} options={overallAdmissionFemale} />
    );
};

export default COVIDOverallAdmissionFemale;
