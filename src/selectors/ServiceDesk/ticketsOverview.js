import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.ticketsOverview.listUnfiltered;
const listFiltered = (state) => state.ticketsOverview.listFiltered;
const filtered = state => state.filters.filtered;

export const getTicketsOverview = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);


