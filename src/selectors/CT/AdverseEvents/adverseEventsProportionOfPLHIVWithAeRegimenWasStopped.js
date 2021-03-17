import { createSelector } from 'reselect';

const listUnFiltered = state => state.adverseEventsProportionOfPLHIVWithAeRegimenWasStopped.listUnfiltered;
const listFiltered = state => state.adverseEventsProportionOfPLHIVWithAeRegimenWasStopped.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsProportionOfPLHIVWithAeRegimenWasStopped = createSelector(
    [listUnFiltered, listFiltered, filtered],
    (listUnFiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnFiltered;

        return list.numberOfPatientsAe;
    }
);
