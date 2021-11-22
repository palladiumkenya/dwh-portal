import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as covidOverallMissedAppointmentSelectors
    from '../../../selectors/CT/Covid/covidOverallMissedAppointment';
import * as covidEverHadInfectionSelectors
    from '../../../selectors/CT/Covid/covidEverHadInfection';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const COVIDOverallMissedAppointment = () => {

    const overallMissedAppointment = useSelector(covidOverallMissedAppointmentSelectors.getOverallMissedAppointments).overallMissedAppointment;
    const everHadInfection = useSelector(covidEverHadInfectionSelectors.getEverHadInfection).everHadInfection;

    let percentMissedAppointment = overallMissedAppointment && Number(overallMissedAppointment) > 0 ? ((Number(overallMissedAppointment)/Number(everHadInfection))*100) : 0;
    percentMissedAppointment = Math.round((percentMissedAppointment + Number.EPSILON) * 100) / 100;

    /*const options = {
        chart: {
            type: "solidgauge",
            height: "70%"
        },
        legend: {
            enabled: true
        },
        title: {
            text: ``
        },

        tooltip: {
            enabled: false,
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
                {
                    outerRadius: "100%",
                    innerRadius: "88%",
                    backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }
            ]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    borderColor: '#ffffff',
                    style: {
                        fontSize: '40px'
                    },
                    x: 0,
                    y: -35
                },
                linecap: "round",
                stickyTracking: false,
                rounded: false,
                showInLegend: true
            }
        },

        series: [
            {
                name: "OVERALL",
                type: "solidgauge",
                data: [
                    {
                        color: "#69B34C",
                        radius: "100%",
                        innerRadius: "88%",
                        y: percentMissedAppointment
                    }
                ]
            }
        ]
    };*/

    return (
        <DataCard
            title="OVERALL MISSED APPOINTMENTS"
            subtitle={roundNumber(percentMissedAppointment) + "%"}
            data={formatNumber(overallMissedAppointment)}
        />
    );
};

export default COVIDOverallMissedAppointment;

