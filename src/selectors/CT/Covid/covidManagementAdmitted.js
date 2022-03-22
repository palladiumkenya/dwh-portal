import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidManagementAdmitted.listUnfiltered;
const listFiltered = state => state.CovidManagementAdmitted.listFiltered;
const filtered = state => state.filters.filtered;

export const getCovidManagementAdmitted = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let data = []
        let labels = []

        list.forEach(d => {
            labels.push(d.AdmissionUnit.toUpperCase())
            data.push(d.Num)
        })
        // console.log(Screened)

        return { data, labels };
    }
);
