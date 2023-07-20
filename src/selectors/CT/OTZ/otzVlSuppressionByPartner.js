import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionByPartner.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionByPartner.listUnfiltered;
const listFilteredNotEnrolled = (state) =>
    state.otzVlSuppressionByPartnerNotEnrolled.listFiltered;
const listUnfilteredNotEnrolled = (state) =>
    state.otzVlSuppressionByPartnerNotEnrolled.listUnfiltered;

export const getOtzVlSuppressionByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        const suppressionCategories = ['LDL', 'Low Risk LLV', 'High Risk LLV '];
        let partners = list.map(obj => obj ? obj.CTPartner.toUpperCase() : '');
        partners = _.uniq(partners);
        let build_list = [];
        partners.forEach((c) => {
            let partner_data = list.filter(
                (x) => x.CTPartner.toUpperCase() === c
            );
            let partner_data_vl = partner_data.filter(
                (x) => x.Last12MVLResult.toUpperCase() === 'LDL'
            );
            let sum = partner_data.reduce(
                (n, { vlSuppression }) => n + vlSuppression,
                0
            );
            let perc = (partner_data_vl[0]?.vlSuppression * 100) / sum;
            partner_data.forEach((c) => (c.perc = perc));
            build_list.push(...partner_data);
            build_list.sort((b, a) => a.perc - b.perc);
        });

        partners = build_list.map((obj) =>
            obj && obj.CTPartner ? obj.CTPartner.toUpperCase() : ''
        );
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

export const getOtzVlSuppressionByPartnerNotEnrolled = createSelector(
    [listUnfilteredNotEnrolled, listFilteredNotEnrolled, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        const suppressionCategories = ['LDL', 'Low Risk LLV', 'High Risk LLV '];
        let partners = list.map(obj => obj ? obj.CTPartner.toUpperCase() : '');
        partners = _.uniq(partners);
        let build_list = [];
        partners.forEach((c) => {
            let partner_data = list.filter(
                (x) => x.CTPartner.toUpperCase() === c
            );
            let partner_data_vl = partner_data.filter(
                (x) => x.Last12MVLResult.toUpperCase() === 'LDL'
            );
            let sum = partner_data.reduce(
                (n, { vlSuppression }) => n + vlSuppression,
                0
            );
            let perc = (partner_data_vl[0]?.vlSuppression * 100) / sum;
            partner_data.forEach((c) => (c.perc = perc));
            build_list.push(...partner_data);
            build_list.sort((b, a) => a.perc - b.perc);
        });

        partners = build_list.map((obj) =>
            obj && obj.CTPartner ? obj.CTPartner.toUpperCase() : ''
        );
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
