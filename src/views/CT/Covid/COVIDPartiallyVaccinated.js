import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../utils/utils';

import * as covidAdultPLHIVPartiallyVaccinatedSelectors from '../../../selectors/CT/Covid/covidAdultPLHIVPartiallyVaccinated';
import * as covidAdultPLHIVCurrentOnTreatmentSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import DataCard from '../../Shared/DataCard';

const COVIDPartiallyVaccinated = () => {

    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;
    const partiallyVaccinated = useSelector(covidAdultPLHIVPartiallyVaccinatedSelectors.getAdultPLHIVPartiallyVaccinated).partiallyVaccinated;

    let percentPartially = partiallyVaccinated && Number(partiallyVaccinated) > 0 ? ((Number(partiallyVaccinated)/Number(currentOnArtAdults))*100) : 0;
    percentPartially = Math.round((percentPartially + Number.EPSILON) * 100) / 100;

    return (
        <DataCard
            title="PARTIALLY VACCINATED"
            subtitle={roundNumber(percentPartially) + "%"}
            data={formatNumber(partiallyVaccinated)}
        />
    );
};

export default COVIDPartiallyVaccinated;
