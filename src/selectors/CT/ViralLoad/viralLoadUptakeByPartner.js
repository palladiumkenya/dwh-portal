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
                y: Number(((parseInt(list[i].vlDone)/parseInt(list[i].txCurr))*100).toFixed(0)),
                absoluteY: list[i].vlDone.toLocaleString('en'),
            });
        }
        return { partners, data };
    }
);
