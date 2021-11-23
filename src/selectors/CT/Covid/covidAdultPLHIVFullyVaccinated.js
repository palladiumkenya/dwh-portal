import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVFullyVaccinated.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVFullyVaccinated.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVFullyVaccinated = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const fullyVaccinated = list.FullyVaccinated;

        return { fullyVaccinated };
    }
);
