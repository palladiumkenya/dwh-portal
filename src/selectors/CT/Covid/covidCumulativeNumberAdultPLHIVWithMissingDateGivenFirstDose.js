import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidCumulativeWithMissingDateGivenFirstDose.listUnfiltered;
const listFiltered = state => state.CovidCumulativeWithMissingDateGivenFirstDose.listFiltered;
const filtered = state => state.filters.filtered;

export const getCumulativeNumberAdultsWithMissingDateGivenFirstDose = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const cumulative = list.Num;

        return { cumulative };
    }
);
