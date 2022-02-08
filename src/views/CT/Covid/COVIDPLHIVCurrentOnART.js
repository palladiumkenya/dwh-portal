import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as covidPLHIVCurrentOnArtSelectors
    from '../../../selectors/CT/Covid/covidPLHIVCurrentOnArt';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HCSoldGauge from 'highcharts/modules/solid-gauge';
import * as ChartModuleMore from 'highcharts/highcharts-more.js';

ChartModuleMore(Highcharts);
HCSoldGauge(Highcharts);

const COVIDPLHIVCurrentOnART = () => {

    const currentOnArtAdults = useSelector(covidPLHIVCurrentOnArtSelectors.getPLHIVCurrentOnArt).plhivCurrentOnArt;

    const label = 'PLHIV CURRENT ON ART';


    let title = `<div class="row" >
        <div class="col-12" style="font-size:40px; text-align:center; font-weight: bold;">${formatNumber(currentOnArtAdults)}</div>
        <div class="col-12" style="font-size:18px; text-align:center;">AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
    </div>`;

    const options = {
        chart: {
            renderTo: 'container',
            type: 'solidgauge'
        },
        exporting: {
            enabled: false
        },
        title: {
            useHTML: true,
            text: ``
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
                {
                    outerRadius: 290,
                    innerRadius: 270,
                    backgroundColor: 'rgba(0,0,0,0)',
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
                    x: 0,
                    y: -35
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: false
            }
        },
        series: [
            {
                name: 'PLHIV CURRENT ON ART',
                type: 'solidgauge',
                data: [
                    {
                        color: 'orange',
                        radius: '100%',
                        innerRadius: '93%',
                        y: 100
                    }
                ],
                dataLabels: {
                    useHTML: true,
                    format: title
                }
            }
        ],
        credits: { enabled: false },
        tooltip: { enabled: false }
    };


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options}/>
            <p style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVCurrentOnART;
