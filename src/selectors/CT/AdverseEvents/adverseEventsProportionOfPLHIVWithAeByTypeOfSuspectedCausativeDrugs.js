import { createSelector } from 'reselect';

const listUnFiltered = state => state.adverseEventsProportionOfPlHivWithAeByCausativeDrugs.listUnfiltered;
const listFiltered = state => state.adverseEventsProportionOfPlHivWithAeByCausativeDrugs.listFiltered;
const filtered = state => state.filters.filtered;

export const getProportionOfPLHIVWithAeByTypeOfSuspectedCausativeDrugs = createSelector(
    [listUnFiltered, listFiltered, filtered],
    (listUnFiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnFiltered;
    }
);
