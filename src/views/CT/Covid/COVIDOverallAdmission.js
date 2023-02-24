import React, { useEffect, useState, useCallback } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as overallAdmissionSelectors from '../../../selectors/CT/Covid/covidOverallAdmission';

export const COVIDOverallAdmission = () => {
    const [overallAdmission, setOverallAdmission] = useState({});
    const overallAdmissionData = useSelector(overallAdmissionSelectors.getCovidOverallAdmission);

    const loadOverallAdmission = useCallback(async () => {
        setOverallAdmission({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 280,
            },
            title: { text: '' },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            },
            accessibility: { point: { valueSuffix: '%' } },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    },
                },
            },
            series: [
                {
                    name: 'OVERALL ADMISSION',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'ADMITTED',
                            y: overallAdmissionData.admittedTotal,
                            color: '#1AB394',
                        },
                        {
                            name: 'NOT ADMITTED',
                            y: overallAdmissionData.notAdmittedTotal,
                            sliced: true,
                            selected: true,
                            color: '#2F4050',
                        },
                    ],
                },
            ],
        });
    }, [overallAdmissionData]);

    useEffect(() => {
        loadOverallAdmission();
    }, [loadOverallAdmission]);

    return (
        <HighchartsReact highcharts={Highcharts} options={overallAdmission} />
    );
};

export default COVIDOverallAdmission;
