import moment from 'moment';
import { CACHING } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadAdverseEventsProportionOfPlHivWithAeByCausativeDrugs = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().adverseEventsProportionOfPlHivWithAeByCausativeDrugs.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== "adverseEvent" && tab !== "adverseEvent") {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchAdverseEventsProportionOfPLHIVWithAeByCausativeDrugs());
    }
}

export const fetchAdverseEventsProportionOfPLHIVWithAeByCausativeDrugs = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_PROPORTION_OF_PLHIV_BY_CAUSATIVE_DRUGS_REQUEST });
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
    const response = await getAll('care-treatment/getProportionOfPLHIVWithAeByTypeOfSuspectedDrugs', params);
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_PROPORTION_OF_PLHIV_BY_CAUSATIVE_DRUGS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
