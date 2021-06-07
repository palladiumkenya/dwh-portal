import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesAmongAlHivWithBaselineVL.listFiltered;
const listUnfiltered = state => state.otzOutcomesAmongAlHivWithBaselineVL.listUnfiltered;

export const getOtzOutcomesAmongAlHivWithBaselineVL = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const ArrayVal = list.map(val => ({
            AlHivEnrolledInOTZ: val.AlHivEnrolledInOTZ,
            AlHivEnrolledInOTZPerc: 100,

            AlHivWithBaselineVl: val.AlHivWithBaselineVl,
            AlHivWithBaselineVlPerc: Math.round(((val.AlHivWithBaselineVl/val.AlHivEnrolledInOTZ)*100)),

            AlHivWithVlGreaterThan1000: val.AlHivWithVlGreaterThan1000,
            AlHivWithVlGreaterThan1000Perc: Math.round(((val.AlHivWithVlGreaterThan1000/val.AlHivEnrolledInOTZ)*100)),

            AlHivWithVlLessThan1000: val.AlHivWithVlLessThan1000,
            AlHivWithVlLessThan1000Perc: Math.round(((val.AlHivWithVlLessThan1000/val.AlHivEnrolledInOTZ)*100)),
        }));

        return ArrayVal;
    }
);


