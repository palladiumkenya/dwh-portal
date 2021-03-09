import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdStabilityStatusByAgeSex.listUnfiltered;
const listFiltered = state => state.dsdStabilityStatusByAgeSex.listFiltered;

const listUnfilteredMMD = state => state.dsdUptakeOverall.listUnfiltered;
const listFilteredMMD = state => state.dsdUptakeOverall.listFiltered;

const listUnfilteredStable = state => state.dsdStableOverall.listUnfiltered;
const listFilteredStable = state => state.dsdStableOverall.listFiltered;

const listUnfilteredTXCurr = state => state.currentOnArtByAgeSex.listUnfiltered;
const listFilteredTXCurr = state => state.currentOnArtByAgeSex.listFiltered;

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
    [listUnfiltered, listUnfilteredTXCurr, listFilteredTXCurr, listFiltered, filtered],
    (listUnfiltered, listUnfilteredTXCurr, listFilteredTXCurr, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listTXCurr = filtered ? listFilteredTXCurr : listUnfilteredTXCurr;

        const ageArr = [
            { "Under 1": "<1" },
            { "1 to 4": "1-4" },
            { "5 to 9": "5-9" },
            { "10 to 14" : "10-14" },
            { "15 to 19" : "15-19" },
            { "20 to 24" : "20-24" },
            { "25 to 29" : "25-29" },
            { "30 to 34" : "30-34" },
            { "35 to 39" : "35-39" },
            { "40 to 44" : "40-44" },
            { "45 to 49" : "45-49" },
            { "50 to 54" : "50-54" },
            { "55 to 59" : "55-59" },
            { "60 to 64" : "60-64" },
            {  "65+": "65+" }
        ];
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
            let altAgeGroup = null;
            const aggArrFind = ageArr.find(obj => {
                return Object.keys(obj)[0] === ageGroups[j];
            });

            if (aggArrFind) {
                altAgeGroup = Object.values(aggArrFind)[0];
            }


            const femaleValues = list.filter(obj => (obj.gender === "Female" || obj.gender === "F") && (obj.ageGroup === ageGroups[j]));
            const maleValues = list.filter(obj => (obj.gender === "Male" || obj.gender === "M") && (obj.ageGroup === ageGroups[j]));

            const ageGroupFemaleVals =  listTXCurr.filter(obj => (obj.Gender === "Female" || obj.Gender === "F") && (obj.ageGroup === altAgeGroup));
            const ageGroupMaleVals = listTXCurr.filter(obj => (obj.Gender === "Male" || obj.Gender === "M") && (obj.ageGroup === altAgeGroup));

            let totalFemale = 0;
            let femaleValue = 0;
            let totalMale = 0;
            let maleValue = 0;
            if (femaleValues.length > 0) {
                femaleValue = femaleValues[0].patients;
            }
            if (maleValues.length > 0) {
                maleValue = maleValues[0].patients;
            }

            if (ageGroupFemaleVals.length > 0) {
                totalFemale = totalFemale + ageGroupFemaleVals[0].txCurr;
            }

            if (ageGroupMaleVals.length > 0) {
                totalMale = totalMale + ageGroupMaleVals[0].txCurr;
            }

            const malePercent = totalMale > 0 ? ((maleValue / totalMale)*100) : 0;
            const femalePercent = totalFemale > 0 ? ((femaleValue / totalFemale)*100) : 0;
            stableMale.push(
                {
                    y: Math.round(malePercent),
                    text: maleValue
                }
            );
            stableFemale.push(
                {
                    y: Math.round(femalePercent),
                    text: femaleValue
                }
            );
        }

        return { ageGroups, stableMale, stableFemale };
    }
);
