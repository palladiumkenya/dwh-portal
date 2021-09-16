import React, { useCallback, useEffect, useState } from 'react';

// Import Highcharts
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment';
import { useSelector } from 'react-redux';
import * as covidSymptomaticInfectionsSelectors from '../../../selectors/CT/Covid/covidSymptomaticInfections';
import { formatNumber } from '../../../utils/utils';
import * as covidEverHadInfectionSelectors from '../../../selectors/CT/Covid/covidEverHadInfection';

const COVIDPLHIVWhoHadSymptomaticInfection = () => {
    highchartsMore(Highcharts);
    solidGauge(Highcharts);

    const symptomaticInfections = useSelector(covidSymptomaticInfectionsSelectors.getSymptomaticInfections);
    const everHadInfection = useSelector(covidEverHadInfectionSelectors.getEverHadInfection);
    let percent = Number(symptomaticInfections.symptomaticInfections) > 0 ? ((Number(symptomaticInfections.symptomaticInfections)/Number(everHadInfection.everHadInfection))*100) : 0;
    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

    const options = {
        chart: {
            type: "solidgauge",
            height: "70%"
        },
        legend: {
            enabled: true
        },
        title: {
            useHTML: true,
            text: `
          <div class="primary-card-body-subtitle-red">
                ${percent}%
          </div>
        `,
            align: 'center',
            verticalAlign: 'middle',
            y: -40,
            x: 0,
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
                name: "PLHIV WHO HAVE HAD SYMPTOMATIC COVID-19 INFECTION",
                type: "solidgauge",
                data: [
                    {
                        color: "#69B34C",
                        radius: "100%",
                        innerRadius: "88%",
                        y: percent
                    }
                ],
                dataLabels: {
                    useHTML: true,
                    format: '<div class="row">' +
                        '<div class="col-12" style="text-align:center;font-size:40px; font-weight: bold;">'+ formatNumber(symptomaticInfections.symptomaticInfections) +'</div>' +
                        '<div class="col-12" style="font-size:18px;">AS AT '+ moment().startOf('month').subtract(1, 'month').format('MMM YYYY').toUpperCase() +'</div></div>'
                },
            }
        ]
    };


    return (
        <div className={"row"}>
            <div className={"col-12"}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </div>
    );
};

export default COVIDPLHIVWhoHadSymptomaticInfection;
