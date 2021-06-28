import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesByAgeGroup.listFiltered;
const listUnfiltered = state => state.otzOutcomesByAgeGroup.listUnfiltered;

export const getOtzOutcomesByAgeGroup = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let catAgeGroups = list.map(obj => obj.AgeGroup);
        catAgeGroups = _.uniq(catAgeGroups);
        const categories = ['opt out of OTZ', 'Lost to follow up', 'DEAD', 'Transfer out', 'Transition to Adult Care', 'Active'];
        const ArrayValOptOut = [];
        const ArrayValLostToFollowUp = [];
        const ArrayValDead = [];
        const ArrayValTransferOut = [];
        const ArrayValTransitionToAdultCare = [];
        const ArrayValActive = [];
        for (const category of categories) {
            for (const ageGroup of catAgeGroups) {
                const catFilterYear = list.filter(obj => obj.AgeGroup === ageGroup && obj.Outcome.toUpperCase() === category.toUpperCase());
                if (category === 'opt out of OTZ') {
                    if (catFilterYear.length > 0) {
                        ArrayValOptOut.push({
                            category,
                            y: catFilterYear[0].outcomesByAgeGroup,
                            ageGroup
                        });
                    } else {
                        ArrayValOptOut.push({
                            category,
                            y: 0,
                            ageGroup
                        });
                    }
                }

                if (category === 'Lost to follow up') {
                    if (catFilterYear.length > 0) {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: catFilterYear[0].outcomesByAgeGroup,
                            ageGroup
                        });
                    } else {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: 0,
                            ageGroup
                        });
                    }
                }

                if (category === 'DEAD') {
                    if (catFilterYear.length > 0) {
                        ArrayValDead.push({
                            category,
                            y: catFilterYear[0].outcomesByAgeGroup,
                            ageGroup
                        });
                    } else {
                        ArrayValDead.push({
                            category,
                            y: 0,
                            ageGroup
                        });
                    }
                }

                if (category === 'Transfer out') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransferOut.push({
                            category,
                            y: catFilterYear[0].outcomesByAgeGroup,
                            ageGroup
                        });
                    } else {
                        ArrayValTransferOut.push({
                            category,
                            y: 0,
                            ageGroup
                        });
                    }
                }

                if (category === 'Transition to Adult Care') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: catFilterYear[0].outcomesByAgeGroup,
                            ageGroup
                        });
                    } else {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: 0,
                            ageGroup
                        });
                    }
                }

                if (category === 'Active') {
                    if (catFilterYear.length > 0) {
                        ArrayValActive.push({
                            category,
                            y: catFilterYear[0].outcomesByAgeGroup,
                            ageGroup
                        });
                    } else {
                        ArrayValActive.push({
                            category,
                            y: 0,
                            ageGroup
                        });
                    }
                }
            }
        }

        return { catAgeGroups, ArrayValOptOut, ArrayValLostToFollowUp, ArrayValDead, ArrayValTransferOut, ArrayValTransitionToAdultCare, ArrayValActive };
    }
);
