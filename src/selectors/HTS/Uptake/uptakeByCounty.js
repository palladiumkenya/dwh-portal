import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.uptakeByCounty.listUnfiltered;
const listFiltered = state => state.uptakeByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getTestedByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).orderBy("tested", "desc").value();
    }
);

export const getTested = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).map(l => ({...l, tested: l.Tested ? Number(l.Tested): 0 })).sumBy("tested").value();
    }
);

export const getPositive = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).map(l => ({...l, positive: l.positive ? Number(l.positive): 0 })).sumBy("positive").value();
    }
);

