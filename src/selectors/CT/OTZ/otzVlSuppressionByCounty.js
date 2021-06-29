import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionByCounty.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionByCounty.listUnfiltered;

export const getOtzVlSuppressionByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        const suppressionCategories = ['HVL', 'LVL', 'VL'];
        let counties = list.map(obj => obj.County.toUpperCase());
        counties = _.uniq(counties);

        for (const suppressionCategory of suppressionCategories) {
            let vlSuppression = 0;
            const catArray = [];
            for (const county of counties) {
                const arrayFilter = list.filter(obj => obj.Last12MVLResult === suppressionCategory && obj.County.toUpperCase() === county);
                if (arrayFilter.length > 0) {
                    vlSuppression = arrayFilter[0].vlSuppression;
                } else {
                    vlSuppression = 0;
                }

                catArray.push(vlSuppression);
            }
            data.push(catArray);
        }

        return { counties, data };
    }
);
