import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesAmongAlHivWithBaselineVL.listFiltered;
const listUnfiltered = state => state.otzOutcomesAmongAlHivWithBaselineVL.listUnfiltered;

export const getOtzOutcomesAmongAlHivWithBaselineVL = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let total = 0;
        if (list.length > 0) {
            total = list[0].AlHivEnrolledInOTZ + list[0].AlHivWithBaselineVl + list[0].AlHivWithVlGreaterThan1000 + list[0].AlHivWithVlLessThan1000;
        }

        const ArrayVal = list.map(val => ({
            AlHivEnrolledInOTZ: val.AlHivEnrolledInOTZ,
            AlHivEnrolledInOTZPerc: total > 0 ? Math.round(((val.AlHivEnrolledInOTZ/total)*100)) : 0,

            AlHivWithBaselineVl: val.AlHivWithBaselineVl,
            AlHivWithBaselineVlPerc: total > 0 ? Math.round(((val.AlHivWithBaselineVl/total)*100)) : 0,

            AlHivWithVlGreaterThan1000: val.AlHivWithVlGreaterThan1000,
            AlHivWithVlGreaterThan1000Perc: total > 0 ? Math.round(((val.AlHivWithVlGreaterThan1000/total)*100)) : 0,

            AlHivWithVlLessThan1000: val.AlHivWithVlLessThan1000,
            AlHivWithVlLessThan1000Perc: total > 0 ? Math.round(((val.AlHivWithVlLessThan1000/total)*100)) : 0,
        }));

        console.log(ArrayVal);

        return ArrayVal;
    }
);


