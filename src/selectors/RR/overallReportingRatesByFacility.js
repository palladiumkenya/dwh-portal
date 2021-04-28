import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.overallReportingRatesByFacility.listUnfiltered;
const listFiltered = state => state.overallReportingRatesByFacility.listFiltered;
const filtered = state => state.filters.filtered;
const docket = state => state.ui.rrTab;

export const getOverallReportingRatesByFacility = createSelector(
    [listUnfiltered, listFiltered, filtered, docket],
    (listUnfiltered, listFiltered, filtered, docket) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list[docket];
    }
);

