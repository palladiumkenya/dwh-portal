import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidCumulativeWhoReceivedAtLeastOneDose.listUnfiltered;
const listFiltered = state => state.CovidCumulativeWhoReceivedAtLeastOneDose.listFiltered;
const filtered = state => state.filters.filtered;

export const getCumulativeNumberAdultsWithCovidVaccine = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const yearMonths = list.map(obj => obj.DategivenFirstDose + ' ' + obj.YearFirstDose);
        const cumulative = list.map(obj => obj.cumulative);

        return { yearMonths, cumulative };
    }
);
