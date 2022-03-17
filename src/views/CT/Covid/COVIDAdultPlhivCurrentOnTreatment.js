import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import * as covidAdultPLHIVCurrentOnTreatmentSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../utils/utils';

const COVIDAdultPlhivCurrentOnTreatment = () => {
    const [covidAdultPlhivCurrentOnTreatment, setCovidAdultPlhivCurrentOnTreatment] = useState({});

    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;

    const label = 'ADULT >= 15 YEARS PLHIV CURRENT ON TREATMENT';

    const data = [{
        y: 100,
        color: 'blue'
    }, {
        y: 100 - currentOnArtAdults,
        color: '#f0f0f0'
    }];

    let title = `<div class="row" ><div class="col-12" style="font-size:40px; font-weight: bold;">${formatNumber(currentOnArtAdults)}</div></div>`;
    const loadCovidAdultPlhivCurrentOnTreatment = useCallback(async () => {
        setCovidAdultPlhivCurrentOnTreatment({
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
                floating: true,
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
        loadCovidAdultPlhivCurrentOnTreatment();
    }, [loadCovidAdultPlhivCurrentOnTreatment]);


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidAdultPlhivCurrentOnTreatment}/>
            <p style={{ textAlign: 'center', fontSize: '15px' }}>{label}</p>
        </div>
    );
};

export default COVIDAdultPlhivCurrentOnTreatment;
