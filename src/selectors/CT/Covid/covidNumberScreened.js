import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidNumberScreened.listUnfiltered;
const listFiltered = state => state.CovidNumberScreened.listFiltered;
const filtered = state => state.filters.filtered;

export const getCovidNumberScreened = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const Screened = list.Screened;

        return { Screened };
    }
);
