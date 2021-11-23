import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVPartiallyVaccinated.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVPartiallyVaccinated.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVPartiallyVaccinated = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const partiallyVaccinated = list.PartiallyVaccinated;

        return { partiallyVaccinated };
    }
);
