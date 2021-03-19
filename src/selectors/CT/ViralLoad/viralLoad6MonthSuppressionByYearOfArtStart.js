import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoad6MonthSuppressionByYearOfArtStart.listUnfiltered;
const listFiltered = state => state.viralLoad6MonthSuppressionByYearOfArtStart.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoad6MonthSuppressionByYearOfArtStart = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        list.map(obj => {
            data.push(
                {
                    y: Math.round((obj.percentAt6Months * 100)),
                    text: obj.vlAt6Months_Sup,
                    year: obj.startYear
                }
            );
        });
        return { data };
    }
);
