import { createSelector } from 'reselect';

const listUnfiltered = state => state.linkagePositiveTrends.listUnfiltered;
const listFiltered = state => state.linkagePositiveTrends.listFiltered;
const filtered = state => state.filters.filtered;

export const getLinkagePositiveTrends = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };
        let months = [];
        let positives = [];

        for(let i = 0; i < list.length; i++) {
            months.push(monthNames[list[i].month] + ' ' + list[i].year.toString());
            positives.push(parseInt(list[i].positive, 10));
        }

        months = months.slice(Math.max(months.length - 12, 0));
        positives = positives.slice(Math.max(positives.length - 12, 0));
        
        return { months, positives };
    }
);
