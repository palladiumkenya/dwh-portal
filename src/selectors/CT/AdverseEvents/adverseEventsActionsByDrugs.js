import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.adverseEventsActionsByDrugs.listUnfiltered;
const listFiltered = state => state.adverseEventsActionsByDrugs.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsActionsByDrugs = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const categories = [];

        for (let i = 0; i < list.length; i++) {
            if (!categories.includes(list[i].AdverseEventCause)) {
                categories.push(list[i].AdverseEventCause);
            }
        }
        const severeVals = [];
        const moderateVals = [];
        const mildVals = [];
        const undocumentedVals = [];
        for (let i = 0; i < categories.length; i++) {
            const categoryVals =  list.filter(obj => obj.AdverseEventCause === categories[i]);
            //Severe
            const severeVal = categoryVals.filter(x => x.Severity === 'Severe');
            const sumSevere = severeVal.length > 0 ? severeVal.map(item => item.total).reduce((x, y) => x + y) : 0;
            severeVals.push(sumSevere);
            //Moderate
            const moderateVal = categoryVals.filter(x => x.Severity === 'Moderate');
            const sumModerate = moderateVal.length > 0 ? moderateVal.map(item => item.total).reduce((x, y) => x + y) : 0;
            moderateVals.push(sumModerate);
            //Mild
            const mildVal = categoryVals.filter(x => x.Severity === 'Mild');
            const sumMild = mildVal.length > 0 ? mildVal.map(item => item.total).reduce((x, y) => x + y) : 0;
            mildVals.push(sumMild);
            //Undocumented
            const undocumentedVal = categoryVals.filter(x => x.Severity === 'Undocumented');
            const sumundocumented = undocumentedVal.length > 0 ? undocumentedVal.map(item => item.total).reduce((x, y) => x + y) : 0;
            undocumentedVals.push(sumundocumented);
        }
        return { categories, severeVals, moderateVals, mildVals };
    }
);

export const getAdverseEventsCauses = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const arvArray = list.filter(obj => obj.AdverseEventCause === 'ARV');
        const arvAndOthersArray = list.filter(obj => obj.AdverseEventCause === 'ARV + OTHER DRUGS');
        const non_arvArray = list.filter(obj => obj.AdverseEventCause === 'NON-ARVS');
        const unspecifiedArray = list.filter(obj => obj.AdverseEventCause === 'UNSPECIFIED');

        const arv = arvArray.length > 0 ? _.sumBy(arvArray, 'total') : 0;
        const arvAndOthers = arvAndOthersArray.length > 0 ? _.sumBy(arvAndOthersArray, 'total') : 0;
        const non_arv = non_arvArray.length > 0 ? _.sumBy(non_arvArray, 'total') : 0;
        const unspecified = unspecifiedArray.length > 0 ? _.sumBy(unspecifiedArray, 'total') : 0;

        return { arv, arvAndOthers, non_arv, unspecified };
    }
);
