import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationRegimenDistributionByWeightBands.listUnfiltered;
const listFiltered = state => state.artOptimizationRegimenDistributionByWeightBands.listFiltered;
const filtered = state => state.filters.filtered;

export const getRegimenDistributionByWeightBands = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return  filtered ? listFiltered : listUnfiltered;
    }
);
