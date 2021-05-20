import { createSelector } from 'reselect';
import { formatNumber } from '../../../utils/utils';

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
            "Facility ART distribution Group",
            "Not Documented"
        ];

        console.log(list);
        let data = [];
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < models.length; j++) {
                if (list[i].differentiatedCare === models[j]) {
                    data.push(
                        {
                            name: models[j],
                            y: Math.round(list[i].Percentage),
                            text: ' (' + formatNumber(list[i].mmdModels) + ')',
                        }
                    );
                } else if (list[i].differentiatedCare === null && models[j] === "Not Documented") {
                    data.push(
                        {
                            name: "Not Documented",
                            y: Math.round(list[i].Percentage),
                            text: ' (' + formatNumber(list[i].mmdModels) + ')',
                        }
                    );
                }
            }
        }

        data.sort(function(a, b) {
            return b.y - a.y;
        });
        return { models, data };
    }
);
