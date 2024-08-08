import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzProportionOfAlHivWhoHaveCompletedOtzTrainingByCounty.listFiltered;
const listUnfiltered = state => state.otzProportionOfAlHivWhoHaveCompletedOtzTrainingByCounty.listUnfiltered;
const listFilteredCounty = state => state.otzEnrollmentAmongAlhivOnArtByCounty.listFiltered;
const listUnfilteredCounty = state => state.otzEnrollmentAmongAlhivOnArtByCounty.listUnfiltered;

export const getProportionOfAlhivEnrolledInOtzWhoHaveCompletedTrainingByCounty = createSelector(
    [listUnfiltered, listUnfilteredCounty, listFiltered, listFilteredCounty, filtered],
    (listUnfiltered, listUnfilteredCounty, listFiltered, listFilteredCounty, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let listCounty = filtered ? listFilteredCounty : listUnfilteredCounty;

        const ArrayList = [];
        for (const listElement of list) {
            let percent = 0;
            const selectedCounty = listCounty.filter(obj => obj.County === listElement.County);
            if (selectedCounty.length > 0) {
                percent = ((listElement.count_training / selectedCounty[0].alhiv) * 100);
            }
            ArrayList.push(
                {
                    count_training: listElement.count_training,
                    County: listElement.County,
                    y: Math.round((percent + Number.EPSILON) * 100) / 100,
                    text: listElement.count_training
                }
            );
        }

        ArrayList.sort((a, b) => {
            return b.y - a.y;
        });

        return ArrayList;
    }
);
