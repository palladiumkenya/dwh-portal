import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import * as covidEverHadInfectionSelectors
    from '../../../selectors/CT/Covid/covidEverHadInfection';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as covidPLHIVCurrentOnArtSelectors from '../../../selectors/CT/Covid/covidPLHIVCurrentOnArt';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Doughnut as Donut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

const COVIDPLHIVEverHadInfection = () => {
    const [covidPlhivEverHadInfection, setCovidPlhivEverHadInfection] = useState({});

    const everHadInfection = useSelector(covidEverHadInfectionSelectors.getEverHadInfection).everHadInfection;
    const currentOnArtAdults = useSelector(covidPLHIVCurrentOnArtSelectors.getPLHIVCurrentOnArt).plhivCurrentOnArt;
    let percent = Number(everHadInfection) > 0 ? ((Number(everHadInfection) / Number(currentOnArtAdults)) * 100) : 0;
    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

    const label = 'PLHIV EVER HAD COVID-19 INFECTION';


    let title = `<div class="row" >
        <div class="col-12" style="font-size:15px; text-align:center;">${roundNumber(percent)}%</div>
        <div class="col-12" style="font-size:40px; font-weight: bold; text-align:center;">${formatNumber(everHadInfection)}</div></div>`;
    const data = [{
        y: percent,
        color: '#d32b3a'
    }, {
        y: 100 - percent,
        color: '#f0f0f0'
    }];

    const loadCovidPartiallyVaccinated = useCallback(async () => {
        setCovidPlhivEverHadInfection({
            chart: {
                renderTo: 'container',
                type: 'pie',
                height: 280,
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
                    dataLabels: false,
                    innerSize: 210,
                    size: 250,
                    point: {
                        events: {
                            mouseOver() {
                                this.originalColor = this.color;
                                let colors = ["#f53447", "#bbbbbb"];
                                this.update({ color: colors[this.index] });
                            },
                            mouseOut(){
                                this.update({ color: this.originalColor });
                            }
                        }
                    }
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
        loadCovidPartiallyVaccinated();
    }, [loadCovidPartiallyVaccinated]);

    let options = {
        aspectRatio: 1,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        responsive: false,
        title: {
            display: false
        },
        cutout: '84%'
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidPlhivEverHadInfection}/>
            {/*<div className={'row'} style={{*/}
            {/*    zIndex: '100',*/}
            {/*    position: 'absolute',*/}
            {/*    verticalAlign: 'middle',*/}
            {/*    top: '90px',*/}
            {/*    whiteSpace: 'normal',*/}
            {/*    textAlign: 'center',*/}
            {/*    display: 'flex',*/}
            {/*    justifyContent: 'center',*/}
            {/*    margin: 'auto'*/}
            {/*}}>*/}
            {/*    <div className={"col-12"} style={{fontSize:'15px', textAlign:'center'}}>{roundNumber(percent)}%*/}
            {/*    </div>*/}
            {/*    <div className={'col-1'}/>*/}
            {/*    <div className={'col-11'}> <p  style={{*/}
            {/*        fontSize: '40px',*/}
            {/*        textAlign: 'center',*/}
            {/*        fontWeight: 'bold'*/}
            {/*    }}>{formatNumber(everHadInfection)}</p></div>*/}
            {/*    <div className={'col-1'} />*/}
            {/*    <div className={'col-11'} ><p style={{ fontSize: '18px', textAlign: 'center' }}>AS*/}
            {/*        AT {moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</p></div>*/}
            {/*</div>*/}
            {/*<div style={{ display: 'flex', justifyContent: 'center' }}>*/}
            {/*    <Donut style={{ alignSelf: 'center' }}*/}
            {/*           options={options}*/}
            {/*           data={{*/}
            {/*               datasets: [*/}
            {/*                   {*/}
            {/*                       'backgroundColor': ['red', 'rgba(0,0,0,0)'],*/}
            {/*                       'borderWidth': 0,*/}
            {/*                       'data': [100, 100-percent]*/}
            {/*                   }*/}
            {/*               ]*/}
            {/*           }}*/}
            {/*           height={250}*/}
            {/*           width={250}*/}
            {/*    />*/}
            {/*</div>*/}
            <p style={{textAlign: 'center', fontSize: '15px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVEverHadInfection;
