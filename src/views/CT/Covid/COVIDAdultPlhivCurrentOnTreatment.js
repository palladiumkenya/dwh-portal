import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import * as covidAdultPLHIVCurrentOnTreatmentSelectors from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const COVIDAdultPlhivCurrentOnTreatment = () => {

    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;
    const adultPLHIVCurrentOnTreatment = "ADULT >18 YEARS PLHIV CURRENT ON TREATMENT as at " + moment().startOf('month').subtract(1, 'month').format('MMM YYYY');

    return (
        <DataCard
            title={adultPLHIVCurrentOnTreatment}
            subtitle={null}
            data={formatNumber(currentOnArtAdults)}
        />
    );
};

export default COVIDAdultPlhivCurrentOnTreatment;
