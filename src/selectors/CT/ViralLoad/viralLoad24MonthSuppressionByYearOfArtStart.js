import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoad24MonthSuppressionByYearOfArtStart.listUnfiltered;
const listFiltered = state => state.viralLoad24MonthSuppressionByYearOfArtStart.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoad24MonthSuppressionByYearOfArtStart = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        list.map(obj => {
            data.push(
                {
                    y: Math.round((obj.percentAt24Months * 100)),
                    text: obj.vlAt24Months_Sup,
                    year: obj.startYear
                }
            );
        });
        return { data };
    }
);
