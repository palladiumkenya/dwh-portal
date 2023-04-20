import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.missedDTG.listUnfiltered;
const listFiltered = (state) => state.missedDTG.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getMissedDTGOverview = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let calhiv = list.reduce((a, b) => a + b.CalHIV, 0);
        let ondtg = list.reduce((a, b) => a + b.CalHIVOnDTG, 0);
        let nondtg = list.reduce((a, b) => a + b.CalHIVNotOnDTG, 0);

		return { calhiv, ondtg, nondtg };
	}
);

export const getMissedDTGCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const county = curr.County ? curr.County.toUpperCase() : 'NO COUNTY';
            const knownPos = curr.CalHIVNotOnDTG;
            acc[county] = acc[county] || {
                County: county,
                CalHIVNotOnDTG: 0,
            };
            acc[county].CalHIVNotOnDTG += knownPos;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort(
            (a, b) =>
                b.CalHIVNotOnDTG -
                a.CalHIVNotOnDTG
        );

        let counties = sortedData.map((e) =>
            e.County ? e.County.toUpperCase() : 'NO COUNTY'
        );
        let data = sortedData.map(
            (e) => e.CalHIVNotOnDTG
        );

        return {
            counties,
            data
        };
	}
);

export const getMissedDTGSDP = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const sdp = curr.SDP ? curr.SDP.toUpperCase() : 'NO PARTNER';
            const knownPos = curr.CalHIVNotOnDTG;
            acc[sdp] = acc[sdp] || {
                SDP: sdp,
                CalHIVNotOnDTG: 0,
            };
            acc[sdp].CalHIVNotOnDTG += knownPos;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort(
            (a, b) =>
                b.CalHIVNotOnDTG -
                a.CalHIVNotOnDTG
        );

        let sdp = sortedData.map((e) =>
            e.SDP ? e.SDP.toUpperCase() : 'NO PARTNER'
        );
        let data = sortedData.map(
            (e) => e.CalHIVNotOnDTG
        );

        return { sdp, data };
	}
);


export const getMissedDTGList = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;

        list = list.map(e=> {
            if (e.CalHIVNotOnDTG === null || e.CalHIVOnDTG === null) {
                return { ...e, CalHIVNotOnDTG: 0, CalHIVOnDTG: 0 };
            } else if (e.CalHIVNotOnDTG === null) {
                return { ...e, CalHIVNotOnDTG: 0 };
            } else if (e.CalHIVOnDTG === null) {
                return { ...e, CalHIVOnDTG: 0 };
            } else return { ...e };
        })

        return list;
	}
);
