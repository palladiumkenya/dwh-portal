import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdAppointmentDurationByAge.listUnfiltered;
const listFiltered = state => state.dsdAppointmentDurationByAge.listFiltered;
const filtered = state => state.filters.filtered;

export const getAppointmentDurationByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const appointmentCategories = ['<3 Months', '>3 Months'];
        const ageCategories = [
            'Under 1',
            '1 to 4',
            '5 to 9',
            '10 to 14',
            '15 to 19',
            '20 to 24',
            '25 to 29',
            '30 to 34',
            '35 to 39',
            '40 to 44',
            '45 to 49',
            '50 to 54',
            '55 to 59',
            '60 to 64',
            '65+'
        ];
        let data = [];
        for(let i = 0; i < appointmentCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < ageCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let appointmentIndex = appointmentCategories.indexOf(list[i].AppointmentsCategory);
            let ageIndex = ageCategories.indexOf(list[i].AgeGroup);
            if(appointmentIndex === -1 || ageIndex === -1 ) {
                continue;
            }
            data[appointmentIndex][ageIndex] = data[appointmentIndex][ageIndex] + parseInt(list[i].patients);
        }
        return { appointmentCategories, ageCategories, data };
    }
);