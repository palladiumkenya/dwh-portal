import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidOverallMissedAppointments.listUnfiltered;
const listFiltered = state => state.CovidOverallMissedAppointments.listFiltered;
const filtered = state => state.filters.filtered;

export const getOverallMissedAppointments = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const overallMissedAppointment = list.Num;

        return { overallMissedAppointment };
    }
);
