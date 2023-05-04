import { createSelector } from 'reselect';

// const listUnfiltered = [];
const listUnfiltered = (state) => state.prepSTITreatmentOutcomes.listUnfiltered;
const listFiltered = (state) => state.prepSTITreatmentOutcomes.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getPrepSTITreatmentOutcomes = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list[0];
    }
);
