import { createSelector } from 'reselect';

import * as ageGroups from '../../AgeGroupsArray';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = (state) => state.otzEnrollmentAgeSex.listFiltered;
const listUnfiltered = (state) => state.otzEnrollmentAgeSex.listUnfiltered;

export const getOtzDistributionOfPatientsByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        
        let otzAgeGroups = ['10 to 14', '15 to 19', '20 to 24'];

        let distributionMale = [];
        let distributionFemale = [];

        for (let ageGroup of otzAgeGroups) {
            const ageGroupMaleFilter = list.filter(
                (obj) =>
                    obj.ageGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'M'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Male'.toLowerCase())
            );
            const ageGroupFemaleFilter = list.filter(
                (obj) =>
                    obj.ageGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'F'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Female'.toLowerCase())
            );
            if (ageGroupMaleFilter.length > 0) {
                distributionMale.push(ageGroupMaleFilter[0].TXCurr);
            } else {
                distributionMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                distributionFemale.push(ageGroupFemaleFilter[0].TXCurr);
            } else {
                distributionFemale.push(0);
            }
        }

        let max = _.max([_.max(distributionMale), _.max(distributionFemale)]);
        distributionMale = distributionMale.map((x) => x * -1);

        return { max, otzAgeGroups, distributionMale, distributionFemale };
    }
);
