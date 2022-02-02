import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import * as covidAdultPLHIVCurrentOnTreatmentSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import { Card, CardBody, CardFooter } from 'reactstrap';

const COVIDAdultPlhivCurrentOnTreatment = () => {
    const [covidAdultPlhivCurrentOnTreatment, setCovidAdultPlhivCurrentOnTreatment] = useState({});

    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;

    const label = 'ADULT >15 YEARS PLHIV CURRENT ON TREATMENT';

    const data = [{
        y: currentOnArtAdults * 100 / currentOnArtAdults,
        color: '#063970'
    }, {
        y: 100 - currentOnArtAdults,
        color: 'rgba(0,0,0,0)'
    }];

    let title = `<p> </p><br><p style="font-size: 35px;font-weight: bold; line-height: 2">${currentOnArtAdults.toLocaleString()}</p><br><p>AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</p>`;
    const loadCovidAdultPlhivCurrentOnTreatment = useCallback(async () => {
        setCovidAdultPlhivCurrentOnTreatment({
            chart: {
                renderTo: 'container',
                type: 'pie'
            },
            title: {
                text: title,
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
        loadCovidAdultPlhivCurrentOnTreatment();
    }, [loadCovidAdultPlhivCurrentOnTreatment]);


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidAdultPlhivCurrentOnTreatment}/>
            <p>{label}</p>
        </div>
    );
};

export default COVIDAdultPlhivCurrentOnTreatment;
