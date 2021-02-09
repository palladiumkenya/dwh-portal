import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdAppointmentDurationByStabilityStatus.listUnfiltered;
const listFiltered = state => state.dsdAppointmentDurationByStabilityStatus.listFiltered;
const filtered = state => state.filters.filtered;

export const getAppointmentDurationByStabilityStatus = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const appointmentCategories = ['<3 Months', '>3 Months'];
        const stabilityCategories = ['Stable', 'Unstable'];
        let data = [];
        for(let i = 0; i < appointmentCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < stabilityCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let appointmentIndex = appointmentCategories.indexOf(list[i].AppointmentsCategory);
            let stabilityIndex = stabilityCategories.indexOf(list[i].Stability);
            if(appointmentIndex === -1 || stabilityIndex === -1 ) {
                continue;
            }
            data[appointmentIndex][stabilityIndex] = data[appointmentIndex][stabilityIndex] + parseInt(list[i].patients);
        }
        return { appointmentCategories, stabilityCategories, data };
    }
);