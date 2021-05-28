import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzProportionOfAlHivWhoHaveCompletedOtzTrainingByCounty.listFiltered;
const listUnfiltered = state => state.otzProportionOfAlHivWhoHaveCompletedOtzTrainingByCounty.listUnfiltered;

export const getProportionOfAlhivEnrolledInOtzWhoHaveCompletedTrainingByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;

        list = list.map(val => ({
            count_training: val.count_training,
            partner: val.partner,
            proportion_training_percent: Math.round(val.proportion_training_percent)
        }));

        list.sort((a, b) => {
            return b.proportion_training_percent - a.proportion_training_percent;
        });

        return list;
    }
);
