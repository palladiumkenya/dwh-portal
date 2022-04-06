import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import * as covidSymptomaticInfectionsSelectors from '../../../selectors/CT/Covid/covidSymptomaticInfections';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as covidEverHadInfectionSelectors from '../../../selectors/CT/Covid/covidEverHadInfection';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';


const COVIDPLHIVWhoHadSymptomaticInfection = () => {
    const [covidPlhivWhoHadSymptomaticInfection, setCovidPlhivWhoHadSymptomaticInfection] = useState({});

    const symptomaticInfections = useSelector(covidSymptomaticInfectionsSelectors.getSymptomaticInfections).symptomaticInfections;
    const everHadInfection = useSelector(covidEverHadInfectionSelectors.getEverHadInfection).everHadInfection;
    let percent = Number(symptomaticInfections) > 0 ? ((Number(symptomaticInfections) / Number(everHadInfection)) * 100) : 0;
    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

    const label = 'PLHIV WHO HAVE HAD SEVERE COVID-19 INFECTION';


    let title =`<div class="row">
        <div class="col-12" style="font-size:15px; text-align:center;">${roundNumber(percent)}%</div>
        <div class="col-12" style="font-size:40px; font-weight: bold; text-align:center;">${formatNumber(symptomaticInfections)}</div>
    </div>`
    const data = [{
        y: percent,
        color: '#00AD30'
    }, {
        y: 100 - percent,
        color: '#f0f0f0'
    }];

    const loadCovidPlhivWhoHadSymptomaticInfection = useCallback(async () => {
        setCovidPlhivWhoHadSymptomaticInfection({
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
                                let colors = ['green', "#bbbbbb"];
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
    }, [symptomaticInfections]);

    useEffect(() => {
        loadCovidPlhivWhoHadSymptomaticInfection();

    }, [loadCovidPlhivWhoHadSymptomaticInfection]);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidPlhivWhoHadSymptomaticInfection}/>
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
            {/*    <div className={'col-1'}/>*/}
            {/*    <div className={"col-11"} style={{fontSize:'15px', textAlign:'center'}}>{roundNumber(percent)}%*/}
            {/*    </div>*/}
            {/*    <div className={'col-1'}/>*/}
            {/*    <div className={'col-11'} style={{*/}
            {/*        fontSize: '40px',*/}
            {/*        textAlign: 'center',*/}
            {/*        fontWeight: 'bold'*/}
            {/*    }}>{formatNumber(symptomaticInfections)}</div>*/}
            {/*    <div className={'col-1'}/>*/}
            {/*    <div className={'col-11'} style={{ fontSize: '18px', textAlign: 'center' }}>AS*/}
            {/*        AT {moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>*/}
            {/*</div>*/}
            {/*<div style={{ display: 'flex', justifyContent: 'center' }}>*/}
            {/*    <Donut style={{ alignSelf: 'center' }}*/}
            {/*           options={options}*/}
            {/*           data={{*/}
            {/*               datasets: [*/}
            {/*                   {*/}
            {/*                       'backgroundColor': ['green', 'rgba(0,0,0,0)'],*/}
            {/*                       'borderWidth': 0,*/}
            {/*                       'data': [percent, 100-percent]*/}
            {/*                   }*/}
            {/*               ]*/}
            {/*           }}*/}
            {/*           height={270}*/}
            {/*           width={270}*/}
            {/*    />*/}
            {/*</div>*/}
            <p style={{textAlign: 'center', fontSize: '15px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVWhoHadSymptomaticInfection;
