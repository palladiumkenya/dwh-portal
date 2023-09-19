import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.partnerLevelIssues.listUnfiltered;
const listFiltered = (state) => state.partnerLevelIssues.listFiltered;

const filtered = state => state.filters.filtered;

export const getPartnerLevel = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);

