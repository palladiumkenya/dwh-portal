import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdStabilityStatusByCounty.listUnfiltered;
const listFiltered = state => state.dsdStabilityStatusByCounty.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredStability = state => state.dsdAppointmentDurationByCounty.listUnfiltered;
const listFilteredStability = state => state.dsdAppointmentDurationByCounty.listFiltered;

const listUnfilteredCurrentOnART = state => state.currentOnArtByCounty.listUnfiltered;
const listFilteredCurrentOnART = state => state.currentOnArtByCounty.listFiltered;

export const getStabilityStatusByCounty = createSelector(
    [listUnfilteredStability, listUnfilteredCurrentOnART, listFilteredStability, listFilteredCurrentOnART, filtered],
    (listUnfilteredStability, listUnfilteredCurrentOnART, listFilteredStability, listFilteredCurrentOnART, filtered) => {
        const list = filtered ? listFilteredStability : listUnfilteredStability;
        const listCurrentOnART = filtered ? listFilteredCurrentOnART : listUnfilteredCurrentOnART;

        const counties = [];
        const stability = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].county) {
                continue;
            }
            counties.push(list[i].county.toUpperCase());
            const selectedCounty = listCurrentOnART.filter(obj => obj.County ? obj.County.toUpperCase() === list[i].county.toUpperCase() : null);

            if (selectedCounty.length > 0) {
                stability.push({
                    name: list[i].county.toUpperCase(),
                    y: Math.round(((list[i].stablePatients/selectedCounty[0].txCurr)*100)) > 100 ? 100 : Math.round(((list[i].stablePatients/selectedCounty[0].txCurr)*100)),
                    text:  '<b>Stable Patients: ' + list[i].stablePatients + ' </b><br/> <b>Txcurr:' + selectedCounty[0].txCurr + '</b>'
                });
            } else {
                stability.push({
                    name: list[i].county.toUpperCase(),
                    y: 0,
                    text:  '<b>Stable Patients: ' + list[i].stablePatients + ' </b><br/> <b>Txcurr: </b>'
                });
            }
        }

        stability.sort(function(a, b) {
            return b.y - a.y;
        });
        return { counties, stability };
    }
);

export const getStabilityStatusByCountyMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const counties = [];
        const mmd = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].county) {
                continue;
            }
            counties.push(list[i].county.toUpperCase());
            mmd.push(list[i].mmd);
        }
        return { counties, mmd };
    }
);

export const getStabilityStatusByCountyNonMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const counties = [];
        const nonMmd = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].county) {
                continue;
            }
            counties.push(list[i].county.toUpperCase());
            nonMmd.push(list[i].nonMmd);
        }
        return { counties, nonMmd };
    }
);
