import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesAmongAlHivWithReSuppression.listFiltered;
const listUnfiltered = state => state.otzOutcomesAmongAlHivWithReSuppression.listUnfiltered;

export const getOtzOutcomesAmongAlHivWithReSuppression = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        console.log(list);

        return null;
    }
);


