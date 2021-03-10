import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadUptakeByPartner.listUnfiltered;
const listFiltered = state => state.viralLoadUptakeByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadUptakeByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let partners = [];
        let data = [];

        for(let i = 0; i < list.length; i++) {
            partners.push(list[i].partner);
            data.push({
                p: list[i].partner,
                y: Number(((parseInt(list[i].vlDone)/parseInt(list[i].txCurr))*100).toFixed(0)),
                absoluteY: list[i].vlDone.toLocaleString('en'),
            });
        }
        data.sort(function(a, b) {
            return b.y - a.y;
        });
        return { partners, data };
    }
);
