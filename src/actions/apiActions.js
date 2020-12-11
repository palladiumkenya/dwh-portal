import * as actionTypes from './types';

export const apiStart = () => ({
    type: actionTypes.API_START
});

export const apiSuccess = () => ({
    type: actionTypes.API_SUCCESS
});

export const apiError = () => ({
    type: actionTypes.API_ERROR
});