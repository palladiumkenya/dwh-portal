import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdAppointmentDurationBySex.listUnfiltered;
const listFiltered = state => state.dsdAppointmentDurationBySex.listFiltered;
const filtered = state => state.filters.filtered;

export const getAppointmentDurationBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const appointmentCategories = ['<3 Months', '>3 Months'];
        const sexCategories = ['Male', 'Female'];
        let data = [];
        for(let i = 0; i < appointmentCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < sexCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let appointmentIndex = appointmentCategories.indexOf(list[i].AppointmentsCategory);
            let sexIndex = sexCategories.indexOf(list[i].Gender);
            if(appointmentIndex === -1 || sexIndex === -1 ) {
                continue;
            }
            data[appointmentIndex][sexIndex] = data[appointmentIndex][sexIndex] + parseInt(list[i].patients);
        }
        return { appointmentCategories, sexCategories, data };
    }
);