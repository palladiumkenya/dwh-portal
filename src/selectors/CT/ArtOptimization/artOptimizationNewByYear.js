import _ from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationNewByYear.listUnfiltered;
const listFiltered = state => state.artOptimizationNewByYear.listFiltered;
const filtered = state => state.filters.filtered;
const fromDate = state => state.filters.fromDate;
const toDate = state => state.filters.toDate;

export const getNewByYear = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).map(l => {
            if (l.startRegimen !== "TLE" && l.startRegimen !== "TLD" && l.startRegimen !== "Other Regimen") {
                return {
                    ...l,
                    startRegimen: "OTHERS"
                }
            } else {
                return l;
            }
        }).value();
    }
);

export const getMonthYear = createSelector(
    [fromDate, toDate], (fromDate, toDate) => {
        fromDate = null;
        let to = toDate ? moment(toDate, 'MMM YYYY') : moment().startOf('month');
        let from = fromDate ? moment(fromDate, 'MMM YYYY') : to.clone().startOf('year');
        let diff = from.diff(to, 'month');
        if (diff <= 0) {
            from = to.clone().startOf('year');
        }
        if (!fromDate && diff < 12) {
            from = to.clone().subtract(12, 'month');
        }
        const monthYear = [];
        while (to > from) {
            monthYear.push(from.format('MMMM YYYY'));
            from.add(1, 'month');
        }
        return monthYear;
    }
);

export const getRegimens = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.startRegimen && (l.startRegimen === "TLD" || l.startRegimen === "TLE" || l.startRegimen === "Other Regimen")).map(l => l.startRegimen).uniq().sort().value();
    }
);
