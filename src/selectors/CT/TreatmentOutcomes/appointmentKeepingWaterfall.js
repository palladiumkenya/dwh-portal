import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.appointmentKeepingWaterfall.listUnfiltered;
const listFiltered = (state) => state.appointmentKeepingWaterfall.listFiltered;
const filtered = state => state.filters.filtered;

export const getAppointmentKeepingWaterfall = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let data = {
            camebefore:
                list.find((e) => e.AppointmentStatus === 'Came before')
                    ?.NumOfPatients ?? 0,
            ontime:
                list.find((e) => e.AppointmentStatus === 'On time')
                    ?.NumOfPatients ?? 0,
            missed1_7:
                list.find((e) => e.AppointmentStatus === 'Missed 1-7 days')
                    ?.NumOfPatients ?? 0,
            missed8_14:
                list.find((e) => e.AppointmentStatus === 'Missed 8-14 days')
                    ?.NumOfPatients ?? 0,
            missed15_30:
                list.find((e) => e.AppointmentStatus === 'Missed 15-30 days')
                    ?.NumOfPatients ?? 0,
            rttw30:
                list.find(
                    (e) => e.AppointmentStatus === 'IIT and RTT within 30 days'
                )?.NumOfPatients ?? 0,
            rttb30:
                list.find(
                    (e) => e.AppointmentStatus === 'IIT and RTT beyond 30 days'
                )?.NumOfPatients ?? 0,
            iit:
                list.find((e) => e.AppointmentStatus === 'Still IIT')
                    ?.NumOfPatients ?? 0,
            lost:
                list.find((e) => e.AppointmentStatus === 'LostinHMIS')
                    ?.NumOfPatients ?? 0,
            dead:
                list.find((e) => e.AppointmentStatus === 'Dead')
                    ?.NumOfPatients ?? 0,
            trans:
                list.find((e) => e.AppointmentStatus === 'Transfer-Out')
                    ?.NumOfPatients ?? 0,
            stopped:
                list.find((e) => e.AppointmentStatus === 'Stopped')
                    ?.NumOfPatients ?? 0,
            total: 0,
        };

        const total = Object.values(data).reduce(
            (acc, val) => acc + Math.abs(val),
            0
        ); // Calculate the total of all values

        for (const key in data) {
            data[key] = parseFloat(((data[key] / total) * 100).toFixed(2)) ;
        }


        return data;
    }
);
