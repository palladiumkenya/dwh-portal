import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = state => state.htsPositivesTrendsKHIS.listUnfiltered;
const listFiltered = state => state.htsPositivesTrendsKHIS.listFiltered;
const filtered = state => state.filters.filtered;


export const getHTSPositivesTrendsKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let reportMonth = moment()
            .subtract(2, 'month')
            .add(16, 'days')
            .format('YYYYMM');
        let lastyr = list.filter((i) => i.ReportMonth_Year <= reportMonth);

        if (lastyr.length >= 12) lastyr.length = 12;


        const labels = lastyr
            .map((item) => {
                return moment(item.ReportMonth_Year)
                    .format('MMM YYYY')
                    .toUpperCase();
            })
            .reverse();
        const data = lastyr.map((item) => item.positive).reverse();

        return {
            data, labels
        };
    }
);
