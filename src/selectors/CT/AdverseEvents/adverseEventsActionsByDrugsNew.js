import _ from 'lodash';
import { createSelector } from 'reselect';
import * as ageGroups from '../../AgeGroupsArray';

const listUnfiltered = state => state.adverseEventsActionsByDrugsNew.listUnfiltered;
const listFiltered = state => state.adverseEventsActionsByDrugsNew.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsActionsByDrugsNew = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return getAdverseEventsActionsByDrugsNewTabs(list, 'adult');
    }
);

export const getAdverseEventsActionsByDrugsNewCalHIV = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return getAdverseEventsActionsByDrugsNewTabs(list, 'calhiv');
    }
);

export const getAdverseEventsActionsByDrugsNewTabs = (list, tab) => {
    const ageGroup = tab === 'adult' ? ageGroups.adultAgeGroups : ageGroups.childrenAgeGroups;

    const drugs = ['ARV', 'ARV + OTHER DRUGS', 'NON-ARVS', 'UNSPECIFIED'];
    const actions = _.chain(list)
        .filter(obj => ageGroup.includes(obj.ageGroup))
        .map(l => l.AdverseEventActionTaken)
        .uniq()
        .value();
    let data = [];
    for(let i = 0; i < actions.length; i++) {
        data[i] = [];
        for(let j = 0; j < drugs.length; j++) {
            data[i][j] = 0;
        }
    }
    for(let i = 0; i < list.length; i++) {
        let drugsIndex = drugs.indexOf(list[i].AdverseEventCause);
        let actionIndex = actions.indexOf(list[i].AdverseEventActionTaken);
        if(drugsIndex === -1 || actionIndex === -1 ) {
            continue;
        }
        data[actionIndex][drugsIndex] = data[actionIndex][drugsIndex] + parseInt(list[i].total);
    }

    return { actions, drugs, data };
};
