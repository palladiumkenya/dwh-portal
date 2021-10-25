import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidPercentageMissedAppointmentsByCounty.listUnfiltered;
const listFiltered = state => state.CovidPercentageMissedAppointmentsByCounty.listFiltered;
const filtered = state => state.filters.filtered;


export const getPercentageWhoMissedAppointmentsByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const arrayList = list.map(obj => ({
            y: Math.round(obj.Num),
            text: obj.Num,
            county: obj.County,
        }));

        return arrayList;
    }
);
