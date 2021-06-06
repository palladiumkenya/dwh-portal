import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcServDistributionByPartner.listFiltered;
const listUnfiltered = state => state.ovcServDistributionByPartner.listUnfiltered;

export const getOvcServDistributionByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const arrayList = list.map(obj => ({
            y: Math.round(obj.Percentage),
            text: obj.count,
            partner: obj.partner,
        }));

        arrayList.sort((a, b) => {
            return b.y - a.y;
        });
        return arrayList;
    }
);
