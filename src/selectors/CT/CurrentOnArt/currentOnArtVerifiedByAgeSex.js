import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtVerifiedByAgeSex.listUnfiltered;
const listFiltered = state => state.currentOnArtVerifiedByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        console.log(list)
        let ageGroups = [
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
        let currentOnArtMale = [];
        let currentOnArtFemale = [];
        for (const ageGroup of ageGroups) {
            const ageGroupMaleFilter = list.filter(
                (obj) =>
                    obj.DATIM_AgeGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'M'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Male'.toLowerCase())
            );
            const ageGroupFemaleFilter = list.filter(
                (obj) =>
                    obj.DATIM_AgeGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'F'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Female'.toLowerCase())
            );
            if (ageGroupMaleFilter.length > 0) {
                currentOnArtMale.push(ageGroupMaleFilter[0].NumNupi);
            } else {
                currentOnArtMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                currentOnArtFemale.push(ageGroupFemaleFilter[0].NumNupi);
            } else {
                currentOnArtFemale.push(0);
            }
        }

        let max = _.max([_.max(currentOnArtMale), _.max(currentOnArtFemale)]);
        currentOnArtMale = currentOnArtMale.map(x => x * -1);

        return { ageGroups, max, currentOnArtFemale, currentOnArtMale };
    }
);
