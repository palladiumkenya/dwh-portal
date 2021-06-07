import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcViralSuppressionAmongOvcPatientsByGender.listFiltered;
const listUnfiltered = state => state.ovcViralSuppressionAmongOvcPatientsByGender.listUnfiltered;

export const getOvcViralSuppressionAmongOvcPatientsMale = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const unSuppressed = list.filter(obj => obj.Last12MVLResult === "HVL" && obj.Gender === "Male");
        const suppressed = list.filter(obj => obj.Gender === "Male" && (obj.Last12MVLResult === "VL" || obj.Last12MVLResult === "LVL"));

        const totalUnSuppressed = _.sumBy(unSuppressed, "suppressed");
        const totalSuppressed = _.sumBy(suppressed, "suppressed");

        const arrayVal = [];
        arrayVal.push({
            name: 'SUPPRESSED',
            y: totalSuppressed,
            color: "#69B34C"
        });

        arrayVal.push({
            name: 'NOT SUPPRESSED',
            y: totalUnSuppressed,
            color: "#142459"
        });

        return arrayVal;
    }
);
