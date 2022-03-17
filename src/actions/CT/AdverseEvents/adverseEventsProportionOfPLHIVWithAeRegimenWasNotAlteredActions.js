import * as actionTypes from '../../types';
import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadAdverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().adverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'advEv' && tab !== 'advEv') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchAdverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered());
    }
};

export const fetchAdverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_PROPORTION_OF_PLHIV_WITH_AE_REGIMEN_WAS_NOT_ALTERED_REQUEST });
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
    const response = await getAll('care-treatment/getProportionOfPLHIVWithAeWhoseRegimenWasNotAltered', params);
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_PROPORTION_OF_PLHIV_WITH_AE_REGIMEN_WAS_NOT_ALTERED_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
