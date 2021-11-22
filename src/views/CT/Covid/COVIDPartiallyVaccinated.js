import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../utils/utils';

import * as covidAdultPLHIVPartiallyVaccinatedSelectors from '../../../selectors/CT/Covid/covidAdultPLHIVPartiallyVaccinated';
import * as covidAdultPLHIVCurrentOnTreatmentSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import DataCard from '../../Shared/DataCard';

const COVIDPartiallyVaccinated = () => {

    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;
    const partiallyVaccinated = useSelector(covidAdultPLHIVPartiallyVaccinatedSelectors.getAdultPLHIVPartiallyVaccinated).partiallyVaccinated;

    let percentPartially = partiallyVaccinated && Number(partiallyVaccinated) > 0 ? ((Number(partiallyVaccinated)/Number(currentOnArtAdults))*100) : 0;
    percentPartially = Math.round((percentPartially + Number.EPSILON) * 100) / 100;

    /*const options = {
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
          <div class="primary-card-body-subtitle">
                ${percentPartially ? percentPartially : 0}%
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
                name: "PARTIALLY VACCINATED",
                type: "solidgauge",
                data: [
                    {
                        color: "#00ff00",
                        radius: "100%",
                        innerRadius: "88%",
                        y: percentPartially ? percentPartially : 0
                    }
                ],
                dataLabels: {
                    useHTML: true,
                    format: '<div class="row">' +
                        '<div class="col-12" style="text-align:center;font-size:40px; font-weight: bold;">' + formatNumber(partiallyVaccinated) + '</div>' +
                        '<div class="col-12" style="font-size:18px;">AS AT '+ moment().startOf('month').subtract(1, 'month').format('MMM YYYY').toUpperCase() +'</div></div>'
                },
            }
        ]
    };*/

    return (
        <DataCard
            title="PARTIALLY VACCINATED"
            subtitle={roundNumber(percentPartially) + "%"}
            data={formatNumber(partiallyVaccinated)}
        />
    );
};

export default COVIDPartiallyVaccinated;
