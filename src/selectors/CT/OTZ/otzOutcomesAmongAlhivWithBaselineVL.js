import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesAmongAlHivWithBaselineVL.listFiltered;
const listUnfiltered = state => state.otzOutcomesAmongAlHivWithBaselineVL.listUnfiltered;

export const getOtzOutcomesAmongAlHivWithBaselineVL = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return list.map(val => ({
                    AlHivEnrolledInOTZ: val.AlHivEnrolledInOTZ,
                    AlHivEnrolledInOTZPerc: 100,

                    AlHiv: val.AlHiv,
                    AlHivPerc: 100,

                    AlHivWithBaselineVl: val.AlHivWithBaselineVl,
                    AlHivWithBaselineVlPerc: Math.round(((val.AlHivWithBaselineVl/val.AlHiv)*100)),

                    AlHivWithVlGreaterThan1000: val.AlHivWithVlGreaterThan1000,
                    AlHivWithVlGreaterThan1000Perc: Math.round(((val.AlHivWithVlGreaterThan1000/val.AlHiv)*100)),

                    AlHivWithVlLessThan1000: val.AlHivWithVlLessThan1000,
                    AlHivWithVlLessThan1000Perc: Math.round(((val.AlHivWithVlLessThan1000/val.AlHiv)*100)),

                    AlHivWithBaselineVlEnrolled: val.AlHivWithBaselineVlEnrolled,
                    AlHivWithBaselineVlEnrolledPerc: Math.round(((val.AlHivWithBaselineVlEnrolled/val.AlHivEnrolledInOTZ)*100)),

                    AlHivWithVlGreaterThan1000Enrolled: val.AlHivWithVlGreaterThan1000Enrolled,
                    AlHivWithVlGreaterThan1000EnrolledPerc: Math.round(((val.AlHivWithVlGreaterThan1000Enrolled/val.AlHivEnrolledInOTZ)*100)),

                    AlHivWithVlLessThan1000Enrolled: val.AlHivWithVlLessThan1000Enrolled,
                    AlHivWithVlLessThan1000EnrolledPerc: Math.round(((val.AlHivWithVlLessThan1000Enrolled/val.AlHivEnrolledInOTZ)*100)),
                }));
    }
);


