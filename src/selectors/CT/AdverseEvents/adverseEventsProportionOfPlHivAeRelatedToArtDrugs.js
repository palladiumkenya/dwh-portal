import { createSelector } from 'reselect';

const listUnFiltered = state => state.adverseEventsProportionOfPlHivAeRelatedToArtDrugs.listUnfiltered;
const listFiltered = state => state.adverseEventsProportionOfPlHivAeRelatedToArtDrugs.listFiltered;
const filtered = state => state.filters.filtered;

export const getProportionOfPLHIVAeRelatedToArtDrugs = createSelector(
    [listUnFiltered, listFiltered, filtered],
    (listUnFiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnFiltered;
    }
);
