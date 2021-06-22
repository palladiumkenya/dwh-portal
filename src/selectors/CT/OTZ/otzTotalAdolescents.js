import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzTotalAdolescents.listFiltered;
const listUnfiltered = state => state.otzTotalAdolescents.listUnfiltered;

export const getOtzTotalAdolescents = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const totalAdolescents = _.sumBy(list, 'totalAdolescents');
        return { totalAdolescents };
    }
);

export const getOtzTotalAdolescentsByGender = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
