import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadOverallUptakeSuppressionBySexVlDone.listUnfiltered;
const listFiltered = state => state.viralLoadOverallUptakeSuppressionBySexVlDone.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadOverallUptakeSuppressionBySexVlDone = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const vlCategories = ['<50 Copies', '51-399', '400-999'];

        list.sort((a, b) => (a.Last12MVLResult > b.Last12MVLResult) ? 1 : -1)


        return { vlCategories, data: list };
    }
);
