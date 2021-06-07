import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcServDistributionByCounty.listFiltered;
const listUnfiltered = state => state.ovcServDistributionByCounty.listUnfiltered;

export const getOvcServDistributionByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const arrayList = list.map(obj => ({
            County: obj.County,
            y: Math.round(obj.Percentage),
            text: obj.count
        }));

        arrayList.sort((a, b) => {
            return b.y - a.y;
        });
        return arrayList;
    }
);
