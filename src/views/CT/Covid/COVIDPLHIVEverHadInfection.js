import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import * as covidEverHadInfectionSelectors
    from '../../../selectors/CT/Covid/covidEverHadInfection';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as covidPLHIVCurrentOnArtSelectors from '../../../selectors/CT/Covid/covidPLHIVCurrentOnArt';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDPLHIVEverHadInfection = () => {
    const [covidPlhivEverHadInfection, setCovidPlhivEverHadInfection] = useState({});

    const everHadInfection = useSelector(covidEverHadInfectionSelectors.getEverHadInfection).everHadInfection;
    const currentOnArtAdults = useSelector(covidPLHIVCurrentOnArtSelectors.getPLHIVCurrentOnArt).plhivCurrentOnArt;
    let percent = Number(everHadInfection) > 0 ? ((Number(everHadInfection)/Number(currentOnArtAdults))*100) : 0;
    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

    const label = 'PLHIV EVER HAD COVID-19 INFECTION';

    const data = [{
        y: percent,
        color: 'red'
    }, {
        y: 100 - percent,
        color: 'rgba(0,0,0,0)'
    }];

    let title = `<div class="row" style="">
        <div class="col-12" style="font-size:15px; text-align:center;">${roundNumber(percent)}%</div>
        <div class="col-12" style="font-size:40px; font-weight: bold; text-align:center;">${formatNumber(everHadInfection)}</div>
        <div class="col-12" style="font-size:18px; text-align:center;">AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
    </div>`;
    const loadCovidPlhivEverHadInfection = useCallback(async () => {
        setCovidPlhivEverHadInfection({
            chart: {
                renderTo: 'container',
                type: 'pie'
            },
            title: {
                text: title,
                useHTML: true,
                align: 'center',
                verticalAlign: 'middle',
                y: 0
            },
            plotOptions: {
                pie: {
                    innerSize: 300,
                    dataLabels: false
                }
            },
            series: [{
                data: data
            }],
            credits: {
                enabled: false
            },
            tooltip: { enabled: false },
            exporting: {
                enabled: false
            }
        });
    }, [everHadInfection]);

    useEffect(() => {
        loadCovidPlhivEverHadInfection();
    }, [loadCovidPlhivEverHadInfection]);

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
          <div class="primary-card-body-subtitle-red">
                ${ percent ? percent : 0 }%
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
                name: "PLHIV EVER HAD COVID-19 INFECTION",
                type: "solidgauge",
                data: [
                    {
                        color: "#FC2626",
                        radius: "100%",
                        innerRadius: "88%",
                        y: percent ? percent : 0
                    }
                ],
                dataLabels: {
                    useHTML: true,
                    format: '<div class="row">' +
                        '<div class="col-12" style="text-align:center;font-size:40px; font-weight: bold;">'+ formatNumber(everHadInfection.everHadInfection) +'</div>' +
                        '<div class="col-12" style="font-size:18px;">AS AT '+ moment().startOf('month').subtract(1, 'month').format('MMM YYYY').toUpperCase() +'</div></div>'
                },
            }
        ]
    };*/


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidPlhivEverHadInfection}/>
            <p style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVEverHadInfection;
