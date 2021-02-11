import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadUptakeBySex.listUnfiltered;
const listFiltered = state => state.viralLoadUptakeBySex.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadUptakeBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const sexCategories = ['Male', 'Female'];
        let data = [];
        for(let i = 0; i < list.length; i++) {
            if(list[i].gender === 'Male') {
                data[0] = {
                    y: Number(((parseInt(list[i].vlDone)/parseInt(list[i].txCurr))*100).toFixed(1)),
                    absoluteY: list[i].vlDone.toLocaleString('en'),
                    color: "#14084D"
                };
            }
            if(list[i].gender === 'Female') {
                data[1] = {
                    y: Number(((parseInt(list[i].vlDone)/parseInt(list[i].txCurr))*100).toFixed(1)),
                    absoluteY: list[i].vlDone.toLocaleString('en'),
                    color: "#EA4C8B",
                };
            }
        }
        return { sexCategories, data };
    }
);
