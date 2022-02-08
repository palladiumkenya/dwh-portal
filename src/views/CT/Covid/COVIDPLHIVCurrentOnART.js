import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as covidPLHIVCurrentOnArtSelectors
    from '../../../selectors/CT/Covid/covidPLHIVCurrentOnArt';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDPLHIVCurrentOnART = () => {
    const [covidPlhivCurrentOnTreatment, setCovidPlhivCurrentOnTreatment] = useState({});

    const currentOnArtAdults = useSelector(covidPLHIVCurrentOnArtSelectors.getPLHIVCurrentOnArt).plhivCurrentOnArt;

    const label = 'PLHIV CURRENT ON ART';

    const data = [{
        y: currentOnArtAdults * 100 / currentOnArtAdults,
        color: 'orange'
    }, {
        y: 100 - currentOnArtAdults,
        color: 'rgba(0,0,0,0)'
    }];

    let title = `<div class="row" >
        <div class="col-12" style="font-size:40px; text-align:center; font-weight: bold;">${formatNumber(currentOnArtAdults)}</div>
        <div class="col-12" style="font-size:18px; text-align:center;">AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
    </div>`;
    const loadCovidPlhivCurrentOnTreatment = useCallback(async () => {
        setCovidPlhivCurrentOnTreatment({
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
    }, [currentOnArtAdults]);

    useEffect(() => {
        loadCovidPlhivCurrentOnTreatment();
    }, [loadCovidPlhivCurrentOnTreatment]);

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
            text: ``,
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
                name: "PLHIV CURRENT ON ART",
                type: "solidgauge",
                data: [
                    {
                        color: "#F08532",
                        radius: "100%",
                        innerRadius: "88%",
                        y: 100
                    }
                ],
                dataLabels: {
                    useHTML: true,
                    format: '<div class="row">' +
                        '<div class="col-12" style="text-align:center;font-size:40px; font-weight: bold;">' + formatNumber(currentOnArtAdults.plhivCurrentOnArt) + ' </div>' +
                        '<div class="col-12" style="font-size:18px;">AS AT '+ moment().startOf('month').subtract(1, 'month').format('MMM YYYY').toUpperCase() +'</div></div>'
                },
            }
        ]
    };*/


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidPlhivCurrentOnTreatment}/>
            <p style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVCurrentOnART;
