import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdAppointmentDurationByPartner.listUnfiltered;
const listFiltered = state => state.dsdAppointmentDurationByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getAppointmentDurationByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const appointmentCategories = ['<3 Months', '>3 Months'];
        const partnerCategories = [];
        let data = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].partner) {
                continue;
            }
            if(partnerCategories.indexOf(list[i].partner.toUpperCase()) === -1){
                partnerCategories.push(list[i].partner.toUpperCase());
            }
        }
        for(let i = 0; i < appointmentCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < partnerCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            if (!list[i].partner) {
                continue;
            }
            let appointmentIndex = appointmentCategories.indexOf(list[i].AppointmentsCategory);
            let ageIndex = partnerCategories.indexOf(list[i].partner.toUpperCase());
            if(appointmentIndex === -1 || ageIndex === -1 ) {
                continue;
            }
            data[appointmentIndex][ageIndex] = data[appointmentIndex][ageIndex] + parseInt(list[i].patients);
        }
        return { appointmentCategories, partnerCategories, data };
    }
);