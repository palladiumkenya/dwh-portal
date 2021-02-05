import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationNewByCounty.listUnfiltered;
const listFiltered = state => state.artOptimizationNewByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getNewByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).map(l => {
            if (l.startRegimen !== "TLE" && l.startRegimen !== "TLD" && l.startRegimen !== "Other Regimen") {
                return {
                    ...l,
                    startRegimen: "OTHERS"
                }
            } else {
                return l;
            }
        }).value();
    }
);

export const getCounties = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.county).map(l => l.county).uniq().sort().value();
    }
);

export const getRegimens = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.startRegimen && (l.startRegimen === "TLD" || l.startRegimen === "TLE" || l.startRegimen === "Other Regimen")).map(l => l.startRegimen).uniq().sort().value();
    }
);