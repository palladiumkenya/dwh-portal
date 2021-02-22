import { createSelector } from 'reselect';

const listUnfiltered = state => state.adverseEventsReportedWithSeverityLevels.listUnfiltered;
const listFiltered = state => state.adverseEventsReportedWithSeverityLevels.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsReportedWithSeverityLevels = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const categories = [];
        const severe_values = [];
        const moderate_values = [];
        const mild_values = [];
        for (let i = 0; i < list.length; i++) {
            categories.push(list[i].AdverseEvent);
        }

        for (let i = 0; i < categories.length; i++) {
            const cat_severe = list.filter(obj => obj.AdverseEvent === categories[i] && obj.Severity === 'Severe');
            const cat_moderate = list.filter(obj => obj.AdverseEvent === categories[i] && obj.Severity === 'Moderate');
            const cat_mild = list.filter(obj => obj.AdverseEvent === categories[i] && obj.Severity === 'Mild');

            const x  = cat_severe.length > 0 ? cat_severe.map(item => item.total).reduce((x, y) => x + y) : 0;
            const y  = cat_moderate.length > 0 ? cat_moderate.map(item => item.total).reduce((x, y) => x + y) : 0;
            const z  = cat_mild.length > 0 ? cat_mild.map(item => item.total).reduce((x, y) => x + y) : 0;

            if (x > 0 || y > 0 || z > 0) {
                severe_values.push(x);
                moderate_values.push(y);
                mild_values.push(z);
            }
        }

        return { categories, severe_values, moderate_values, mild_values };
    }
);
