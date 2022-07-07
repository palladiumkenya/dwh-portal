import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = state => state.htsPositivesTrendsKHIS.listUnfiltered;
const listFiltered = state => state.htsPositivesTrendsKHIS.listFiltered;
const filtered = state => state.filters.filtered;


export const getHTSPositivesTrendsKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        list.length = 12;

        const labels = list.map((item) => {
            return moment( item.ReportMonth_Year ).format('MMM YYYY').toUpperCase();
        }).reverse();
        const data = list.map(item => item.positive).reverse();

        return {
            data, labels
        };
    }
);
