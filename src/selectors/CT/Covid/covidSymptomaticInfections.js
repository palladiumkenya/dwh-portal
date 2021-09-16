import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidSymptomaticInfections.listUnfiltered;
const listFiltered = state => state.CovidSymptomaticInfections.listFiltered;
const filtered = state => state.filters.filtered;

export const getSymptomaticInfections = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const symptomaticInfections = list.Num;

        return { symptomaticInfections };
    }
);
