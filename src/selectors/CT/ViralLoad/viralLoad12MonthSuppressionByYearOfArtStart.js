import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoad12MonthSuppressionByYearOfArtStart.listUnfiltered;
const listFiltered = state => state.viralLoad12MonthSuppressionByYearOfArtStart.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoad12MonthSuppressionByYearOfArtStart = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const data = [];
        list.map(obj => {
            data.push(
                {
                    y: Math.round((obj.percentAt12Months * 100)),
                    text: obj.vlAt12Months_Sup,
                    year: obj.startYear
                }
            );
        });
        return { data };
    }
);
