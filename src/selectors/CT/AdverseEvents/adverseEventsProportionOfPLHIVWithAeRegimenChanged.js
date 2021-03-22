import { createSelector } from 'reselect';

const listUnFiltered = state => state.adverseEventsProportionOfPLHIVWithAeRegimenChanged.listUnfiltered;
const listFiltered = state => state.adverseEventsProportionOfPLHIVWithAeRegimenChanged.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsProportionOfPLHIVWithAeRegimenChanged = createSelector(
    [listUnFiltered, listFiltered, filtered],
    (listUnFiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnFiltered;

        return list.numberOfPatientsAe;
    }
);
