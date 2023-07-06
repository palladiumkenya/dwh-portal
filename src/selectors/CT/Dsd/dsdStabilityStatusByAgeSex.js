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

const listUnfilteredOverAllMMD = state => state.dsdMmdUptakeOverallBySex.listUnfiltered;
const listFilteredOverAllMMD = state => state.dsdMmdUptakeOverallBySex.listFiltered;

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
    [listUnfilteredOverAllMMD, listFilteredOverAllMMD, filtered],
    (listUnfilteredOverAllMMD, listFilteredOverAllMMD, filtered) => {
        const list = filtered ? listFilteredOverAllMMD : listUnfilteredOverAllMMD;
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
        const listExcluded = list.length > 0 ? list.filter(obj => obj.ageGroup !== ' Under 1'
            && obj.ageGroup !== '01 to 04'
            && obj.ageGroup !== '05 to 09'
            && obj.ageGroup !== '10 to 14'
            && obj.ageGroup !== '15 to 19') : [];
        const stable = _.sumBy(listExcluded, 'TXCurr');
        return stable;
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

        let totalMale = list
            .filter((a) => a.gender === 'M' || a.gender === 'Male')
            .reduce((acc, obj) => acc + obj.TXCurr, 0);
        let totalFemale = list
            .filter((a) => a.gender === 'F' || a.gender === 'Female')
            .reduce((acc, obj) => acc + obj.TXCurr, 0);

        const ageArr = [
            { "20 to 24" : "20 to 24" },
            { "25 to 29" : "25 to 29" },
            { "30 to 34" : "30 to 34" },
            { "35 to 39" : "35 to 39" },
            { "40 to 44" : "40 to 44" },
            { "45 to 49" : "45 to 49" },
            { "50 to 54" : "50 to 54" },
            { "55 to 59" : "55 to 59" },
            { "60 to 64" : "60 to 64" },
            {  "65+": "65+" }
        ];
        const ageGroups = [
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


            let femaleValue = 0;
            let maleValue = 0;
            if (femaleValues.length > 0) {
                femaleValue = femaleValues[0].patients;
            }
            if (maleValues.length > 0) {
                maleValue = maleValues[0].patients;
            }

            // if (ageGroupFemaleVals.length > 0) {
            //     totalFemale = totalFemale + ageGroupFemaleVals[0].txCurr;
            // }

            // if (ageGroupMaleVals.length > 0) {
            //     totalMale = totalMale + ageGroupMaleVals[0].txCurr;
            // }

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
