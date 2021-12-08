import * as actionTypes from '../../types';
import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCovidCumulativeWhoReceivedAtLeastOneDose = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCovidCumulativeWhoReceivedAtLeastOneDose());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().CovidCumulativeWhoReceivedAtLeastOneDose.lastFetch),
            'minutes'
        );
        if (
            getState().ui.ctTab !== 'covid' &&
            getState().ui.currentPage !== PAGES.home
        ) {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchCovidCumulativeWhoReceivedAtLeastOneDose());
        }
    }
};

export const fetchCovidCumulativeWhoReceivedAtLeastOneDose = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_COVID_CUMULATIVE_WHO_RECEIVED_AT_LEAST_ONE_DOSE_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/getCumulativeNumberAdultPlhivWhoReceivedAtleastOneDose', params);
    dispatch({ type: actionTypes.CT_COVID_CUMULATIVE_WHO_RECEIVED_AT_LEAST_ONE_DOSE_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};

