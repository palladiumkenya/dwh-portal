import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzProportionOfAlHivWhoHaveCompletedOtzTrainingByCounty.listFiltered;
const listUnfiltered = state => state.otzProportionOfAlHivWhoHaveCompletedOtzTrainingByCounty.listUnfiltered;

export const getProportionOfAlhivEnrolledInOtzWhoHaveCompletedTrainingByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        console.log(list);

        list.sort((a, b) => {
            return b.proportion_training_percent - a.proportion_training_percent;
        });

        return list;
    }
);
