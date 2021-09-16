import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidPLHIVCurrentOnArt.listUnfiltered;
const listFiltered = state => state.CovidPLHIVCurrentOnArt.listFiltered;
const filtered = state => state.filters.filtered;

export const getPLHIVCurrentOnArt = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const plhivCurrentOnArt = _.sumBy(list, 'Adults');

        return { plhivCurrentOnArt };
    }
);
