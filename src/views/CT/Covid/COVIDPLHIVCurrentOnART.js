import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as covidPLHIVCurrentOnArtSelectors
    from '../../../selectors/CT/Covid/covidPLHIVCurrentOnArt';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';
import { Doughnut as Donut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

Chart.register(ArcElement);

const COVIDPLHIVCurrentOnART = () => {
    const [covidPlhivCurrentOnART, setCovidPlhivCurrentOnART] = useState({});

    const currentOnArtAdults = useSelector(covidPLHIVCurrentOnArtSelectors.getPLHIVCurrentOnArt).plhivCurrentOnArt;

    const label = 'PLHIV CURRENT ON ART';
    const data = [{
        y: 100,
        color: 'orange'
    }];

    let title = `<div class="row" style="text-align:center;"><div class="col-12" style="font-size:40px; text-align:center; font-weight: bold;">${formatNumber(currentOnArtAdults)}</div></div>`;

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

    const loadCovidPartiallyVaccinated = useCallback(async () => {
        setCovidPlhivCurrentOnART({
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
                    size: 250
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
        loadCovidPartiallyVaccinated();
    }, [loadCovidPartiallyVaccinated]);


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidPlhivCurrentOnART}/>
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
            {/*    <div className={'col-11'} style={{*/}
            {/*        fontSize: '40px',*/}
            {/*        textAlign: 'center',*/}
            {/*        fontWeight: 'bold'*/}
            {/*    }}>{formatNumber(currentOnArtAdults)}</div>*/}
            {/*    <div className={'col-12'} style={{ fontSize: '18px', textAlign: 'center' }}>AS*/}
            {/*        AT {moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>*/}
            {/*</div>*/}
            {/*<div style={{ display: 'flex', justifyContent: 'center' }}>*/}
            {/*    <Donut style={{ alignSelf: 'center' }}*/}
            {/*        options={options}*/}
            {/*        data={{*/}
            {/*            datasets: [*/}
            {/*                {*/}
            {/*                    'backgroundColor': ['orange'],*/}
            {/*                    'borderWidth': 0,*/}
            {/*                    'data': [100]*/}
            {/*                }*/}
            {/*            ]*/}
            {/*        }}*/}
            {/*        height={270}*/}
            {/*        width={270}*/}
            {/*    />*/}
            {/*</div>*/}
            <p style={{ textAlign: 'center', fontSize: '15px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVCurrentOnART;
