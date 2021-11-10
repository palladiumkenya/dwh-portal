import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.gpsSites.list;
const listFiltered = state => state.gpsSites.list;
const filtered = state => state.filters.filtered;

export const getGpsSites = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return list.list;
    }
);
