import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.missedFirstANCOverview.listUnfiltered;
const listFiltered = (state) => state.missedFirstANCOverview.listFiltered;

const listUnfilteredCounty = (state) => state.missedFirstANCCounty.listUnfiltered;
const listFilteredCounty = (state) => state.missedFirstANCCounty.listFiltered;

const listUnfilteredSDP = (state) => state.missedFirstANCSDP.listUnfiltered;
const listFilteredSDP = (state) => state.missedFirstANCSDP.listFiltered;

const listUnfilteredGaps = (state) => state.missedFirstANCGaps.listUnfiltered;
const listFilteredGaps = (state) => state.missedFirstANCGaps.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getMissedFirstANCOverview = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
		return list;
	}
);

export const getMissedFirstANCGaps = createSelector(
    [listUnfilteredGaps, listFilteredGaps, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
	}
);

export const getMissedFirstANCCounty = createSelector(
    [listUnfilteredCounty, listFilteredCounty, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let counties = list.map((e) =>
            e.County ? e.County.toUpperCase() : 'NO COUNTY'
        );
        let SyphilisTested = list.map((e) => e.SyphilisTested);
        let FirstANC = list.map((e) => e.FirstANC);
        let HIVTested = list.map((e) => e.HIVTested);

        return {counties, SyphilisTested, FirstANC, HIVTested}
	}
);

export const getMissedFirstANCSDP = createSelector(
    [listUnfilteredSDP, listFilteredSDP, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let sdp = list.map((e) => e.SDP? e.SDP.toUpperCase(): "NO PARTNER");
        let SyphilisTested = list.map((e) => e.SyphilisTested);
        let FirstANC = list.map((e) => e.FirstANC);
        let HIVTested = list.map((e) => e.HIVTested);

        return { sdp, SyphilisTested, FirstANC, HIVTested };

	}
);