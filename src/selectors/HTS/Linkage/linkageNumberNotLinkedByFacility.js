import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.linkageNumberNotLinkedByFacility.listUnfiltered;
const listFiltered = state => state.linkageNumberNotLinkedByFacility.listFiltered;
const filtered = state => state.filters.filtered;

export const getLinkageNumberNotLinkedByFacility = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .map(l => ({
                mfl: l.mfl ? l.mfl : '',
                facility: l.facility ? l.facility : '',
                county: l.county ? l.county : '',
                subCounty: l.subCounty ? l.subCounty : '',
                partner: l.partner ? l.partner : '',
                positive: l.positive ? l.positive : '',
                linked: l.linked ? l.linked : '',
            }))
            .value();
    }
);
