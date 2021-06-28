import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionByPartner.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionByPartner.listUnfiltered;

export const getOtzVlSuppressionByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

    }
);
