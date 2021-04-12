import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationRegimenDistributionByAgeBands.listUnfiltered;
const listFiltered = state => state.artOptimizationRegimenDistributionByAgeBands.listFiltered;
const filtered = state => state.filters.filtered;

export const getRegimenDistributionByAgeBands = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return  filtered ? listFiltered : listUnfiltered;
    }
);
