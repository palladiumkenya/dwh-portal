import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationCurrentByAgeSex.listUnfiltered;
const listFiltered = state => state.artOptimizationCurrentByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);

export const getCurrentByAgeSexTotal = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .sumBy("txCurr")
            .value();
    }
);

export const getCurrentTldByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.regimen === 'TLD').value();
    }
);

export const getCurrentTldByAgeSexTotal = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(l => l.regimen === 'TLD')
            .sumBy("txCurr")
            .value();
    }
);

export const getAgeGroups = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.datimAgeGroup).map(l => l.datimAgeGroup).uniq().sort().value();
    }
);

export const getSexGroups = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.gender).map(l => l.gender).uniq().sort().value();
    }
);
