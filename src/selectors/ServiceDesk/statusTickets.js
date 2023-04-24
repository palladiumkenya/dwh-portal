import _ from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = (state) => state.statusByProduct.listUnfiltered;
const listFiltered = (state) => state.statusByProduct.listFiltered;

const listMonthUnfiltered = (state) => state.statusByMonth.listUnfiltered;
const listMonthFiltered = (state) => state.statusByMonth.listFiltered;

const filtered = state => state.filters.filtered;

export const getByProduct = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let products = []
        let open = []
        let closed = []

        products = list.map((l) =>
            l.product ? l.product.toUpperCase() : "NOT PROVIDED"
        );
        open = list.map(l => l.opened)
        closed = list.map(l => l.closed)
        return {products, open, closed};
    }
);

export const getByMonth = createSelector(
    [listMonthUnfiltered, listMonthFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        
        const twelveMonthsAgo = moment().subtract(12, 'months');
        const filteredData = list.filter((entry) => {
            const entryDate = moment(
                `${entry.YEAR}-${entry.MONTH}-01`,
                'YYYY-MM-DD'
            );
            return entryDate.isSameOrAfter(twelveMonthsAgo, 'month');
        });

        let months = filteredData.map(
            (l) => `${moment(l.MONTH, 'M').format('MMM').toUpperCase()} ${l.YEAR}`
        );
        let open = filteredData.map((l) => l.opened);
        let closed = filteredData.map((l) => l.closed);
        return { months, open, closed };
    }
);


