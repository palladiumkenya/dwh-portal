import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdStabilityStatusByCounty.listUnfiltered;
const listFiltered = state => state.dsdStabilityStatusByCounty.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredStability = state => state.dsdAppointmentDurationByCounty.listUnfiltered;
const listFilteredStability = state => state.dsdAppointmentDurationByCounty.listFiltered;

export const getStabilityStatusByCounty = createSelector(
    [listUnfilteredStability, listFilteredStability, filtered],
    (listUnfilteredStability, listFilteredStability, filtered) => {
        const list = filtered ? listFilteredStability : listUnfilteredStability;
        const counties = [];
        const stability = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].county) {
                continue;
            }
            counties.push(list[i].county.toUpperCase());
            stability.push({
                y: Math.round(list[i].percentStable*100),
                text: list[i].patients
            });
        }
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
