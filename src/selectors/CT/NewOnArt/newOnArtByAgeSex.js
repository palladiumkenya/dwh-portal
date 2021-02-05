import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtByAgeSex.listUnfiltered;
const listFiltered = state => state.newOnArtByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;
const ageGroups = state => {
    return [
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
    ]
};

export const getNewOnArtMale = createSelector(
    [listUnfiltered, listFiltered, filtered, ageGroups],
    (listUnfiltered, listFiltered, filtered, ageGroups) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const ageGroupsMale = ageGroups;
        let txNewMale = [];
        for(let i = 0; i < list.length; i++) {
            if (list[i].Gender === 'Male') {
                let index = ageGroupsMale.indexOf(list[i].AgeGroup);
                txNewMale.splice(index, 0, parseInt(list[i].txNew) * -1);
            }
        }
        return txNewMale;
    }
);

export const getNewOnArtFemale = createSelector(
    [listUnfiltered, listFiltered, filtered, ageGroups],
    (listUnfiltered, listFiltered, filtered, ageGroups) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const ageGroupsFemale = ageGroups;
        let txNewFemale = [];
        for(let i = 0; i < list.length; i++) {
            if (list[i].Gender === 'Female') {
                let index = ageGroupsFemale.indexOf(list[i].AgeGroup);
                txNewFemale.splice(index, 0, parseInt(list[i].txNew));
            }
        }
        return txNewFemale;
    }
);

export const getAgeGroups = createSelector(
    [listUnfiltered, listFiltered, filtered, ageGroups],
    (listUnfiltered, listFiltered, filtered, ageGroups) => {
        return ageGroups;
    }
);