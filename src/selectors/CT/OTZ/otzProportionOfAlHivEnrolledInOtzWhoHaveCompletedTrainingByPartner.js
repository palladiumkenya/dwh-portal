import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzProportionOfAlHivWhoHaveCompletedOtzTrainingByPartner.listFiltered;
const listUnfiltered = state => state.otzProportionOfAlHivWhoHaveCompletedOtzTrainingByPartner.listUnfiltered;
const listFilteredPartner = state => state.otzEnrollmentAmongAlhivOnArtByPartner.listFiltered;
const listUnfilteredPartner = state => state.otzEnrollmentAmongAlhivOnArtByPartner.listUnfiltered;

export const getProportionOfAlhivEnrolledInOtzWhoHaveCompletedTrainingByPartner = createSelector(
    [listUnfiltered, listUnfilteredPartner, listFiltered, listFilteredPartner, filtered],
    (listUnfiltered, listUnfilteredPartner, listFiltered, listFilteredPartner, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let listPartner = filtered ? listFilteredPartner : listUnfilteredPartner;

        const ArrayList = [];
        for (const listElement of list) {
            let percent = 0;
            const selectedPartner = listPartner.filter(obj => obj.partner === listElement.partner);
            if (selectedPartner.length > 0) {
                percent = ((listElement.count_training / selectedPartner[0].count_training) * 100);
            }
            ArrayList.push(
                {
                    count_training: listElement.count_training,
                    partner: listElement.partner,
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
