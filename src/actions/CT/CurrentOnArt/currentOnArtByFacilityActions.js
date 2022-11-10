import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCurrentOnArtByFacility = (tab) => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCurrentOnArtByByFacility());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().currentOnArtByFacility.lastFetch),
            'minutes'
        );
        if (
            getState().ui.ctTab !== "currentOnArt" &&
            tab !== "currentOnArt" &&
            getState().ui.currentPage !== PAGES.home
        ) {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchCurrentOnArtByByFacility());
        }
    }
};

export const fetchCurrentOnArtByByFacility =
    () => async (dispatch, getState) => {
        dispatch({ type: actionTypes.CT_TX_CURR_FACILITY_REQUEST });
        const params = {
            county: getState().filters.counties,
            subCounty: getState().filters.subCounties,
            facility: getState().filters.facilities,
            partner: getState().filters.partners,
            agency: getState().filters.agencies,
            project: getState().filters.projects,
            gender: getState().filters.genders,
            datimAgeGroup: getState().filters.datimAgeGroups,
            year: getState().filters.fromDate
                ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
                : '',
            month: getState().filters.fromDate
                ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
                : '',
        };
        const response = await getAll(
            'care-treatment/txCurrByFacility',
            params
        );
        dispatch({
            type: actionTypes.CT_TX_CURR_FACILITY_FETCH,
            payload: { filtered: getState().filters.filtered, list: response },
        });
    };
