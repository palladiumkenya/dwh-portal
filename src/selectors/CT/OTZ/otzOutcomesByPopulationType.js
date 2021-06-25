import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesByPopulationType.listFiltered;
const listUnfiltered = state => state.otzOutcomesByPopulationType.listUnfiltered;

export const getOtzOutcomesByPopulationType = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const categories = ['opt out of OTZ', 'Lost to follow up', 'DEAD', 'Transfer out', 'Transition to Adult Care', 'Active'];
        const ArrayValOptOut = [];
        const ArrayValLostToFollowUp = [];
        const ArrayValDead = [];
        const ArrayValTransferOut = [];
        const ArrayValTransitionToAdultCare = [];
        for (const category of categories) {
            const catFilterGeneral = list.filter(obj => obj.Outcome.toUpperCase() === category.toUpperCase() && obj.PopulationType === 'General Population');
            const catFilterKeyPop = list.filter(obj => obj.Outcome.toUpperCase() === category.toUpperCase() && obj.PopulationType === 'Key Population');

            if (category === 'opt out of OTZ') {
                if (catFilterGeneral.length > 0) {
                    ArrayValOptOut.push({
                        category,
                        y: catFilterGeneral[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValOptOut.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterKeyPop.length > 0) {
                    ArrayValOptOut.push({
                        category,
                        y: catFilterKeyPop[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValOptOut.push({
                        category,
                        y: 0,
                    });
                }
            }

            if (category === 'Lost to follow up') {
                if (catFilterGeneral.length > 0) {
                    ArrayValLostToFollowUp.push({
                        category,
                        y: catFilterGeneral[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValLostToFollowUp.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterKeyPop.length > 0) {
                    ArrayValLostToFollowUp.push({
                        category,
                        y: catFilterKeyPop[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValLostToFollowUp.push({
                        category,
                        y: 0,
                    });
                }
            }

            if (category === 'DEAD') {
                if (catFilterGeneral.length > 0) {
                    ArrayValDead.push({
                        category,
                        y: catFilterGeneral[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValDead.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterKeyPop.length > 0) {
                    ArrayValDead.push({
                        category,
                        y: catFilterKeyPop[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValDead.push({
                        category,
                        y: 0,
                    });
                }
            }

            if (category === 'Transfer out') {
                if (catFilterGeneral.length > 0) {
                    ArrayValTransferOut.push({
                        category,
                        y: catFilterGeneral[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValTransferOut.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterKeyPop.length > 0) {
                    ArrayValTransferOut.push({
                        category,
                        y: catFilterKeyPop[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValTransferOut.push({
                        category,
                        y: 0,
                    });
                }
            }

            if (category === 'Transition to Adult Care') {
                if (catFilterGeneral.length > 0) {
                    ArrayValTransitionToAdultCare.push({
                        category,
                        y: catFilterGeneral[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValTransitionToAdultCare.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterKeyPop.length > 0) {
                    ArrayValTransitionToAdultCare.push({
                        category,
                        y: catFilterKeyPop[0].outcomesByPopulationType,
                    });
                } else {
                    ArrayValTransitionToAdultCare.push({
                        category,
                        y: 0,
                    });
                }
            }
        }

        return { ArrayValOptOut, ArrayValLostToFollowUp, ArrayValDead, ArrayValTransferOut, ArrayValTransitionToAdultCare };
    }
);


