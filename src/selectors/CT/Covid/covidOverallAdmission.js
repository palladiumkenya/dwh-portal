import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidOverallAdmission.listUnfiltered;
const listFiltered = state => state.CovidOverallAdmission.listFiltered;
const filtered = state => state.filters.filtered;

export const getCovidOverallAdmission = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const admitted = list.filter(obj => obj.AdmissionStatus === "Yes");
        const notAdmitted = list.filter(obj => obj.AdmissionStatus === "No");
        const admittedTotal = _.sumBy(admitted, 'Num');
        const notAdmittedTotal = _.sumBy(notAdmitted, 'Num');

        return { admittedTotal, notAdmittedTotal };
    }
);
