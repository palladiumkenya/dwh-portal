import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionByCounty.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionByCounty.listUnfiltered;
const listFilteredNotEnrolled = (state) =>
    state.otzVlSuppressionByCountyNotEnrolled.listFiltered;
const listUnfilteredNotEnrolled = (state) =>
    state.otzVlSuppressionByCountyNotEnrolled.listUnfiltered;

export const getOtzVlSuppressionByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        const suppressionCategories = ['LDL', 'Low Risk LLV', 'High Risk LLV '];
        let counties = list.map(obj => (obj && obj.County) ? obj.County.toUpperCase() : "");
        counties = _.uniq(counties);
        let build_list = [];
        counties.forEach((c) => {
            let county_data = list.filter((x) => x.County.toUpperCase() === c);
            let county_data_vl = county_data.filter(
                (x) => x.Last12MVLResult.toUpperCase() === 'LDL'
            );
            let sum = county_data.reduce(
                (n, { vlSuppression }) => n + vlSuppression,
                0
            );
            let perc = (county_data_vl[0]?.vlSuppression * 100) / sum;
            county_data.forEach((c) => (c.perc = perc));
            build_list.push(...county_data);
            build_list.sort((b, a) => a.perc - b.perc);
        });

        counties = build_list.map((obj) =>
            obj && obj.County ? obj.County.toUpperCase() : ''
        );
        counties = _.uniq(counties);

        for (const suppressionCategory of suppressionCategories) {
            let vlSuppression = 0;
            const catArray = [];
            for (const county of counties) {
                const arrayFilter = list.filter(obj => obj.Last12MVLResult === suppressionCategory && ((obj && obj.County) ? obj.County.toUpperCase() : "") === county);
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

export const getOtzVlSuppressionByCountyNotEnrolled = createSelector(
    [listUnfilteredNotEnrolled, listFilteredNotEnrolled, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        let build_list = []
        const suppressionCategories = ['LDL', 'Low Risk LLV', 'High Risk LLV '];
        let counties = list.map(obj => (obj && obj.County) ? obj.County.toUpperCase() : "");
        counties = _.uniq(counties);
        counties.forEach(c => {
            let county_data = list.filter((x) => x.County.toUpperCase() === c);
            let county_data_vl = county_data.filter(
                (x) => x.Last12MVLResult.toUpperCase() === 'LDL'
            );
            let sum = county_data.reduce(
                (n, { vlSuppression }) => n + vlSuppression,
                0
            );
            let perc = (county_data_vl[0]?.vlSuppression * 100) / sum;
            county_data.forEach((c) => (c.perc = perc));
            build_list.push(...county_data);
            build_list.sort((b, a) => a.perc - b.perc);
        });

        counties = build_list.map((obj) =>
            obj && obj.County ? obj.County.toUpperCase() : ''
        );
        counties = _.uniq(counties);
        

        for (const suppressionCategory of suppressionCategories) {
            let sum = 0;
            let vlSuppression = 0;
            const catArray = [];
            for (const county of counties) {
                const arrayFilter = list.filter(obj => obj.Last12MVLResult === suppressionCategory && ((obj && obj.County) ? obj.County.toUpperCase() : "") === county);
                if (arrayFilter.length > 0) {
                    vlSuppression = arrayFilter[0].vlSuppression;

                } else {
                    vlSuppression = 0;
                }
                sum+= vlSuppression
                catArray.push(vlSuppression);
            }
            data.push(catArray);
        }

        return { counties, data };
    }
);
