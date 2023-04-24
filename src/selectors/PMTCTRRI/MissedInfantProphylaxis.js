import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.missedInfantProphylaxis.listUnfiltered;
const listFiltered = (state) => state.missedInfantProphylaxis.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getMissedInfantProphylaxisOverview = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let posmothers = list.reduce(
            (a, b) =>
                a + b.NoOfInfantsNotGivenProphylaxisKnownPos,
            0
        );
        let givenProph = list.reduce(
            (a, b) =>
                a + b.NoOfInfantsGivenProphylaxis,
            0
        );
        let notGivenProph = list.reduce(
            (a, b) =>
                a +
                b.NoOfInfantsNotGivenProphylaxisNewPos +
                b.NoOfInfantsNotGivenProphylaxisKnownPos,
            0
        );

		return { posmothers, givenProph, notGivenProph };
	}
);

export const getMissedInfantProphylaxisCountyAmongKnownPos = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const county = curr.County
                ? curr.County.toUpperCase()
                : 'NO COUNTY';
            const knownPos = curr.NoOfInfantsNotGivenProphylaxisKnownPos;
            acc[county] = acc[county] || {
                County: county,
                NoOfInfantsNotGivenProphylaxisKnownPos: 0,
            };
            acc[county].NoOfInfantsNotGivenProphylaxisKnownPos += knownPos;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort(
            (a, b) =>
                b.NoOfInfantsNotGivenProphylaxisKnownPos -
                a.NoOfInfantsNotGivenProphylaxisKnownPos
        );

        let counties = sortedData.map((e) =>
            e.County ? e.County.toUpperCase() : 'NO COUNTY'
        );
        let data = sortedData.map(
            (e) => e.NoOfInfantsNotGivenProphylaxisKnownPos
        );

        return {
            counties,
            data
        };
	}
);

export const getMissedInfantProphylaxisSDPAmongKnownPos = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const sdp = curr.SDP ? curr.SDP.toUpperCase() : 'NO PARTNER';
            const knownPos = curr.NoOfInfantsNotGivenProphylaxisKnownPos;
            acc[sdp] = acc[sdp] || {
                SDP: sdp,
                NoOfInfantsNotGivenProphylaxisKnownPos: 0,
            };
            acc[sdp].NoOfInfantsNotGivenProphylaxisKnownPos += knownPos;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort(
            (a, b) =>
                b.NoOfInfantsNotGivenProphylaxisKnownPos -
                a.NoOfInfantsNotGivenProphylaxisKnownPos
        );

        let sdp = sortedData.map((e) =>
            e.SDP ? e.SDP.toUpperCase() : 'NO PARTNER'
        );
        let data = sortedData.map(
            (e) => e.NoOfInfantsNotGivenProphylaxisKnownPos
        );

        return { sdp, data };
	}
);

export const getMissedInfantProphylaxisCountyAmongNewPos = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const county = curr.County
                ? curr.County.toUpperCase()
                : 'NO COUNTY';
            const knownPos = curr.NoOfInfantsNotGivenProphylaxisNewPos;
            acc[county] = acc[county] || {
                County: county,
                NoOfInfantsNotGivenProphylaxisNewPos: 0,
            };
            acc[county].NoOfInfantsNotGivenProphylaxisNewPos += knownPos;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort(
            (a, b) =>
                b.NoOfInfantsNotGivenProphylaxisNewPos -
                a.NoOfInfantsNotGivenProphylaxisNewPos
        );

        let counties = sortedData.map((e) =>
            e.County ? e.County.toUpperCase() : 'NO COUNTY'
        );
        let data = sortedData.map(
            (e) => e.NoOfInfantsNotGivenProphylaxisNewPos
        );

        return {
            counties,
            data
        };
	}
);

export const getMissedInfantProphylaxisSDPAmongNewPos = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const groupedData = list.reduce((acc, curr) => {
            const sdp = curr.SDP ? curr.SDP.toUpperCase() : 'NO PARTNER';
            const knownPos = curr.NoOfInfantsNotGivenProphylaxisNewPos;
            acc[sdp] = acc[sdp] || {
                SDP: sdp,
                NoOfInfantsNotGivenProphylaxisNewPos: 0,
            };
            acc[sdp].NoOfInfantsNotGivenProphylaxisNewPos += knownPos;
            return acc;
        }, {});

        const result = Object.values(groupedData);
        let sortedData = result.sort(
            (a, b) =>
                b.NoOfInfantsNotGivenProphylaxisNewPos -
                a.NoOfInfantsNotGivenProphylaxisNewPos
        );

        let sdp = sortedData.map((e) =>
            e.SDP ? e.SDP.toUpperCase() : 'NO PARTNER'
        );
        let data = sortedData.map(
            (e) => e.NoOfInfantsNotGivenProphylaxisNewPos
        );

        return { sdp, data };
	}
);

export const getMissedInfantProphylaxisList = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let newList = []
        newList = list.map(e => {
            let notGiven =
                e.NoOfInfantsNotGivenProphylaxisKnownPos +
                e.NoOfInfantsNotGivenProphylaxisNewPos;
            return {...e, notGiven}
        })

        return newList;
	}
);
