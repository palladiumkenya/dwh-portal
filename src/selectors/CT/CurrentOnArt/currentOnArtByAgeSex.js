import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtByAgeSex.listUnfiltered;
const listFiltered = state => state.currentOnArtByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            "< 1",
            "1-4",
            "5-9",
            "10-14",
            "15-19",
            "20-24",
            "25-29",
            "30-34",
            "35-39",
            "40-44",
            "45-49",
            "50-54",
            "55-59",
            "60-64",
            "65+"
        ];
        let currentOnArtMale = [];
        let currentOnArtFemale = [];
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                currentOnArtMale.splice(index, 0, parseInt(list[i].txCurr));
            } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                currentOnArtFemale.splice(index, 0, parseInt(list[i].txCurr));
            }
        }

        let max = _.max([_.max(currentOnArtMale), _.max(currentOnArtFemale)]);
        currentOnArtMale = currentOnArtMale.map(x => x * -1);

        return { ageGroups, max, currentOnArtFemale, currentOnArtMale }
    }
);

export const getCurrentOnArtBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let currentOnArtMale = 0;
        let currentOnArtFemale = 0;
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                currentOnArtMale = currentOnArtMale + parseInt(list[i].txCurr);
            } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                currentOnArtFemale = currentOnArtFemale + parseInt(list[i].txCurr);
            }
        }

        return { currentOnArtFemale, currentOnArtMale }
    }
);

export const getCurrentOnArtByAgeSexList = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);