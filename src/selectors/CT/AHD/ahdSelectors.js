import { createSelector } from 'reselect';

const listUnfiltered = state => state.ahdScreening.listUnfiltered;
const listFiltered = state => state.ahdScreening.listFiltered;

const listUnfilteredOutcomes = state => state.ahdOutcomes.listUnfiltered;
const listFilteredOutcomes = state => state.ahdOutcomes.listFiltered;

const listUnfilteredNutrition = state => state.ahdNutritionAssessment.listUnfiltered;
const listFilteredNutrition = state => state.ahdNutritionAssessment.listFiltered;

const filtered = state => state.filters.filtered;


export const getAHDIndicators = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {

        return filtered ? listFiltered : listUnfiltered;
    }
)

export const getAHDOutcomes = createSelector(
    [listUnfilteredOutcomes, listFilteredOutcomes, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        let data = filtered ? listFiltered : listUnfiltered

        return data.map((item)=> {
                    return {
                        y: item.AHDOutcomes ?? '',
                        name: item.ARTOutcomeDescription ?? 0
                    }
                });
    }
)

export const getAHDNutritionAssessment = createSelector(
    [listUnfilteredNutrition, listFilteredNutrition, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        console.log(listUnfiltered)
        console.log(listUnfiltered, listFiltered)
        return filtered ? listFiltered : listUnfiltered;
    }
)
