import { createSelector } from 'reselect';

const listUnfiltered = state => state.twelveMonthRetention.listUnfiltered;
const listFiltered = state => state.twelveMonthRetention.listFiltered;
const filtered = state => state.filters.filtered;

export const getTwelveMonthRetention = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const yearCategories = list.map(obj => obj.StartARTYear);
        const data = list.map(obj => ({
            y: Math.round(obj.Percentage),
            absoluteY: obj.m12Retention
        }));
        return { yearCategories, data };
    }
);
