import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadSuppressionByRegimen.listUnfiltered;
const listFiltered = state => state.viralLoadSuppressionByRegimen.listFiltered;
const listUnfilteredCurrentOnArtOverview = state => state.currentOnArtOverview.listUnfiltered;
const listFilteredCurrentOnArtOverview = state => state.currentOnArtOverview.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadSuppressionByRegimen = createSelector(
    [listUnfiltered, listFiltered, listUnfilteredCurrentOnArtOverview, listFilteredCurrentOnArtOverview, filtered],
    (listUnfiltered, listFiltered, listUnfilteredCurrentOnArtOverview, listFilteredCurrentOnArtOverview, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listCurrentOnArtOverview = filtered ? listFilteredCurrentOnArtOverview : listUnfilteredCurrentOnArtOverview;
        const hasCurrentVl = listCurrentOnArtOverview.Last12MonthVL ? listCurrentOnArtOverview.Last12MonthVL : 0;
        const regimenCategories = ['TLD', 'TLE', 'OTHERS'];
        let data = [];
        for(let i = 0; i < regimenCategories.length; i++) {
            data[i] = 0;
        }
        if (hasCurrentVl > 0) {
            for(let i = 0; i < list.length; i++) {
                let regimenIndex = regimenCategories.indexOf(list[i].regimen);
                if(regimenIndex === -1) {
                    if(list[i].regimen === 'Other Regimen') {
                        regimenIndex = 2;
                    } else {
                        continue;
                    }
                }
                data[regimenIndex] = {
                    y: Number(((parseInt(list[i].txCurr)/parseInt(hasCurrentVl))*100).toFixed(1)),
                    absoluteY: list[i].txCurr.toLocaleString('en'),
                    text: Number(((parseInt(list[i].txCurr)/parseInt(hasCurrentVl))*100).toFixed(1)) + '%',
                };
            }
        }

        return { regimenCategories, data };
    }
);
