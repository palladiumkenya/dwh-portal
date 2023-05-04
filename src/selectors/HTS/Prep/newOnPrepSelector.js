import { createSelector } from 'reselect';

// const listUnfiltered = [];
const listUnfiltered = (state) => state.newOnPrep.listUnfiltered;
const listFiltered = (state) => state.newOnPrep.listFiltered;
const listUnfilteredDisc = (state) => state.prepDiscontinuation.listUnfiltered;
const listFilteredDisc = (state) => state.prepDiscontinuation.listFiltered;
const listUnfilteredDiscReason = (state) => state.prepDiscontinuationReason.listUnfiltered;
const listFilteredDiscReason = (state) => state.prepDiscontinuationReason.listFiltered;
const filtered = (state) => state.filters.filtered;


export const getNewOnPrepTotal = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let sum = list.reduce(function (acc, val) {
            return acc + val.StartedPrep;
        }, 0);
        
        return sum;
    }
);

export const getPrEPDiscontinuation = createSelector(
    [listUnfilteredDisc, listFilteredDisc, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.PrepDiscontinuations;
    }
);

export const getPrEPDiscontinuationReason = createSelector(
    [listUnfilteredDiscReason, listFilteredDiscReason, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let discontinuations = list.map((r) => r.PrepDiscontinuations);
        let reasons = list.map((r) => r.ExitReason.toUpperCase());
        return {reasons, discontinuations};
    }
);
