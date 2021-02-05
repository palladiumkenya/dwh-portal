import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationCurrentByRegimen.listUnfiltered;
const listFiltered = state => state.artOptimizationCurrentByRegimen.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdults = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Adult")
            .sumBy("txCurr")
            .value();
    }
);

export const getAdultsOnFirstLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Adult" && list.regimenLine === "First Regimen Line");
    }
);


export const getAdultsOnSecondLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Adult" && list.regimenLine === "Second Regimen Line");
    }
);

export const getAdultsOnThirdLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Adult" && list.regimenLine === "Third Regimen Line");
    }
);

export const getAdultsOnUndocumentedLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Adult" && list.regimenLine === "Undocumented Regimen Line");
    }
);

export const getChildren = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Child")
            .sumBy("txCurr")
            .value();
    }
);

export const getChildrenOnFirstLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Child" && list.regimenLine === "First Regimen Line");
    }
);

export const getChildrenOnSecondLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Child" && list.regimenLine === "Second Regimen Line");
    }
);

export const getChildrenOnThirdLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Child" && list.regimenLine === "Third Regimen Line");
    }
);

export const getChildrenOnUndocumentedLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Child" && list.regimenLine === "Undocumented Regimen Line");
    }
);