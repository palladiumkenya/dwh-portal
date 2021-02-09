import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtOverview.listUnfiltered;
const listFiltered = state => state.newOnArtOverview.listFiltered;
const filtered = state => state.filters.filtered;

export const getNewOnArt = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.TotalStartedOnART ? list.TotalStartedOnART : 0;
    }
);

export const getNewOnArtMale = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.MalesStartedOnART ? list.MalesStartedOnART : 0;
    }
);

export const getNewOnArtFemale = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.FemalesStartedOnART ? list.FemalesStartedOnART : 0;
    }
);

export const getNewOnArtAdults = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.AdultsStartedOnART ? list.AdultsStartedOnART : 0;
    }
);

export const getNewOnArtAdolescents = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.AdolescentsStartedOnART ? list.AdolescentsStartedOnART : 0;
    }
);

export const getNewOnArtChildren = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.ChildrenStartedOnART ? list.ChildrenStartedOnART : 0;
    }
);
