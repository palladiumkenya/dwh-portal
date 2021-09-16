import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as overallAdmissionMaleSelectors from '../../../selectors/CT/Covid/covidOverallAdmissionMale';

export const COVIDOverallAdmissionMale = () => {
    const [overallAdmissionMale, setOverallAdmissionMale] = useState({});
    const overallAdmissionData = useSelector(overallAdmissionMaleSelectors.getCovidOverallAdmission);

    const loadOverallAdmissionMale = useCallback(async () => {
        setOverallAdmissionMale({
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
                name:"OVERALL ADMISSION",
                colorByPoint: true,
                data: [
                    { name: 'ADMITTED', y: overallAdmissionData.admittedTotal, color: "#1AB394" },
                    { name: 'NOT ADMITTED', y: overallAdmissionData.notAdmittedTotal, sliced: true, selected: true, color: "#2F4050" },
                ]
            }]
        });
    }, []);

    useEffect(() => {
        loadOverallAdmissionMale();
    }, []);

    return (
        <HighchartsReact highcharts={Highcharts} options={overallAdmissionMale} />
    );
};

export default COVIDOverallAdmissionMale;
