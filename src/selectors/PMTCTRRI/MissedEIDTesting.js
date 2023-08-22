import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.missedEIDOverview.listUnfiltered;
const listFiltered = (state) => state.missedEIDOverview.listFiltered;

const listUnfilteredCounty = (state) => state.missedEIDCounty.listUnfiltered;
const listFilteredCounty = (state) => state.missedEIDCounty.listFiltered;

const listUnfilteredSDP = (state) => state.missedEIDSDP.listUnfiltered;
const listFilteredSDP = (state) => state.missedEIDSDP.listFiltered;

const listUnfilteredAgePCR = (state) => state.missedEIDAgeFirstPCR.listUnfiltered;
const listFilteredAgePCR = (state) => state.missedEIDAgeFirstPCR.listFiltered;

const listUnfilteredMissingPCR = (state) => state.missedEIDMissingPCR.listUnfiltered;
const listFilteredMissingPCR = (state) => state.missedEIDMissingPCR.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getMissedEIDTestingOverview = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
		return list;
	}
);

export const getMissedEIDTestingMissingPCR = createSelector(
    [listUnfilteredMissingPCR, listFilteredMissingPCR, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);

export const getMissedEIDTestingAgePCR = createSelector(
    [listUnfilteredAgePCR, listFilteredAgePCR, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);

export const getMissedEIDTestingCounty = createSelector(
    [listUnfilteredCounty, listFilteredCounty, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const sortedData = list.sort((a, b) => {
            const aLesst2MonthsPercent =
                (a.lesst2Months /
                    (a.lesst2Months +
                        a.within12Months +
                        a.above1Year +
                        a.missingPCRTests)) *
                100;
            const bLesst2MonthsPercent =
                (b.lesst2Months /
                    (b.lesst2Months +
                        b.within12Months +
                        b.above1Year +
                        b.missingPCRTests)) *
                100;
            const aWithin12MonthsPercent =
                (a.within12Months /
                    (a.lesst2Months +
                        a.within12Months +
                        a.above1Year +
                        a.missingPCRTests)) *
                100;
            const bWithin12MonthsPercent =
                (b.within12Months /
                    (b.lesst2Months +
                        b.within12Months +
                        b.above1Year +
                        b.missingPCRTests)) *
                100;

            return (
                bLesst2MonthsPercent - aLesst2MonthsPercent ||
                bWithin12MonthsPercent - aWithin12MonthsPercent
            );
        });

        let counties = sortedData.map((e) =>
            e.County ? e.County.toUpperCase() : 'NO COUNTY'
        );
        let lesst2Months = sortedData.map((e) => e.lesst2Months);
        let within12Months = sortedData.map((e) => e.within12Months);
        let above1Year = sortedData.map((e) => e.above1Year);
        let missingPCRTests = sortedData.map((e) => e.missingPCRTests);

        return {
            counties,
            within12Months,
            lesst2Months,
            above1Year,
            missingPCRTests,
        };
	}
);

export const getMissedEIDTestingSDP = createSelector(
    [listUnfilteredSDP, listFilteredSDP, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const sortedData = list.sort((a, b) => {
            const aLesst2MonthsPercent =
                (a.lesst2Months /
                    (a.lesst2Months +
                        a.within12Months +
                        a.above1Year +
                        a.missingPCRTests)) *
                100;
            const bLesst2MonthsPercent =
                (b.lesst2Months /
                    (b.lesst2Months +
                        b.within12Months +
                        b.above1Year +
                        b.missingPCRTests)) *
                100;
            const aWithin12MonthsPercent =
                (a.within12Months /
                    (a.lesst2Months +
                        a.within12Months +
                        a.above1Year +
                        a.missingPCRTests)) *
                100;
            const bWithin12MonthsPercent =
                (b.within12Months /
                    (b.lesst2Months +
                        b.within12Months +
                        b.above1Year +
                        b.missingPCRTests)) *
                100;

            return (
                bLesst2MonthsPercent - aLesst2MonthsPercent ||
                bWithin12MonthsPercent - aWithin12MonthsPercent
            );

        });

        let sdp = sortedData.map((e) =>
            e.SDP ? e.SDP.toUpperCase() : 'NO PARTNER'
        );
        let lesst2Months = sortedData.map((e) => e.lesst2Months);
        let within12Months = sortedData.map((e) => e.within12Months);
        let above1Year = sortedData.map((e) => e.above1Year);
        let missingPCRTests = sortedData.map((e) => e.missingPCRTests);

        return {
            sdp,
            within12Months,
            lesst2Months,
            above1Year,
            missingPCRTests,
        };

	}
);