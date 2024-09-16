import { createSelector } from 'reselect';
import * as ageGroups from '../../AgeGroupsArray';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzAlhivOnArtByAgeSex.listFiltered;
const listUnfiltered = state => state.otzAlhivOnArtByAgeSex.listUnfiltered;

export const getOtzAlhivOnArtByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let otzAgeGroups = ageGroups.otzAgeGroups;

        let distributionMale = [];
        let distributionFemale = [];

        for (const ageGroup of otzAgeGroups) {
            const ageGroupMaleFilter = list?.filter(obj => obj.AgeGroup === ageGroup && (obj.Gender.toLowerCase() === "M".toLowerCase() || obj.Gender.toLowerCase() === "Male".toLowerCase()));
            const ageGroupFemaleFilter = list.filter(obj => obj.AgeGroup === ageGroup && (obj.Gender.toLowerCase() === "F".toLowerCase() || obj.Gender.toLowerCase() === "Female".toLowerCase()));
            if (ageGroupMaleFilter.length > 0) {
                distributionMale.push(ageGroupMaleFilter[0].CALHIVonART);
            } else {
                distributionMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                distributionFemale.push(ageGroupFemaleFilter[0].CALHIVonART);
            } else {
                distributionFemale.push(0);
            }
        }

        let max = _.max([_.max(distributionMale), _.max(distributionFemale)]);
        distributionMale = distributionMale.map(x => x * -1);

        return { max, otzAgeGroups, distributionMale, distributionFemale };
        // return filtered ? listFiltered : listUnfiltered;
    }
);
