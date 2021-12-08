import moment from 'moment';
import { CACHING } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadAdverseEventsProportionOfPlHivAeRelatedToArt = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().adverseEventsProportionOfPlHivAeRelatedToArtDrugs.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'advEv') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchAdverseEventsProportionOfPLHIVAeRelatedToArt());
    }
}

export const fetchAdverseEventsProportionOfPLHIVAeRelatedToArt = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_PROPORTION_OF_PLHIV_AE_RELATED_TO_ART_REQUEST });
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
    const response = await getAll('care-treatment/getProportionOfPLHIVWithAeRelatedToArt', params);
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_PROPORTION_OF_PLHIV_AE_RELATED_TO_ART_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
