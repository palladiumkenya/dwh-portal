import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesByPartner.listFiltered;
const listUnfiltered = state => state.otzOutcomesByPartner.listUnfiltered;

export const getOtzOutcomesByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let catPartners = list.map(obj => obj.partner);
        catPartners = [...new Set(catPartners)];
        let build_list = [];
        catPartners.forEach((c) => {
            let partner_data = list.filter(
                (x) => x.partner.toUpperCase() === c.toUpperCase()
            );
            let partner_data_to = partner_data.filter(
                (x) => x.Outcome.toUpperCase() === 'TRANSFER OUT'
            );
            let sum = partner_data.reduce(
                (n, { outcomesByPartner }) => n + outcomesByPartner,
                0
            );
            let perc = (partner_data_to[0]?.outcomesByPartner ?? 0 )*100 / sum;
            partner_data.forEach((c) => (c.perc = perc));
            build_list.push(...partner_data);
            build_list.sort((b, a) => a.perc - b.perc);
        });

        catPartners = build_list.map((obj) => obj.partner);
        catPartners = [...new Set(catPartners)];
        const categories = [
            'opt out of OTZ',
            'LTFU',
            'Died',
            'Transfer out',
            'Transition to Adult Care',
            'Active',
        ];
        const ArrayValOptOut = [];
        const ArrayValLostToFollowUp = [];
        const ArrayValDead = [];
        const ArrayValTransferOut = [];
        const ArrayValTransitionToAdultCare = [];
        const ArrayValActive = [];

        for (const category of categories) {
            for (const catPartner of catPartners) {
                const catFilterYear = list.filter(obj => obj.partner === catPartner && obj.Outcome.toUpperCase() === category.toUpperCase());
                if (category === 'opt out of OTZ') {
                    if (catFilterYear.length > 0) {
                        ArrayValOptOut.push({
                            category,
                            y: catFilterYear[0].outcomesByPartner,
                            catPartner
                        });
                    } else {
                        ArrayValOptOut.push({
                            category,
                            y: 0,
                            catPartner
                        });
                    }
                }

                if (category === 'LTFU') {
                    if (catFilterYear.length > 0) {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: catFilterYear[0].outcomesByPartner,
                            catPartner
                        });
                    } else {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: 0,
                            catPartner
                        });
                    }
                }

                if (category === 'Died') {
                    if (catFilterYear.length > 0) {
                        ArrayValDead.push({
                            category,
                            y: catFilterYear[0].outcomesByPartner,
                            catPartner
                        });
                    } else {
                        ArrayValDead.push({
                            category,
                            y: 0,
                            catPartner
                        });
                    }
                }

                if (category === 'Transfer out') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransferOut.push({
                            category,
                            y: catFilterYear[0].outcomesByPartner,
                            catPartner
                        });
                    } else {
                        ArrayValTransferOut.push({
                            category,
                            y: 0,
                            catPartner
                        });
                    }
                }

                if (category === 'Transition to Adult Care') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: catFilterYear[0].outcomesByPartner,
                            catPartner
                        });
                    } else {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: 0,
                            catPartner
                        });
                    }
                }

                if (category === 'Active') {
                    if (catFilterYear.length > 0) {
                        ArrayValActive.push({
                            category,
                            y: catFilterYear[0].outcomesByPartner,
                            catPartner
                        });
                    } else {
                        ArrayValActive.push({
                            category,
                            y: 0,
                            catPartner
                        });
                    }
                }
            }
        }

        return { catPartners, ArrayValOptOut, ArrayValLostToFollowUp, ArrayValDead, ArrayValTransferOut, ArrayValTransitionToAdultCare, ArrayValActive };
    }
);


