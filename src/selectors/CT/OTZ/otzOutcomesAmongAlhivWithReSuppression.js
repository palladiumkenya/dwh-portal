import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesAmongAlHivWithReSuppression.listFiltered;
const listUnfiltered = state => state.otzOutcomesAmongAlHivWithReSuppression.listUnfiltered;

export const getOtzOutcomesAmongAlHivWithReSuppression = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const ArrayVal = list.map(val => ({
            AlHivWithVlGreaterThan1000: val.AlHivWithVlGreaterThan1000,
            AlHivWithVlGreaterThan1000Perc: 100,

            ALHivWithVLLessThan1000WithRepeatVL: val.ALHivWithVLLessThan1000WithRepeatVL,
            ALHivWithVLLessThan1000WithRepeatVLPerc: Math.round(((val.ALHivWithVLLessThan1000WithRepeatVL/val.AlHivWithVlGreaterThan1000)*100)),

            ALHivWithVLGreaterThan1000WithRepeatVL: val.ALHivWithVLGreaterThan1000WithRepeatVL,
            ALHivWithVLGreaterThan1000WithRepeatVLPerc: Math.round(((val.ALHivWithVLGreaterThan1000WithRepeatVL/val.AlHivWithVlGreaterThan1000)*100)),
        }));

        return ArrayVal;
    }
);


