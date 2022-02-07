import React, { useCallback, useEffect, useState } from 'react';
import DataCard from '../../Shared/DataCard';
import { formatNumber, roundNumber } from '../../../utils/utils';

import * as covidNumberScreenedSelectors from '../../../selectors/CT/Covid/covidNumberScreened';
import * as covidAdultPLHIVCurrentOnTreatmentSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import { useSelector } from 'react-redux';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDNumberScreened = () => {
    const [covidNumberScreened, setCovidNumberScreened] = useState({});
    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;
    const screened = useSelector(covidNumberScreenedSelectors.getCovidNumberScreened).Screened || 0;
    let percentScreened = screened && Number(screened) > 0 ? ((Number(screened) / Number(currentOnArtAdults)) * 100) : 0;
    percentScreened = Math.round((percentScreened + Number.EPSILON) * 100) / 100;

    const data = [{
        y: percentScreened,
        color: '#e88134'
    }, {
        y: 100 - percentScreened,
        color: 'rgba(0,0,0,0)'
    }];

    let label = 'SCREENED FOR VACCINATION'

    let title = `<div class="row" style="">
        <div class="col-12" style="font-size:15px; text-align:center;">${roundNumber(percentScreened)}%</div>
        <div class="col-12" style="font-size:40px; font-weight: bold; text-align:center;">${formatNumber(screened)}</div>
        <div class="col-12" style="font-size:18px; text-align:center;">AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
    </div>`;
    const loadCovidNumberScreened = useCallback(async () => {
        setCovidNumberScreened({
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
    }, [screened]);

    useEffect(() => {
        loadCovidNumberScreened();
    }, [loadCovidNumberScreened]);
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidNumberScreened}/>
            <p style={{fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>{label}</p>
        </div>
    );
};
export default COVIDNumberScreened;

