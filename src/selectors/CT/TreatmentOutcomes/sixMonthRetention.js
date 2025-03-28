import { createSelector } from 'reselect';

const listUnfiltered = state => state.sixMonthRetention.listUnfiltered;
const listFiltered = state => state.sixMonthRetention.listFiltered;
const filtered = state => state.filters.filtered;

export const getSixMonthRetention = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const yearCategories = list.length && list.map(obj => obj.StartARTYear);
        const data = list.length && list.map(obj => ({
            y: Math.round(obj.Percentage),
            absoluteY: obj.m6Retention
        }));
        return { yearCategories, data };
    }
);
