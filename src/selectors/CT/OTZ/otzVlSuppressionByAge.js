import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionByAge.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionByAge.listUnfiltered;
const listFilteredNotEnrolled = (state) =>
    state.otzVlSuppressionByAgeNotEnrolled.listFiltered;
const listUnfilteredNotEnrolled = (state) =>
    state.otzVlSuppressionByAgeNotEnrolled.listUnfiltered;

export const getOtzVlSuppressionByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let ageGroups = list.map(obj => obj.ageGroup);
        ageGroups = _.uniq(ageGroups);

        const suppressionCategories = ['HVL', 'LVL', 'VL'];
        const data = [];
        for (const suppressionCategory of suppressionCategories) {
            let vlSuppression = 0;
            const catArray = [];
            for (const ageGroup of ageGroups) {
                const arrayFilter = list.filter(obj => obj.Last12MVLResult === suppressionCategory && obj.ageGroup === ageGroup);
                if (arrayFilter.length > 0) {
                    vlSuppression = arrayFilter[0].vlSuppression;
                } else {
                    vlSuppression = 0;
                }

                catArray.push(vlSuppression);
            }
            data.push(catArray);
        }

        return { ageGroups, data };
    }
);

export const getOtzVlSuppressionByAgeNotEnrolled = createSelector(
    [listUnfilteredNotEnrolled, listFilteredNotEnrolled, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let ageGroups = list.map((obj) => obj.ageGroup);
        ageGroups = _.uniq(ageGroups);

        const suppressionCategories = ['HVL', 'LVL', 'VL'];
        const data = [];
        for (const suppressionCategory of suppressionCategories) {
            let vlSuppression = 0;
            const catArray = [];
            for (const ageGroup of ageGroups) {
                const arrayFilter = list.filter(
                    (obj) =>
                        obj.Last12MVLResult === suppressionCategory &&
                        obj.ageGroup === ageGroup
                );
                if (arrayFilter.length > 0) {
                    vlSuppression = arrayFilter[0].vlSuppression;
                } else {
                    vlSuppression = 0;
                }

                catArray.push(vlSuppression);
            }
            data.push(catArray);
        }

        return { ageGroups, data };
    }
);
