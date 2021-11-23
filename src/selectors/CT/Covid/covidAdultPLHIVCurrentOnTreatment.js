import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVCurrentOnTreatment.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVCurrentOnTreatment.listFiltered;
const filtered = state => state.filters.filtered;


export const getAdultPLHIVCurrentOnTreatment = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const covidAdultsPLHIVCurrentOnTreatment = list.Adults;

        return { covidAdultsPLHIVCurrentOnTreatment };
    }
);
