import { createSelector } from 'reselect';

const listUnFiltered = (state) =>
    state.adverseEventsProportionOfPlHivAeRelatedToArtDrugs.listUnfiltered;
const listFiltered = (state) =>
    state.adverseEventsProportionOfPlHivAeRelatedToArtDrugs.listFiltered;
const filtered = (state) => state.filters.filtered;

export const getProportionOfPLHIVAeRelatedToArtDrugs = createSelector(
    [listUnFiltered, listFiltered, filtered],
    (listUnFiltered, listFiltered, filtered) => {
        listFiltered = listFiltered.filter(function (item) {
            return !['Stavudine', 'Didanosin'].includes(item.adverseEventCause);
        });
        listUnFiltered = listUnFiltered.filter(function (item) {
            return !['Stavudine', 'Didanosin'].includes(item.adverseEventCause);
        });

        return filtered ? listFiltered : listUnFiltered;
    }
);
