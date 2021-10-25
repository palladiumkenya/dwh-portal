import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidPercentageMissedAppointmentsByAgeGroup.listUnfiltered;
const listFiltered = state => state.CovidPercentageMissedAppointmentsByAgeGroup.listFiltered;
const filtered = state => state.filters.filtered;


export const getPercentageWhoMissedAppointmentsByAgeGroup = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const arrayList = list.map(obj => ({
            y: Math.round(obj.Num),
            text: obj.Num,
            agegroup: obj.Agegroup,
        }));

        return arrayList;
    }
);
