import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtTrends.listUnfiltered;
const listFiltered = state => state.newOnArtTrends.listFiltered;
const listUnfilteredPositiveTrends = state => state.linkagePositiveTrends.listUnfiltered;
const listFilteredPositiveTrends = state => state.linkagePositiveTrends.listFiltered;
const filtered = state => state.filters.filtered;

export const getNewOnArtHtsPositive = createSelector(
    [listUnfiltered, listFiltered, listUnfilteredPositiveTrends, listFilteredPositiveTrends, filtered],
    (listUnfiltered, listFiltered, listUnfilteredPositiveTrends, listFilteredPositiveTrends, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listPositiveTrends = filtered ? listFilteredPositiveTrends : listUnfilteredPositiveTrends;
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };
        let months = [];
        let txNew = [];
        let positives = [];

        for(let i = 0; i < list.length; i++) {
            months.push(monthNames[list[i].month] + ' ' + list[i].year.toString());
            txNew.push(parseInt(list[i].txNew, 10));
            positives.push(0);
        }

        for(let i = 0; i < listPositiveTrends.length; i++) {
            let month = monthNames[listPositiveTrends[i].month] + ' ' + listPositiveTrends[i].year.toString();
            let monthIndex = months.indexOf(month);
            if(monthIndex === -1 ) {
                continue;
            }
            positives[monthIndex] = positives[monthIndex] + parseInt(listPositiveTrends[i].positive);
        }

        months = months.slice(Math.max(months.length - 12, 0));
        txNew = txNew.slice(Math.max(txNew.length - 12, 0));
        positives = positives.slice(Math.max(positives.length - 12, 0));
        
        return { months, txNew, positives };
    }
);
