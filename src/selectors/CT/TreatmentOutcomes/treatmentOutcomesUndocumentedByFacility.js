import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.treatmentOutcomesUndocumentedByFacility.listUnfiltered;
const listFiltered = state => state.treatmentOutcomesUndocumentedByFacility.listFiltered;
const filtered = state => state.filters.filtered;

export const getTreatmentOutcomesUndocumentedByFacility = createSelector(
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
                patients: l.patients ? l.patients : '',
            }))
            .value();
    }
);
