import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';

const COVIDOverallMissedAppointment = () => {
    const [overallMissedAppointment, setOverallMissedAppointment] = useState({});
    const loadOverallMissedAppointment = useCallback(async () => {
        setOverallMissedAppointment({
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
                name:"OVERALL MISSED APPOINTMENT",
                colorByPoint: true,
            }]
        });
    }, []);

    useEffect(() => {
        loadOverallMissedAppointment();
    }, []);

    return (
        <HighchartsReact highcharts={Highcharts} options={overallMissedAppointment} />
    );
};

export default COVIDOverallMissedAppointment;

