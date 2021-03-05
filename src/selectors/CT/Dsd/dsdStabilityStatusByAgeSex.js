import _ from 'lodash';
import { createSelector } from 'reselect';
import dsdUptakeOverall from '../../../reducers/CT/Dsd/dsdUptakeOverall';
import dsdStableOverall from '../../../reducers/CT/Dsd/dsdStableOverall';

const listUnfiltered = state => state.dsdStabilityStatusByAgeSex.listUnfiltered;
const listFiltered = state => state.dsdStabilityStatusByAgeSex.listFiltered;

const listUnfilteredMMD = state => state.dsdUptakeOverall.listUnfiltered;
const listFilteredMMD = state => state.dsdUptakeOverall.listFiltered;

const listUnfilteredStable = state => state.dsdStableOverall.listUnfiltered;
const listFilteredStable = state => state.dsdStableOverall.listFiltered;

const filtered = state => state.filters.filtered;

export const getCurrentOnArt = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).sumBy("txCurr").value();
    }
);

export const getMmd = createSelector(
    [listUnfilteredMMD, listFilteredMMD, filtered],
    (listUnfilteredMMD, listFilteredMMD, filtered) => {
        const list = filtered ? listFilteredMMD : listUnfilteredMMD;
        return list.mmd;
    }
);

export const getNonMmd = createSelector(
    [listUnfilteredMMD, listFilteredMMD, filtered],
    (listUnfilteredMMD, listFilteredMMD, filtered) => {
        const list = filtered ? listFilteredMMD : listUnfilteredMMD;
        return list.nonMmd;
    }
);

export const getMmdBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const male = _.chain(list).filter(list => list.gender === "Male").sumBy("mmd").value();
        const female = _.chain(list).filter(list => list.gender === "Female").sumBy("mmd").value();
        return [male, female];
    }
);

export const getNonMmdBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const male = _.chain(list).filter(list => list.gender === "Male").sumBy("nonMmd").value();
        const female = _.chain(list).filter(list => list.gender === "Female").sumBy("nonMmd").value();
        return [male, female];
    }
);

export const getStable = createSelector(
    [listUnfilteredStable, listFilteredStable, filtered],
    (listUnfilteredStable, listFilteredStable, filtered) => {
        const list = filtered ? listFilteredStable : listUnfilteredStable;
        return list.Stable;
    }
);

export const getUnstable = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).sumBy("unStable").value();
    }
);

export const getStabilityStatusByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const ageGroups = [
            "Under 1",
            "1 to 4",
            "5 to 9",
            "10 to 14",
            "15 to 19",
            "20 to 24",
            "25 to 29",
            "30 to 34",
            "35 to 39",
            "40 to 44",
            "45 to 49",
            "50 to 54",
            "55 to 59",
            "60 to 64",
            "65+"
        ];
        let stableMale = [];
        let stableFemale = [];

        for (let j = 0; j < ageGroups.length; j++) {
            const femaleValues = list.filter(obj => (obj.gender === "Female" || obj.gender === "F") && (obj.ageGroup === ageGroups[j]));
            const maleValues = list.filter(obj => (obj.gender === "Male" || obj.gender === "M") && (obj.ageGroup === ageGroups[j]));
            let total = 0;
            let femaleValue = 0;
            let maleValue = 0;
            if (femaleValues.length > 0) {
                total = total + femaleValues[0].patients;
                femaleValue = femaleValues[0].patients;
            }
            if (maleValues.length > 0) {
                total = total + maleValues[0].patients;
                maleValue = maleValues[0].patients;
            }
            const malePercent = total > 0 ? ((maleValue / total)*100) : 0;
            const femalePercent = total > 0 ? ((femaleValue / total)*100) : 0;
            stableMale.push(Math.round(malePercent));
            stableFemale.push(-Math.round(femalePercent));
        }

        return { ageGroups, stableMale, stableFemale };
    }
);
