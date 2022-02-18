import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../utils/utils';

import * as covidAdultPLHIVPartiallyVaccinatedSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVPartiallyVaccinated';
import * as covidAdultPLHIVCurrentOnTreatmentSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDPartiallyVaccinated = () => {
    const [covidPartiallyVaccinated, setCovidPartiallyVaccinated] = useState({});
    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;
    const partiallyVaccinated = useSelector(covidAdultPLHIVPartiallyVaccinatedSelectors.getAdultPLHIVPartiallyVaccinated).partiallyVaccinated || 0;

    let percentPartially = partiallyVaccinated && Number(partiallyVaccinated) > 0 ? ((Number(partiallyVaccinated) / Number(currentOnArtAdults)) * 100) : 0;
    percentPartially = Math.round((percentPartially + Number.EPSILON) * 100) / 100;

    let label = `PARTIALLY VACCINATED PLHIV`
    const data = [{
        y: percentPartially,
        color: '#d32b3a'
    }, {
        y: 100 - percentPartially,
        color: 'rgba(0,0,0,0)'
    }];

    let title = `<div class="row" style="">
        <div class="col-12" style="font-size:15px; text-align:center;">${roundNumber(percentPartially)}%</div>
        <div class="col-12" style="font-size:40px; font-weight: bold; text-align:center;">${formatNumber(partiallyVaccinated)}</div>
        <div class="col-12" style="font-size:18px; text-align:center;">AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
    </div>`;
    const loadCovidPartiallyVaccinated = useCallback(async () => {
        setCovidPartiallyVaccinated({
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
                    dataLabels: false,
                    innerSize: 251,
                    size: 270
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
    }, [partiallyVaccinated]);

    useEffect(() => {
        loadCovidPartiallyVaccinated();
    }, [loadCovidPartiallyVaccinated]);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidPartiallyVaccinated}/>
            <p style={{fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>{label}</p>
        </div>
    );
};

export default COVIDPartiallyVaccinated;
