import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationCurrentByAgeSex.listUnfiltered;
const listFiltered = state => state.artOptimizationCurrentByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultsCurrentByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Adult");
    }
);

export const getAdultsCurrentByAgeSexMale = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Adult" && (list.gender === "Male" || list.gender === "M"));
    }
);

export const getAdultsCurrentByAgeSexFemale = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Adult" && (list.gender === "Female" || list.gender === "F"));
    }
);

export const getAdultsCurrentByAgeSexTotal = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Adult")
            .sumBy("txCurr")
            .value();
    }
);

export const getAdultsCurrentByAgeSexMaleTotal = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Adult"  && (list.gender === "Male" || list.gender === "M"))
            .sumBy("txCurr")
            .value();
    }
);

export const getAdultsCurrentByAgeSexFemaleTotal = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.ageGroup === "Adult"  && (list.gender === "Female" || list.gender === "F"))
            .sumBy("txCurr")
            .value();
    }
);

export const getChildrenCurrentByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Child");
    }
);

export const getChildrenCurrentByAgeSexMale = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Child" && (list.gender === "Male" || list.gender === "M"));
    }
);

export const getChildrenCurrentByAgeSexFemale = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Child" && (list.gender === "Female" || list.gender === "F"));
    }
);

export const getAgeGroups = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.datimAgeGroup).map(l => l.datimAgeGroup).uniq().sort().value();
    }
);

export const getSexGroups = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.gender).map(l => l.gender).uniq().sort().value();
    }
);