import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = (state) => state.htsTestTrendsDWH.listUnfiltered;
const listFiltered = (state) => state.htsTestTrendsDWH.listFiltered;
const filtered = (state) => state.filters.filtered;

export const getHtsTestTrends = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const monthNames = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
        };
        let months = [];
        let tested = [];

        const today = moment().subtract(2, 'month').add(16, 'days');
        let previousYearDate = moment(today).subtract(1, 'years').toDate();
        previousYearDate = moment(previousYearDate).add(1, 'month').toDate();

        while (previousYearDate <= today) {
            months.push(
                monthNames[previousYearDate.getMonth() + 1] +
                    ' ' +
                    previousYearDate.getFullYear()
            );
            let filteredPositives = []

            if (list.length) {
                filteredPositives = list.filter(
                    (obj) =>
                        obj.month === previousYearDate.getMonth() + 1 &&
                        obj.year === previousYearDate.getFullYear()
                );
            }
            for (const filteredPositive of filteredPositives) {
                tested.push(parseInt(filteredPositive.tested.toString(), 10));
            }
            previousYearDate = moment(previousYearDate)
                .add(1, 'month')
                .toDate();
        }

        return { months, tested };
    }
);
