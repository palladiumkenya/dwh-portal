import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesByYearOfArtStart.listFiltered;
const listUnfiltered = state => state.otzOutcomesByYearOfArtStart.listUnfiltered;

export const getOtzOutcomesByYearOfArtStart = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        list.sort((a, b) => {
            return a.OTZStart_Year - b.OTZStart_Year;
        });
        const catYears =[...new Set( list.map(obj => obj.OTZStart_Year))];
        // console.log( [...new Set(catYears)]);
        const categories = ['opt out of OTZ', 'Lost to follow up', 'DEAD', 'Transfer out', 'Transition to Adult Care', 'Active'];
        const ArrayValOptOut = [];
        const ArrayValLostToFollowUp = [];
        const ArrayValDead = [];
        const ArrayValTransferOut = [];
        const ArrayValTransitionToAdultCare = [];
        const ArrayValActive = [];
        for (const category of categories) {
            for (const catYear of catYears) {
                const catFilterYear = list.filter(obj => obj.OTZStart_Year === catYear && obj.Outcome.toUpperCase() === category.toUpperCase());
                if (category === 'opt out of OTZ') {
                    if (catFilterYear.length > 0) {
                        ArrayValOptOut.push({
                            category,
                            y: catFilterYear[0].outcomesByYearOfArtStart,
                            catYear
                        });
                    } else {
                        ArrayValOptOut.push({
                            category,
                            y: 0,
                            catYear
                        });
                    }
                }

                if (category === 'Lost to follow up') {
                    if (catFilterYear.length > 0) {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: catFilterYear[0].outcomesByYearOfArtStart,
                            catYear
                        });
                    } else {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: 0,
                            catYear
                        });
                    }
                }

                if (category === 'DEAD') {
                    if (catFilterYear.length > 0) {
                        ArrayValDead.push({
                            category,
                            y: catFilterYear[0].outcomesByYearOfArtStart,
                            catYear
                        });
                    } else {
                        ArrayValDead.push({
                            category,
                            y: 0,
                            catYear
                        });
                    }
                }

                if (category === 'Transfer out') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransferOut.push({
                            category,
                            y: catFilterYear[0].outcomesByYearOfArtStart,
                            catYear
                        });
                    } else {
                        ArrayValTransferOut.push({
                            category,
                            y: 0,
                            catYear
                        });
                    }
                }

                if (category === 'Transition to Adult Care') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: catFilterYear[0].outcomesByYearOfArtStart,
                            catYear
                        });
                    } else {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: 0,
                            catYear
                        });
                    }
                }

                if (category === 'Active') {
                    if (catFilterYear.length > 0) {
                        ArrayValActive.push({
                            category,
                            y: catFilterYear[0].outcomesByYearOfArtStart,
                            catYear
                        });
                    } else {
                        ArrayValActive.push({
                            category,
                            y: 0,
                            catYear
                        });
                    }
                }
            }
        }

        return { catYears, ArrayValOptOut, ArrayValLostToFollowUp, ArrayValDead, ArrayValTransferOut, ArrayValTransitionToAdultCare, ArrayValActive };
    }
);


