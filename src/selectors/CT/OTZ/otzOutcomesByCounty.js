import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesByCounty.listFiltered;
const listUnfiltered = state => state.otzOutcomesByCounty.listUnfiltered;

export const getOtzOutcomesByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let catCounties = list.map(obj => obj.County);
        catCounties = [...new Set(catCounties)];
        const categories = ['opt out of OTZ', 'Lost to follow up', 'DEAD', 'Transfer out', 'Transition to Adult Care', 'Active'];
        const ArrayValOptOut = [];
        const ArrayValLostToFollowUp = [];
        const ArrayValDead = [];
        const ArrayValTransferOut = [];
        const ArrayValTransitionToAdultCare = [];
        const ArrayValActive = [];
        for (const category of categories) {
            for (const catCounty of catCounties) {
                const catFilterYear = list.filter(obj => obj.County === catCounty && obj.Outcome.toUpperCase() === category.toUpperCase());
                if (category === 'opt out of OTZ') {
                    if (catFilterYear.length > 0) {
                        ArrayValOptOut.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValOptOut.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }

                if (category === 'Lost to follow up') {
                    if (catFilterYear.length > 0) {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }

                if (category === 'DEAD') {
                    if (catFilterYear.length > 0) {
                        ArrayValDead.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValDead.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }

                if (category === 'Transfer out') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransferOut.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValTransferOut.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }

                if (category === 'Transition to Adult Care') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }

                if (category === 'Active') {
                    if (catFilterYear.length > 0) {
                        ArrayValActive.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValActive.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }
            }
        }

        return { catCounties, ArrayValOptOut, ArrayValLostToFollowUp, ArrayValDead, ArrayValTransferOut, ArrayValTransitionToAdultCare, ArrayValActive };
    }
);


