import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.quaterlyIIT.listUnfiltered;
const listFiltered = (state) => state.quaterlyIIT.listFiltered;
const filtered = state => state.filters.filtered;

export const getQuaterlyIIT = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        
        const fourQuartersAgo = moment().subtract(4, 'quarters');
        const yearFourQuartersAgo = fourQuartersAgo.year();
        const quarterFourQuartersAgo = Math.ceil(fourQuartersAgo.quarter() / 3);

        const data = list.filter(d => (
            (d.year > yearFourQuartersAgo) ||
            (d.year === yearFourQuartersAgo && d.quarter >= quarterFourQuartersAgo)
        ));
        
        let labels = data.map(d => `${d.year} Q${d.quarter}`)
        let tx3 = data.map(d => ``)
        return { labels, data };
    }
);
