import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationCurrentByCounty.listUnfiltered;
const listFiltered = state => state.artOptimizationCurrentByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultsCurrentByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Adult");
    }
);

export const getCounties = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.county).map(l => l.county).uniq().sort().value();
    }
);

export const getSexGroups = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.gender).map(l => l.gender).uniq().sort().value();
    }
);