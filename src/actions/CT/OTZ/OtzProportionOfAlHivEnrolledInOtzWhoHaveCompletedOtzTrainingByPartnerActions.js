import moment from 'moment';
import { CACHING } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().otzProportionOfAlHivWhoHaveCompletedOtzTrainingByPartner.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'otz') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner());
    }
}

export const fetchProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OTZ_PROPORTION_OF_ALHIV_ENROLLED_IN_OTZ_WHO_HAVE_COMPLETED_OTZ_TRAINING_BY_PARTNER_REQUEST });
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
    const response = await getAll('care-treatment/getProportionOfAlHivWhoCompletedTrainingByPartner', params);
    dispatch({ type: actionTypes.CT_OTZ_PROPORTION_OF_ALHIV_ENROLLED_IN_OTZ_WHO_HAVE_COMPLETED_OTZ_TRAINING_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
