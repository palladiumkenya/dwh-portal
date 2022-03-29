import { createSelector } from 'reselect';
import moment from 'moment';

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

        const today = new Date();
        let previousYearDate = moment(today).subtract(1, 'years').toDate();
        previousYearDate = moment(previousYearDate).add(1, 'month').toDate();
        while (previousYearDate <= today) {
            months.push(monthNames[previousYearDate.getMonth() + 1] + ' ' + previousYearDate.getFullYear());
            const filteredMonthYear = list.filter(obj => obj.month === (previousYearDate.getMonth() + 1) && obj.year === previousYearDate.getFullYear());
            if (filteredMonthYear.length > 0) {
                let totalTxNew = 0;
                for (const filteredMonthYearElement of filteredMonthYear) {
                    totalTxNew = totalTxNew + filteredMonthYearElement.txNew;
                }
                txNew.push(parseInt(totalTxNew.toString(), 10));
            }

            const filteredPositives = listPositiveTrends.filter(obj => obj.month === (previousYearDate.getMonth() + 1) && obj.year === previousYearDate.getFullYear());
            for (const filteredPositive of filteredPositives) {
                positives.push(parseInt(filteredPositive.positive.toString(), 10));
            }
            previousYearDate = moment(previousYearDate).add(1, 'month').toDate();
        }
        if (filtered) {
            months = []
            list.forEach(date => {
                months.push(monthNames[date.month] + ' ' + date.year)
            })
        }
        return { months, txNew, positives };
    }
);
