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


    let title = `<div class="row" style="">
        <div class="col-12" style="font-size:40px; font-weight: bold; text-align:center;">${formatNumber(everHadInfection)}</div>
        <div class="col-12" style="font-size:18px; text-align:center;">AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
    </div>`;

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
        cutout: '93%'
    };

    return (
        <div>
            <div className={'row'} style={{
                zIndex: '100',
                position: 'absolute',
                verticalAlign: 'middle',
                top: '90px',
                whiteSpace: 'normal',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                margin: 'auto'
            }}>
                <div className={"col-12"} style={{fontSize:'15px', textAlign:'center'}}>{roundNumber(percent)}%
                </div>
                <div className={'col-1'}/>
                <div className={'col-11'}> <p  style={{
                    fontSize: '40px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>{formatNumber(everHadInfection)}</p></div>
                <div className={'col-1'} />
                <div className={'col-11'} ><p style={{ fontSize: '18px', textAlign: 'center' }}>AS
                    AT {moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</p></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Donut style={{ alignSelf: 'center' }}
                       options={options}
                       data={{
                           datasets: [
                               {
                                   'backgroundColor': ['red', 'rgba(0,0,0,0)'],
                                   'borderWidth': 0,
                                   'data': [percent, 100-percent]
                               }
                           ]
                       }}
                       height={270}
                       width={270}
                />
            </div>
            <p style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVEverHadInfection;
