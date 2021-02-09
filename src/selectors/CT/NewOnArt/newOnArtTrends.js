import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtTrends.listUnfiltered;
const listFiltered = state => state.newOnArtTrends.listFiltered;
const filtered = state => state.filters.filtered;

export const getNewOnArtTrends = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };
        let months = [];
        let txNew = [];

        for(let i = 0; i < list.length; i++) {
            months.push(monthNames[list[i].month] + ' ' + list[i].year.toString());
            txNew.push(parseInt(list[i].txNew, 10));
        }

        months = months.slice(Math.max(months.length - 12, 0));
        txNew = txNew.slice(Math.max(txNew.length - 12, 0));
        
        return { months, txNew };
    }
);
