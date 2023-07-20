import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtByAgeSex.listUnfiltered;
const listFiltered = state => state.newOnArtByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;

export const getNewOnArtByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const ageGroups = [
            ' Under 1',
            '01 to 04',
            '05 to 09',
            '10 to 14',
            '15 to 19',
            '20 to 24',
            '25 to 29',
            '30 to 34',
            '35 to 39',
            '40 to 44',
            '45 to 49',
            '50 to 54',
            '55 to 59',
            '60 to 64',
            '65+',
        ];
        let newOnArtMale = [];
        let newOnArtFemale = [];

        for (const ageGroup of ageGroups) {
            const ageGroupMaleFilter = list.filter(obj => obj.AgeGroup === ageGroup && (obj.Gender.toLowerCase() === "M".toLowerCase() || obj.Gender.toLowerCase() === "Male".toLowerCase()));
            const ageGroupFemaleFilter = list.filter(obj => obj.AgeGroup === ageGroup && (obj.Gender.toLowerCase() === "F".toLowerCase() || obj.Gender.toLowerCase() === "Female".toLowerCase()));
            if (ageGroupMaleFilter.length > 0) {
                newOnArtMale.push(ageGroupMaleFilter[0].txNew);
            } else {
                newOnArtMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                newOnArtFemale.push(ageGroupFemaleFilter[0].txNew);
            } else {
                newOnArtFemale.push(0);
            }
        }

        let max = _.max([_.max(newOnArtMale), _.max(newOnArtFemale)]);
        newOnArtMale = newOnArtMale.map(x => x * -1);

        return { max, ageGroups, newOnArtMale, newOnArtFemale };
    }
);

export const getNewOnArtBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let newOnArtMale = 0;
        let newOnArtFemale = 0;

        for(let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                newOnArtMale = newOnArtMale + parseInt(list[i].txNew);
            }
            else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                newOnArtFemale = newOnArtFemale + parseInt(list[i].txNew);
            }
        }

        return { newOnArtMale, newOnArtFemale };
    }
);
