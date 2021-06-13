import { createSelector } from 'reselect';
import _ from 'lodash';

const listUnfiltered = state => state.treatmentOutcomesNetCohort.listUnfiltered;
const listFiltered = state => state.treatmentOutcomesNetCohort.listFiltered;
const filtered = state => state.filters.filtered;

export const getTreatmentOutcomesNetCohort = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .sumBy("totalOutcomes")
            .value();
    }
);
