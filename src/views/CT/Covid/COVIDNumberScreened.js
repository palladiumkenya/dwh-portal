import React, { useCallback, useEffect, useState } from 'react';
import DataCard from '../../Shared/DataCard';
import { formatNumber, roundNumber } from '../../../utils/utils';

import * as covidNumberScreenedSelectors from '../../../selectors/CT/Covid/covidNumberScreened';
import * as covidAdultPLHIVCurrentOnTreatmentSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import { useSelector } from 'react-redux';

const COVIDNumberScreened = () => {
    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;
    const screened = useSelector(covidNumberScreenedSelectors.getCovidNumberScreened).Screened;

    let percentScreened = screened && Number(screened) > 0 ? ((Number(screened)/Number(currentOnArtAdults))*100) : 0;
    percentScreened = Math.round((percentScreened + Number.EPSILON) * 100) / 100;

    return (
        <DataCard
            title="NUMBER SCREENED FOR COVID-19 VACCINATION"
            subtitle={roundNumber(percentScreened) + "%"}
            data={formatNumber(screened)}
        />
    );
};
export default COVIDNumberScreened;

