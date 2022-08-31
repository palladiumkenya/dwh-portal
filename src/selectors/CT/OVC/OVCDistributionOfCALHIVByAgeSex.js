import { createSelector } from 'reselect';

import * as ageGroups from '../../AgeGroupsArray';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.OvcDistributionOfCALHIVByAgeSex.listFiltered;
const listUnfiltered = state => state.OvcDistributionOfCALHIVByAgeSex.listUnfiltered;

export const getOvcDistributionOfCALHIVByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const ovcAgeGroups = ageGroups.ovcAgeGroups;

        let distributionMale = [];
        let distributionFemale = [];

        for (const ageGroup of ovcAgeGroups) {
            const ageGroupMaleFilter = list.filter(obj => obj.DATIM_AgeGroup === ageGroup && (obj.Gender.toLowerCase() === "M".toLowerCase() || obj.Gender.toLowerCase() === "Male".toLowerCase()));
            const ageGroupFemaleFilter = list.filter(obj => obj.DATIM_AgeGroup === ageGroup && (obj.Gender.toLowerCase() === "F".toLowerCase() || obj.Gender.toLowerCase() === "Female".toLowerCase()));
            if (ageGroupMaleFilter.length > 0) {
                distributionMale.push(ageGroupMaleFilter[0].OverallCALHIV);
            } else {
                distributionMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                distributionFemale.push(ageGroupFemaleFilter[0].OverallCALHIV);
            } else {
                distributionFemale.push(0);
            }
        }

        let max = _.max([_.max(distributionMale), _.max(distributionFemale)]);
        distributionMale = distributionMale.map(x => x * -1);
        ovcAgeGroups.splice(ovcAgeGroups.length - 1, 1, '15 to 17');

        return { max, ovcAgeGroups, distributionMale, distributionFemale };
    }
);
