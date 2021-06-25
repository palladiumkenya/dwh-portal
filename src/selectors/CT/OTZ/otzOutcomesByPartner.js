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
        const categories = ['opt out of OTZ', 'Lost to follow up', 'DEAD', 'Transfer out', 'Transition to Adult Care', 'Active'];
        const ArrayValOptOut = [];
        const ArrayValLostToFollowUp = [];
        const ArrayValDead = [];
        const ArrayValTransferOut = [];
        const ArrayValTransitionToAdultCare = [];
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

                if (category === 'Lost to follow up') {
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

                if (category === 'DEAD') {
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
            }
        }

        return { catPartners, ArrayValOptOut, ArrayValLostToFollowUp, ArrayValDead, ArrayValTransferOut, ArrayValTransitionToAdultCare };
    }
);


