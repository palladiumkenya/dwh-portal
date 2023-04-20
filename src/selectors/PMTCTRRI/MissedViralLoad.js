import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.missedViralLoad.listUnfiltered;
const listFiltered = (state) => state.missedViralLoad.listFiltered;

const filtered = (state) => state.filters.filtered;

export const getMissedViralLoadOverview = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let calhiv = list.reduce((a, b) => a + b.CALHIVTxCurr, 0);
        let eligibleVL = list.reduce((a, b) => a + b.EligibleVL, 0);
        let vlDone = list.reduce((a, b) => a + b.VLDone, 0);
        let suppressed = list.reduce((a, b) => a + b.Suppressed, 0);

		return { calhiv, eligibleVL, vlDone, suppressed };
	}
);

export const getMissedViralLoadCountyMissingVL = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const county = curr.County
                ? curr.County.toUpperCase()
                : 'NO COUNTY';
            const missing = curr.MissingVL;
            acc[county] = acc[county] || {
                County: county,
                MissingVL: 0,
            };
            acc[county].MissingVL += missing;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort((a, b) => b.MissingVL - a.MissingVL);

        let counties = sortedData.map((e) =>
            e.County ? e.County.toUpperCase() : 'NO COUNTY'
        );
        let data = sortedData.map((e) => e.MissingVL);

        return {
            counties,
            data
        };
	}
);

export const getMissedViralLoadSDPMissingVL = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const sdp = curr.PartnerName
                ? curr.PartnerName.toUpperCase()
                : 'NO PARTNER';
            const missed = curr.MissingVL;
            acc[sdp] = acc[sdp] || {
                SDP: sdp,
                MissingVL: 0,
            };
            acc[sdp].MissingVL += missed;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort((a, b) => b.MissingVL - a.MissingVL);

        let sdp = sortedData.map((e) =>
            e.SDP ? e.SDP.toUpperCase() : 'NO PARTNER'
        );
        let data = sortedData.map((e) => e.MissingVL);

        return { sdp, data };
	}
);

export const getMissedViralLoadCountyNonSup = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const county = curr.County
                ? curr.County.toUpperCase()
                : 'NO COUNTY';
            const missing = curr.NonSuppressed;
            acc[county] = acc[county] || {
                County: county,
                NonSuppressed: 0,
            };
            acc[county].NonSuppressed += missing;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort(
            (a, b) => b.NonSuppressed - a.NonSuppressed
        );

        let counties = sortedData.map((e) =>
            e.County ? e.County.toUpperCase() : 'NO COUNTY'
        );
        let data = sortedData.map((e) => e.NonSuppressed);

        return {
            counties,
            data,
        };
	}
);

export const getMissedViralLoadSDPNonSup = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const sdp = curr.PartnerName
                ? curr.PartnerName.toUpperCase()
                : 'NO PARTNER';
            const missed = curr.NonSuppressed;
            acc[sdp] = acc[sdp] || {
                SDP: sdp,
                NonSuppressed: 0,
            };
            acc[sdp].NonSuppressed += missed;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort(
            (a, b) => b.NonSuppressed - a.NonSuppressed
        );

        let sdp = sortedData.map((e) =>
            e.SDP ? e.SDP.toUpperCase() : 'NO PARTNER'
        );
        let data = sortedData.map((e) => e.NonSuppressed);

        return { sdp, data };
	}
);

export const getMissedViralLoadList = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;
        const result = list.reduce((acc, curr) => {
            const groupKey = [
                curr.FacilityName,
                curr.SubCounty,
                curr.County,
                curr.PartnerName,
                curr.AgencyName,
            ].join('-');

            if (!acc[groupKey]) {
                acc[groupKey] = {
                    FacilityName: curr.FacilityName,
                    SubCounty: curr.SubCounty,
                    County: curr.County,
                    PartnerName: curr.PartnerName,
                    AgencyName: curr.AgencyName,
                    CALHIVTxCurr: 0,
                    EligibleVL: 0,
                    VLDone: 0,
                    Suppressed: 0,
                    MissingVL: 0,
                    NonSuppressed: 0,
                };
            }

            acc[groupKey].CALHIVTxCurr += curr.CALHIVTxCurr;
            acc[groupKey].EligibleVL += curr.EligibleVL;
            acc[groupKey].VLDone += curr.VLDone;
            acc[groupKey].Suppressed += curr.Suppressed;
            acc[groupKey].MissingVL += curr.MissingVL;
            acc[groupKey].NonSuppressed += curr.NonSuppressed;

            return acc;
        }, {});

        const newList = Object.values(result);

        return newList;
	}
);
