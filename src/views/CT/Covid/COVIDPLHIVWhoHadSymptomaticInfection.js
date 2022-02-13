import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import * as covidSymptomaticInfectionsSelectors from '../../../selectors/CT/Covid/covidSymptomaticInfections';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as covidEverHadInfectionSelectors from '../../../selectors/CT/Covid/covidEverHadInfection';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import { Chart } from 'react-chartjs-2';
import { Doughnut as Donut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

const COVIDPLHIVWhoHadSymptomaticInfection = () => {
    const [covidPlhivWhoHadSymptomaticInfection, setCovidPlhivWhoHadSymptomaticInfection] = useState({});

    const symptomaticInfections = useSelector(covidSymptomaticInfectionsSelectors.getSymptomaticInfections).symptomaticInfections;
    const everHadInfection = useSelector(covidEverHadInfectionSelectors.getEverHadInfection).everHadInfection;
    let percent = Number(symptomaticInfections) > 0 ? ((Number(symptomaticInfections) / Number(everHadInfection)) * 100) : 0;
    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

    const label = 'PLHIV WHO HAVE HAD SYMPTOMATIC COVID-19 INFECTION';


    let title = `<div class="row" style="position: absolute;top: 0px; left: 0px;width: 100%;height: 100%;z-index: 5;display: flex;justify-content: center;align-items: center;pointer-events: none;font-size: 1.5rem;padding-top: 1.5rem;">
        <div class="col-12" style="font-size:40px; font-weight: bold; text-align:center;">${formatNumber(symptomaticInfections)}</div>
        <div class="col-12" style="font-size:18px; text-align:center;">AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
    </div>`;

    var data = {
        labels: [],
        datasets: [{
            label: '',
            data: [20, 100 - percent],
            backgroundColor: [
                'green',
                'rgba(255, 99, 132, 0)'
            ],
            hoverOffset: 0
        }]
    };

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
                <div className={'col-1'}></div>
                <div className={"col-11"} style={{fontSize:'15px', textAlign:'center'}}>{roundNumber(percent)}%
                </div>
                <div className={'col-1'}></div>
                <div className={'col-11'} style={{
                    fontSize: '40px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>{formatNumber(symptomaticInfections)}</div>
                <div className={'col-1'}></div>
                <div className={'col-11'} style={{ fontSize: '18px', textAlign: 'center' }}>AS
                    AT {moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Donut style={{ alignSelf: 'center' }}
                       options={options}
                       data={{
                           datasets: [
                               {
                                   'backgroundColor': ['green', 'rgba(0,0,0,0)'],
                                   'borderWidth': 0,
                                   'data': [
                                       percent, 100-percent
                                   ]
                               }
                           ]
                       }}
                       height={300}
                       width={300}
                />
            </div>
            <p style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVWhoHadSymptomaticInfection;
