import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../utils/utils';

import * as covidAdultPLHIVFullyVaccinatedSelectors from '../../../selectors/CT/Covid/covidAdultPLHIVFullyVaccinated';
import * as covidAdultPLHIVCurrentOnTreatmentSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDFullyVaccinated = () => {
    const [covidFullyVaccinated, setCovidFullyVaccinated] = useState({});
    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;
    const fullyVaccinated = useSelector(covidAdultPLHIVFullyVaccinatedSelectors.getAdultPLHIVFullyVaccinated).fullyVaccinated;

    let percentFullyVaccinated = fullyVaccinated && Number(fullyVaccinated) > 0 ? ((Number(fullyVaccinated) / Number(currentOnArtAdults)) * 100) : 0;
    percentFullyVaccinated = Math.round((percentFullyVaccinated + Number.EPSILON) * 100) / 100;

    let label = `FULLY VACCINATED PLHIV`
    const data = [{
        y: percentFullyVaccinated,
        color: '#1c943e'
    }, {
        y: 100 - percentFullyVaccinated,
        color: 'rgba(0,0,0,0)'
    }];

    let title = `<p style="font-size: 15px">${percentFullyVaccinated} %</p><br><p style="font-size: 35px;font-weight: bold">${fullyVaccinated.toLocaleString()}</p><br><p>AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</p>`;
    const loadCovidFullyVaccinated = useCallback(async () => {
        setCovidFullyVaccinated({
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
    }, [fullyVaccinated]);

    useEffect(() => {
        loadCovidFullyVaccinated();
    }, [loadCovidFullyVaccinated]);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidFullyVaccinated}/>
            <p>{label}</p>
        </div>
    );
};

export default COVIDFullyVaccinated;
