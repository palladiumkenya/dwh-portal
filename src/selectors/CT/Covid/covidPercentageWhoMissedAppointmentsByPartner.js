import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidPercentageMissedAppointmentsByPartner.listUnfiltered;
const listFiltered = state => state.CovidPercentageMissedAppointmentsByPartner.listFiltered;
const filtered = state => state.filters.filtered;


export const getPercentageWhoMissedAppointmentsByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const arrayList = list.map(obj => ({
            y: Math.round(obj.Num),
            text: obj.Num,
            partner: obj.CTPartner,
        }));

        return arrayList;
    }
);
