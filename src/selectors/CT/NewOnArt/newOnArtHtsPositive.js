import { createSelector } from 'reselect';
import moment from 'moment';
import _ from 'lodash'

const listUnfiltered = (state) => state.newOnArtTrends.listUnfiltered;
const listFiltered = (state) => state.newOnArtTrends.listFiltered;
const listUnfilteredPositiveTrends = (state) =>
    state.linkagePositiveTrends.listUnfiltered;
const listFilteredPositiveTrends = (state) =>
    state.linkagePositiveTrends.listFiltered;
const filtered = (state) => state.filters.filtered;

export const getNewOnArtHtsPositive = createSelector(
    [
        listUnfiltered,
        listFiltered,
        listUnfilteredPositiveTrends,
        listFilteredPositiveTrends,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        listUnfilteredPositiveTrends,
        listFilteredPositiveTrends,
        filtered
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listPositiveTrends = filtered
            ? listFilteredPositiveTrends
            : listUnfilteredPositiveTrends;
        const monthNames = {
            1: 'JANUARY',
            2: 'FEBRUARY',
            3: 'MARCH',
            4: 'APRIL',
            5: 'MAY',
            6: 'JUNE',
            7: 'JULY',
            8: 'AUGUST',
            9: 'SEPTEMBER',
            10: 'OCTOBER',
            11: 'NOVEMBER',
            12: 'DECEMBER',
        };
        let months = [];
        let txNew = [];
        let positives = [];

        const today = moment().subtract(2, 'month').add(16, 'days');
        let previousYearDate = moment(today).subtract(1, 'years').toDate();
        previousYearDate = moment(previousYearDate).add(1, 'month').toDate();

        // combining the 2 lists where Report month year match
        let data = list.map(item => {
            let positive =
                listPositiveTrends.find(
                    ({ year, month }) =>
                        year == item.year && month == item.month
                )?.positive ?? 0;
            let txNew = list.filter(
                    ({ year, month }) =>
                        year == item.year && month == item.month
                ).reduce(function (prev, cur) {
                return prev + cur.txNew;
            }, 0);
            
            return { year: item.year, month: item.month, txNew, positive}
        })
        data.reverse()
        data = _.uniqWith(data, _.isEqual);
        // minimizing the data
        // only getting the last 12 data for initial load
        if (data.length >= 12) data.length = 12;
        
        while (previousYearDate <= today) {
            months.push(
                monthNames[previousYearDate.getMonth() + 1] +
                    ' ' +
                    previousYearDate.getFullYear()
            );
            const filteredMonthYear = data.filter(
                (obj) =>
                    obj.month === previousYearDate.getMonth() + 1 &&
                    obj.year === previousYearDate.getFullYear()
            );
            if (filteredMonthYear.length > 0) {
                let totalTxNew = 0;
                let totalPos = 0;
                for (const filteredMonthYearElement of filteredMonthYear) {
                    totalTxNew = totalTxNew + filteredMonthYearElement.txNew;
                    totalPos += parseInt(filteredMonthYearElement.positive);
                }
                txNew.push(parseInt(totalTxNew.toString(), 10));
                positives.push(parseInt(totalPos.toString(), 10));
            }

            previousYearDate = moment(previousYearDate)
                .add(1, 'month')
                .toDate();
        }
        if (filtered) {
            if (txNew.length === 1) {
                months = [];
                data.forEach((date) => {
                    months.push(monthNames[date.month] + ' ' + date.year);
                });
            }
        }
        return { months, txNew, positives };
    }
);
