import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.treatmentOutcomesByYear.listUnfiltered;
const listFiltered = state => state.treatmentOutcomesByYear.listFiltered;
const filtered = state => state.filters.filtered;

export const getTreatmentOutcomesByYear = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const treatmentOutcomesCategories =
            ['ACTIVE', 'DEAD', 'LOSS TO FOLLOW UP', 'STOPPED', 'TRANSFERRED OUT'];
        const yearCategories = _.chain(list).map(l => parseInt(l.year)).filter(l => l >= 2011).uniq().sort().value();
        let data = [];
        for(let i = 0; i < treatmentOutcomesCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < yearCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let treatmentOutcomesIndex = treatmentOutcomesCategories.indexOf(list[i].artOutcome);
            let yearIndex = yearCategories.indexOf(list[i].year);
            if(treatmentOutcomesIndex === -1 || yearIndex === -1 ) { // unsupported
                continue;
            }
            data[treatmentOutcomesIndex][yearIndex] += parseInt(list[i].totalOutcomes);
        }
        return { yearCategories, data };
    }
);
