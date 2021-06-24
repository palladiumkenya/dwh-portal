import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesByGender.listFiltered;
const listUnfiltered = state => state.otzOutcomesByGender.listUnfiltered;

export const getOtzOutcomesByGender = createSelector(
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
            const catFilterMale = list.filter(obj => obj.Outcome.toUpperCase() === category.toUpperCase() && obj.Gender === 'Male');
            const catFilterFeMale = list.filter(obj => obj.Outcome.toUpperCase() === category.toUpperCase() && obj.Gender === 'Female');

            if (category === 'opt out of OTZ') {
                if (catFilterMale.length > 0) {
                    ArrayValOptOut.push({
                        category,
                        y: catFilterMale[0].outcomesByGender,
                    });
                } else {
                    ArrayValOptOut.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterFeMale.length > 0) {
                    ArrayValOptOut.push({
                        category,
                        y: catFilterFeMale[0].outcomesByGender,
                    });
                } else {
                    ArrayValOptOut.push({
                        category,
                        y: 0,
                    });
                }
            }

            if (category === 'Lost to follow up') {
                if (catFilterMale.length > 0) {
                    ArrayValLostToFollowUp.push({
                        category,
                        y: catFilterMale[0].outcomesByGender,
                    });
                } else {
                    ArrayValLostToFollowUp.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterFeMale.length > 0) {
                    ArrayValLostToFollowUp.push({
                        category,
                        y: catFilterFeMale[0].outcomesByGender,
                    });
                } else {
                    ArrayValLostToFollowUp.push({
                        category,
                        y: 0,
                    });
                }
            }

            if (category === 'DEAD') {
                if (catFilterMale.length > 0) {
                    ArrayValDead.push({
                        category,
                        y: catFilterMale[0].outcomesByGender,
                    });
                } else {
                    ArrayValDead.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterFeMale.length > 0) {
                    ArrayValDead.push({
                        category,
                        y: catFilterFeMale[0].outcomesByGender,
                    });
                } else {
                    ArrayValDead.push({
                        category,
                        y: 0,
                    });
                }
            }

            if (category === 'Transfer out') {
                if (catFilterMale.length > 0) {
                    ArrayValTransferOut.push({
                        category,
                        y: catFilterMale[0].outcomesByGender,
                    });
                } else {
                    ArrayValTransferOut.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterFeMale.length > 0) {
                    ArrayValTransferOut.push({
                        category,
                        y: catFilterFeMale[0].outcomesByGender,
                    });
                } else {
                    ArrayValTransferOut.push({
                        category,
                        y: 0,
                    });
                }
            }

            if (category === 'Transition to Adult Care') {
                if (catFilterMale.length > 0) {
                    ArrayValTransitionToAdultCare.push({
                        category,
                        y: catFilterMale[0].outcomesByGender,
                    });
                } else {
                    ArrayValTransitionToAdultCare.push({
                        category,
                        y: 0,
                    });
                }

                if (catFilterFeMale.length > 0) {
                    ArrayValTransitionToAdultCare.push({
                        category,
                        y: catFilterFeMale[0].outcomesByGender,
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


