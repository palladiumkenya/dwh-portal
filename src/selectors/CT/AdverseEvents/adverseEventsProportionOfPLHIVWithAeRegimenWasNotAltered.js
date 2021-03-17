import { createSelector } from 'reselect';

const listUnFiltered = state => state.adverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered.listUnfiltered;
const listFiltered = state => state.adverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered = createSelector(
    [listUnFiltered, listFiltered, filtered],
    (listUnFiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnFiltered;

        return list.numberOfPatientsAe;
    }
);
