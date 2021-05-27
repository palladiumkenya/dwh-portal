import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.overallReportingRatesByFacilityReported.listUnfiltered;
const listFiltered = state => state.overallReportingRatesByFacilityReported.listFiltered;
const loading = state => state.overallReportingRatesByFacilityReported.loading;
const filtered = state => state.filters.filtered;
const docket = state => state.ui.rrTab;

export const getOverallReportingRatesByFacilityReported = createSelector(
    [listUnfiltered, listFiltered, filtered, docket],
    (listUnfiltered, listFiltered, filtered, docket) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list[docket];
    }
);

export const getOverallReportingRatesByFacilityReportedLoading = createSelector(
    [loading, docket],
    (loading, docket) => {
        return loading[docket];
    }
);
