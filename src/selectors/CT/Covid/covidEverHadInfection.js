import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidEverHadInfection.listUnfiltered;
const listFiltered = state => state.CovidEverHadInfection.listFiltered;
const filtered = state => state.filters.filtered;

export const getEverHadInfection = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const everHadInfection = list.Num;

        return { everHadInfection };
    }
);
