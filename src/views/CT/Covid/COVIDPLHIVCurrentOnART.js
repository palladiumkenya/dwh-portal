import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as covidPLHIVCurrentOnArtSelectors
    from '../../../selectors/CT/Covid/covidPLHIVCurrentOnArt';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';
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
        color: '#e88134'
    }];


    const loadCovidPartiallyVaccinated = useCallback(async () => {
        setCovidPlhivCurrentOnART({
            chart: {
                renderTo: 'container',
                type: 'pie',
                height: 280,
            },
            title: {
                text: `<div class="row" style="text-align:center;"><div class="col-12" style="font-size:40px; font-weight: bold;">${formatNumber(currentOnArtAdults)}</div></div>`,
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
            <p style={{ textAlign: 'center', fontSize: '15px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVCurrentOnART;
