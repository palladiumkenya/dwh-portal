import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcClientsExitReasons.listFiltered;
const listUnfiltered = state => state.ovcClientsExitReasons.listUnfiltered;

export const getOvcClientExitReasons = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const arrayList = list.map(obj => ({
            OVCExitReason: obj.OVCExitReason,
            y: Math.round(obj.Percentage),
            text: obj.count
        }));

        arrayList.sort((a, b) => {
            return b.y - a.y;
        });
        return arrayList;
    }
);
