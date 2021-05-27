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

export const getAdultsAll = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const adults = _.chain(list).filter(list => list.ageGroup === "Adult").sumBy("txCurr").value();
        return _.chain(list)
            .filter(list => list.ageGroup === "Adult")
            .map(l => ({
                ...l,
                lastRegimen: l.lastRegimen ? l.lastRegimen : '',
                percentageOnArt: ((l.txCurr/adults)*100).toFixed(2),
            }))
            .value();
    }
);

export const getChildrenAll = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const children = _.chain(list).filter(list => list.ageGroup === "Child").sumBy("txCurr").value();
        return _.chain(list)
            .filter(list => list.ageGroup === "Child")
            .map(l => ({
                ...l,
                lastRegimen: l.lastRegimen ? l.lastRegimen : '',
                percentageOnArt: ((l.txCurr/children)*100).toFixed(2),
            }))
            .value();
    }
);

export const getAdultsOnFirstLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Adult" && list.regimenLine === "First Regimen Line")
            .groupBy('currentRegimen')
            .map((objs, key) => ({
                'currentRegimen': key,
                'txCurr': _.sumBy(objs, 'txCurr')
            }))
            .orderBy('txCurr', 'desc')
            .value();
    }
);


export const getAdultsOnSecondLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Adult" && list.regimenLine === "Second Regimen Line")
            .groupBy('currentRegimen')
            .map((objs, key) => ({
                'currentRegimen': key,
                'txCurr': _.sumBy(objs, 'txCurr')
            }))
            .orderBy('txCurr', 'desc')
            .value();
    }
);

export const getAdultsOnThirdLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Adult" && list.regimenLine === "Third Regimen Line")
            .groupBy('currentRegimen')
            .map((objs, key) => ({
                'currentRegimen': key,
                'txCurr': _.sumBy(objs, 'txCurr')
            }))
            .orderBy('txCurr', 'desc')
            .value();
    }
);

export const getAdultsOnUndocumentedLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Adult" && list.regimenLine === "Undocumented Regimen Line")
            .groupBy('currentRegimen')
            .map((objs, key) => ({
                'currentRegimen': key,
                'txCurr': _.sumBy(objs, 'txCurr')
            }))
            .orderBy('txCurr', 'desc')
            .value();
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
        return _.chain(list)
            .filter(list => list.ageGroup === "Child" && list.regimenLine === "First Regimen Line")
            .groupBy('currentRegimen')
            .map((objs, key) => ({
                'currentRegimen': key,
                'txCurr': _.sumBy(objs, 'txCurr')
            }))
            .orderBy('txCurr', 'desc')
            .value();
    }
);

export const getChildrenOnSecondLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Child" && list.regimenLine === "Second Regimen Line")
            .groupBy('currentRegimen')
            .map((objs, key) => ({
                'currentRegimen': key,
                'txCurr': _.sumBy(objs, 'txCurr')
            }))
            .orderBy('txCurr', 'desc')
            .value();
    }
);

export const getChildrenOnThirdLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Child" && list.regimenLine === "Third Regimen Line")
            .groupBy('currentRegimen')
            .map((objs, key) => ({
                'currentRegimen': key,
                'txCurr': _.sumBy(objs, 'txCurr')
            }))
            .orderBy('txCurr', 'desc')
            .value();
    }
);

export const getChildrenOnUndocumentedLine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Child" && list.regimenLine === "Undocumented Regimen Line")
            .groupBy('currentRegimen')
            .map((objs, key) => ({
                'currentRegimen': key,
                'txCurr': _.sumBy(objs, 'txCurr')
            }))
            .orderBy('txCurr', 'desc')
            .value();
    }
);
