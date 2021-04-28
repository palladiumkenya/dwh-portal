import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.overallReportingRatesByFacilityNotReported.listUnfiltered;
const listFiltered = state => state.overallReportingRatesByFacilityNotReported.listFiltered;
const loading = state => state.overallReportingRatesByFacilityNotReported.loading;
const filtered = state => state.filters.filtered;
const docket = state => state.ui.rrTab;

export const getOverallReportingRatesByFacilityNotReported = createSelector(
    [listUnfiltered, listFiltered, filtered, docket],
    (listUnfiltered, listFiltered, filtered, docket) => {
        const list = filtered ? listFiltered : listUnfiltered;
        console.log('getOverallReportingRatesByFacilityNotReported');
        console.log(list[docket]);
        return list[docket];
    }
);

export const getOverallReportingRatesByFacilityNotReportedLoading = createSelector(
    [loading, docket],
    (loading, docket) => {
        return loading[docket];
    }
);
