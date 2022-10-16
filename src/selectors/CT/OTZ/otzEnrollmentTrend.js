import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = (state) => state.otzEnrollmentTrend.listFiltered;
const listUnfiltered = (state) => state.otzEnrollmentTrend.listUnfiltered;

export const getOtzEnrolled = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        let months = []
        let data = []
        list = list.slice(0, 12);
        list.map((r) => { 
            months.push(monthNames[r.month - 1])
            data.push(r.enrolledInOTZ);
        });
        
        return {data, months};
    }
);
