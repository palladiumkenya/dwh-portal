import React, { useCallback, useEffect, useState } from 'react';

// Import Highcharts
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment';

import * as covidAdultPLHIVCurrentOnTreatmentSelectors from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import { useSelector } from 'react-redux';

const COVIDAdultPlhivCurrentOnTreatment = () => {
    highchartsMore(Highcharts);
    solidGauge(Highcharts);

    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;

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
          <div>
            <p><strong>AS AT `+ moment().startOf('month').subtract(1, 'month').format('MMM YYYY')  + `</strong></p>
          </div>
        `,
            align: 'center',
            verticalAlign: 'middle',
            y: 70,
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
                name: "ADULT PLHIV CURRENT ON TREATMENT",
                type: "solidgauge",
                data: [
                    {
                        color: "#F08532",
                        radius: "100%",
                        innerRadius: "88%",
                        y: currentOnArtAdults
                    }
                ]
            }
        ]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default COVIDAdultPlhivCurrentOnTreatment;
