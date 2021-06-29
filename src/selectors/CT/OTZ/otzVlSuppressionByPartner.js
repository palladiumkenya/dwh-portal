import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionByPartner.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionByPartner.listUnfiltered;

export const getOtzVlSuppressionByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        const suppressionCategories = ['HVL', 'LVL', 'VL'];
        let partners = list.map(obj => obj ? obj.CTPartner.toUpperCase() : '');
        partners = _.uniq(partners);

        for (const suppressionCategory of suppressionCategories) {
            let vlSuppression = 0;
            const catArray = [];
            for (const partner of partners) {
                const arrayFilter = list.filter(obj => obj.Last12MVLResult === suppressionCategory && obj.CTPartner.toUpperCase() === partner);
                if (arrayFilter.length > 0) {
                    vlSuppression = arrayFilter[0].vlSuppression;
                } else {
                    vlSuppression = 0;
                }

                catArray.push(vlSuppression);
            }
            data.push(catArray);
        }
        return { partners, data };
    }
);
