import _ from 'lodash';
import { createSelector } from 'reselect';
import * as ageGroups from '../../AgeGroupsArray';

const listUnfiltered = state => state.adverseEventsReportedWithSeverityLevels.listUnfiltered;
const listFiltered = state => state.adverseEventsReportedWithSeverityLevels.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsReportedWithSeverityLevels = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return getAdverseEventsReportedWithSeverityLevelsTabs(list, 'adult');
    }
);

export const getAdverseEventsReportedWithSeverityLevelsCalHIV = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return getAdverseEventsReportedWithSeverityLevelsTabs(list, 'calhiv');
    }
);

export const getAdverseEventsReportedWithSeverityLevelsTabs = (list, tab) => {
    const ageGroup = tab === 'adult' ? ageGroups.adultAgeGroups : ageGroups.childrenAgeGroups;
    const severityCategories = ['Mild', 'Moderate', 'Severe', 'Unknown'];
    let categories = _.chain(list)
        .filter(l => l.AdverseEvent && ageGroup.includes(l.ageGroup))
        .map(l => ({ ...l, AdverseEvent: l.AdverseEvent.toUpperCase() }))
        .groupBy('AdverseEvent')
        .map((objs, key) => ({
            'adverseEvent': key,
            'total': _.sumBy(objs, 'total')
        }))
        .orderBy('total', 'desc')
        //.map(l => l.adverseEvent)
        // .uniq()
        .value();

    categories = categories.filter(obj => obj.total >= 30).map(y => y.adverseEvent);

    let data = [];
    for(let i = 0; i < severityCategories.length; i++) {
        data[i] = [];
        for(let j = 0; j < categories.length; j++) {
            data[i][j] = 0;
        }
    }
    for(let i = 0; i < list.length; i++) {
        let severityIndex = severityCategories.indexOf(list[i].Severity);
        let categoryIndex = categories.indexOf(list[i].AdverseEvent.toUpperCase());
        if(severityIndex === -1 && categories.indexOf('OTHER AEs') === -1) {
            continue;
        }
        if(categoryIndex === -1 ) {
            categoryIndex = categories.indexOf('OTHER AEs');
        }
        data[severityIndex][categoryIndex] = data[severityIndex][categoryIndex] + parseInt(list[i].total);
    }

    return {
        categories: categories.map(c => c === 'OTHER ADRS' ? 'OTHER AEs': c),
        severityCategories,
        data
    };
};
