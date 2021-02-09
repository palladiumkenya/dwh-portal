import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdStableMmdModels.listUnfiltered;
const listFiltered = state => state.dsdStableMmdModels.listFiltered;
const filtered = state => state.filters.filtered;

export const getStableMmdModels = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const models = [
            "Standard Care",
            "Fast Track",
            "Community ART Distribution HCW Led",
            "Community ART Distribution peer led",
            "Facility ART distribution Group"
        ];
        let data = [0, 0, 0, 0, 0];
        for(let i = 0; i < list.length; i++) {
            for(let j = 0; j < models.length; j++) {
                if (list[i].differentiatedCare === models[j]) {
                    data[j] = data[j] + parseInt(list[i].mmdModels);
                }
            }
        }

        return { models, data };
    }
);