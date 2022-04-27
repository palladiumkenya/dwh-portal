import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadOverallUptakeSuppressionReferredLessIntense.listUnfiltered;
const listFiltered = state => state.viralLoadOverallUptakeSuppressionReferredLessIntense.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadOverallUptakeSuppressionReferredLessIntense = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return { data: list[0]?.Num ||0 };
    }
);
