import * as actionTypes from '../../types';
import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadAdverseEventsProportionOfPLHIVWithAeRegimenChanged = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().adverseEventsProportionOfPLHIVWithAeRegimenChanged.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== "adverseEvent" && tab !== "adverseEvent") {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchAdverseEventsProportionOfPLHIVWithAeRegimenChanged());
    }
};

export const fetchAdverseEventsProportionOfPLHIVWithAeRegimenChanged = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_PROPORTION_OF_PLHIV_WITH_AE_REGIMEN_CHANGED_REQUEST });
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
    const response = await getAll('care-treatment/getProportionOfPLHIVWithAeWhoseRegimenChanged', params);
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_PROPORTION_OF_PLHIV_WITH_AE_REGIMEN_CHANGED_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
