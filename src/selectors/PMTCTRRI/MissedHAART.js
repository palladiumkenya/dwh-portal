import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.missedHAARTOverview.listUnfiltered;
const listFiltered = (state) => state.missedHAARTOverview.listFiltered;

const listUnfilteredCounty = (state) => state.missedHAARTCounty.listUnfiltered;
const listFilteredCounty = (state) => state.missedHAARTCounty.listFiltered;

const listUnfilteredSDP = (state) => state.missedHAARTSDP.listUnfiltered;
const listFilteredSDP = (state) => state.missedHAARTSDP.listFiltered;

const listUnfilteredFacility = (state) => state.missedHAARTFacility.listUnfiltered;
const listFilteredFacility = (state) => state.missedHAARTFacility.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getMissedHAARTOverview = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
		return list;
	}
);

export const getMissedHAARTFacility = createSelector(
    [listUnfilteredFacility, listFilteredFacility, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
	}
);

export const getMissedHAARTCounty = createSelector(
    [listUnfilteredCounty, listFilteredCounty, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;

        let counties = list.map((e) =>
            e.County ? e.County.toUpperCase() : 'NO COUNTY'
        );
        let known = list.map((e) => e.known);
        let newpos = list.map((e) => e.new);
        let not = list.map((e) => e.notart);

        return { counties, known, newpos, not };
	}
);

export const getMissedHAARTSDP = createSelector(
    [listUnfilteredSDP, listFilteredSDP, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;

        let sdp = list.map((e) => e.SDP? e.SDP.toUpperCase(): "NO PARTNER");
        let known = list.map((e) => e.known);
        let newpos = list.map((e) => e.new);
        let not = list.map((e) => e.notart);

        return { sdp, known, newpos, not };
	}
);