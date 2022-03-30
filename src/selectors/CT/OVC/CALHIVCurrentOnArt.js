import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.CALHIVCurrentOnArt.listFiltered;
const listUnfiltered = state => state.CALHIVCurrentOnArt.listUnfiltered;
const listFilteredNotInOvc = state => state.CALHIVCurrentOnArtNotInOvc.listFiltered;
const listUnfilteredNotInOvc = state => state.CALHIVCurrentOnArtNotInOvc.listUnfiltered;

export const getCALHIVCurrentOnArt = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);

export const getCALHIVCurrentOnArtNotInOvc = createSelector(
    [listUnfilteredNotInOvc, listFilteredNotInOvc, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);
