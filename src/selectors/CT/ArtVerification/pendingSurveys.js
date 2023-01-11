import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artVerificationByPartner.listUnfiltered;
const listFiltered = (state) => state.artVerificationByPartner.listFiltered;

const listUnfilteredCounty = (state) => state.artVerificationByCounty.listUnfiltered;
const listFilteredCounty = (state) => state.artVerificationByCounty.listFiltered;

const filtered = state => state.filters.filtered;

export const getArtVerificationByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let partners = [];
        let pending = [];
        let unverified = [];
        let received = [];

        partners = list.map(p=> p.SDIP)
        pending = list.map((p) => p.Pendingsurveys);
        unverified = list.map((p) => p.Unverified);
        received = list.map((p) => p.SurveysReceived);

        let submitted = _.sum(received)
        let notsubmitted = _.sum(pending);

        return { partners, pending, received, unverified, submitted, notsubmitted };
    }
);

export const getArtVerificationByCounty = createSelector(
    [listUnfilteredCounty, listFilteredCounty, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let counties = [];
        let pending = [];
        let unverified = [];
        let received = [];

        counties = list.map((p) => p.County);
        pending = list.map((p) => p.Pendingsurveys);
        unverified = list.map((p) => p.Unverified);
        received = list.map((p) => p.SurveysReceived);

        return { counties, pending, received, unverified };
    }
);