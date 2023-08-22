import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadUptakeByCounty.listUnfiltered;
const listFiltered = state => state.viralLoadUptakeByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadUptakeByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let counties = [];
        let data = [];

        for(let i = 0; i < list.length; i++) {
            counties.push(list[i].county);
            data.push({
                c: list[i].county,
                y: Number(((parseInt(list[i].vlDone)/parseInt(list[i].txCurr))*100).toFixed(0)),
                absoluteY: list[i]?.vlDone?.toLocaleString('en'),
            });
        }

        data.sort(function(a, b) {
            return b.y - a.y;
        });
        return { counties, data };
    }
);
