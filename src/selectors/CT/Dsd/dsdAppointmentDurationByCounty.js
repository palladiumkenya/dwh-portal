import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdAppointmentDurationByCounty.listUnfiltered;
const listFiltered = state => state.dsdAppointmentDurationByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getAppointmentDurationByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const appointmentCategories = ['<3 Months', '>3 Months'];
        const countyCategories = [];
        let data = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].county) {
                continue;
            }
            if(countyCategories.indexOf(list[i].county.toUpperCase()) === -1){
                countyCategories.push(list[i].county.toUpperCase());
            }
        }
        for(let i = 0; i < appointmentCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < countyCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            if (!list[i].county) {
                continue;
            }
            let appointmentIndex = appointmentCategories.indexOf(list[i].AppointmentsCategory);
            let countyIndex = countyCategories.indexOf(list[i].county.toUpperCase());
            if(appointmentIndex === -1 || countyIndex === -1 ) {
                continue;
            }
            data[appointmentIndex][countyIndex] = data[appointmentIndex][countyIndex] + parseInt(list[i].patients);
        }
        return { appointmentCategories, countyCategories, data };
    }
);