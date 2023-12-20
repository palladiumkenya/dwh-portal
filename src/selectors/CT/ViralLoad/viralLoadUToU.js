import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadUptakeUToU.listUnfiltered;
const listFiltered = (state) => state.viralLoadUptakeUToU.listFiltered;
const listCatUnfiltered = (state) => state.viralLoadCategorizationUToU.listUnfiltered;
const listCatFiltered = (state) => state.viralLoadCategorizationUToU.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadUptakeUToU = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);

export const getViralLoadCategorizationUToU = createSelector(
    [listCatUnfiltered, listCatFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return [
            list.find((cat) => cat.ValidVLResultCategory === '<50')?.data,
            list.find((cat) => cat.ValidVLResultCategory === '51-199')?.data,
            list.find((cat) => cat.ValidVLResultCategory === '200-999')?.data,
            list.find((cat) => cat.ValidVLResultCategory === '>1000')?.data,
        ];

    }
);
