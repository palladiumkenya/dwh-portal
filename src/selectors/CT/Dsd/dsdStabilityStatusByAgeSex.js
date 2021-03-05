import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdStabilityStatusByAgeSex.listUnfiltered;
const listFiltered = state => state.dsdStabilityStatusByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArt = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).sumBy("txCurr").value();
    }
);

export const getMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).sumBy("mmd").value();
    }
);

export const getNonMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).sumBy("nonMmd").value();
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
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).sumBy("stable").value();
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
        /*for (let i = 0; i < list.length; i++) {
            const femaleValues = list.filter(obj => obj.gender === "Female" || obj.gender === "F");
            const maleValues = list.filter(obj => obj.gender === "Male" || obj.gender === "M");
            let index = ageGroups.indexOf(list[i].ageGroup);
            console.log(index);
            //femaleValues.filter(obj => obj.ageGroup);
            //maleValues.filter(obj => obj.ageGroup);
            for (let j = 0; j < ageGroups.length; i++) {
                const ageFemaleGroupVal = femaleValues.filter(obj => obj.ageGroup === ageGroups[j]);
                const ageMaleGroupVal = maleValues.filter(obj => obj.ageGroup === ageGroups[j]);
                console.log(ageFemaleGroupVal);
                console.log(ageMaleGroupVal);
            }
        }*/
        /*for(let i = 0; i < list.length; i++) {
            if (list[i].gender.toLowerCase() === "M".toLowerCase() || list[i].gender.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                stableMale.splice(index, 0, parseInt(list[i].patients));
            }
            else if (list[i].gender.toLowerCase() === "F".toLowerCase() || list[i].gender.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                stableFemale.splice(index, 0, parseInt(list[i].patients));
            }
        }*/

        /*let max = _.max([_.max(stableMale), _.max(stableFemale)]);
        stableMale = stableMale.map(x => x * -1);*/

        return { ageGroups, stableMale, stableFemale };
    }
);
