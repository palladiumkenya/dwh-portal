import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionBySex.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionBySex.listUnfiltered;
const listFilteredNotEnrolled = (state) =>
    state.otzVlSuppressionBySexNotEnrolled.listFiltered;
const listUnfilteredNotEnrolled = (state) =>
    state.otzVlSuppressionBySexNotEnrolled.listUnfiltered;

export const getOtzVlSuppressionBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        const suppressionCategories = ['LDL', 'Low Risk LLV', 'High Risk LLV '];
        const genders = ['Male','Female'];
        for (const suppressionCategory of suppressionCategories) {
            let vlSuppression = 0;
            const catArray = [];
            for (const gender of genders) {
                const arrayFilter = list.filter(obj => obj.Last12MVLResult === suppressionCategory && obj.Gender === gender);
                if (arrayFilter.length > 0) {
                    vlSuppression = arrayFilter[0].vlSuppression;
                } else {
                    vlSuppression = 0;
                }

                catArray.push(vlSuppression);
            }
            data.push(catArray);
        }

        return { genders, suppressionCategories, data };
    }
);

export const getOtzVlSuppressionBySexNotEnrolled = createSelector(
    [listUnfilteredNotEnrolled, listFilteredNotEnrolled, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        const suppressionCategories = ['LDL', 'Low Risk LLV', 'High Risk LLV '];
        const genders = ['Male', 'Female'];
        for (const suppressionCategory of suppressionCategories) {
            let vlSuppression = 0;
            const catArray = [];
            for (const gender of genders) {
                const arrayFilter = list.filter(
                    (obj) =>
                        obj.Last12MVLResult === suppressionCategory &&
                        obj.Gender === gender
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

        return { genders, suppressionCategories, data };
    }
);
