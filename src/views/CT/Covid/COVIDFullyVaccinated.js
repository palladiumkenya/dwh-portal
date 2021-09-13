import React, { useCallback, useEffect, useState } from 'react';

// Import Highcharts
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

const COVIDFullyVaccinated = () => {
    highchartsMore(Highcharts);
    solidGauge(Highcharts);

    const options = {
        chart: {
            type: "solidgauge",
            height: "100%"
        },
        title: {
            useHTML: true,
            text: `<div><p>AS AT SEP 2021</p></div>`,
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
                rounded: false
            }
        },
        series: [
            {
                name: "PARTIALLY VACCINATED",
                type: "solidgauge",
                data: [
                    {
                        color: "#FF0000",
                        radius: "100%",
                        innerRadius: "88%",
                        y: 22
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

export default COVIDFullyVaccinated;

