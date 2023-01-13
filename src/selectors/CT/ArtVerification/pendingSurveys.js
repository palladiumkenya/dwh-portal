import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artVerificationByPartner.listUnfiltered;
const listFiltered = (state) => state.artVerificationByPartner.listFiltered;
const loadingP = (state) => state.artVerificationByPartner.loading;

const listUnfilteredCounty = (state) => state.artVerificationByCounty.listUnfiltered;
const listFilteredCounty = (state) => state.artVerificationByCounty.listFiltered;
const loadingC = (state) => state.artVerificationByCounty.loading;

const filtered = state => state.filters.filtered;

export const getArtVerificationByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered, loadingP],
    (listUnfiltered, listFiltered, filtered, loadingP) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let partners = [];
        let pending = [];
        let unverified = [];
        let received = [];

        list.sort((b, a) => a.Pendingsurveys - b.Pendingsurveys);

        partners = list.map((p) => p.SDIP);
        pending = list.map((p) => p.Pendingsurveys);
        unverified = list.map((p) => p.Unverified);
        received = list.map((p) => p.SurveysReceived);

        let submitted = _.sum(received);
        let notsubmitted = _.sum(pending);

        return {
            partners,
            pending,
            received,
            unverified,
            submitted,
            notsubmitted,
            loadingP,
        };
    }
);

export const getArtVerificationSubmissionByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered, loadingP],
    (listUnfiltered, listFiltered, filtered, loadingP) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let partners = [];
        let pending = [];
        let unverified = [];
        let received = [];

        list.forEach((element) => {
            element.perc =
                (element.SurveysReceived * 100) /
                (element.SurveysReceived + element.Unverified);
        });
        list.sort((b, a) => a.perc - b.perc);

        partners = list.map((p) => p.SDIP);
        pending = list.map((p) => p.Pendingsurveys);
        unverified = list.map((p) => p.Unverified);
        received = list.map((p) => p.SurveysReceived);

        let submitted = _.sum(received);
        let notsubmitted = _.sum(pending);

        return {
            partners,
            pending,
            received,
            unverified,
            submitted,
            notsubmitted,
            loadingP,
        };
    }
);

export const getArtVerificationByCounty = createSelector(
    [listUnfilteredCounty, listFilteredCounty, filtered, loadingC],
    (listUnfiltered, listFiltered, filtered, loadingC) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let counties = [];
        let pending = [];
        let unverified = [];
        let received = [];

        list.sort((b, a) => a.Pendingsurveys - b.Pendingsurveys);

        counties = list.map((p) => p.County);
        pending = list.map((p) => p.Pendingsurveys);
        unverified = list.map((p) => p.Unverified);
        received = list.map((p) => p.SurveysReceived);

        return { counties, pending, received, unverified, loadingC };
    }
);

export const getArtVerificationSubmissionByCounty = createSelector(
    [listUnfilteredCounty, listFilteredCounty, filtered, loadingC],
    (listUnfiltered, listFiltered, filtered, loadingC) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let counties = [];
        let pending = [];
        let unverified = [];
        let received = [];
        list.forEach((element) => {
            element.perc =
                (element.SurveysReceived * 100) /
                (element.SurveysReceived + element.Unverified);
        });

        list.sort((b, a) => a.perc - b.perc);

        counties = list.map((p) => p.County);
        pending = list.map((p) => p.Pendingsurveys);
        unverified = list.map((p) => {
            return {
                percent: Number(
                    (p.Unverified * 100) / p.SurveysReceived + p.Unverified
                ),
                y: p.Unverified,
            };
        });
        received = list.map((p) => {
            return {
                percent: Number(
                    (p.SurveysReceived * 100) / p.SurveysReceived + p.Unverified
                ),
                y: p.SurveysReceived,
            };
        });

        return { counties, pending, received, unverified, loadingC };
    }
);

export const getArtVerificationByCountyKHIS = createSelector(
    [listUnfilteredCounty, listFilteredCounty, filtered, loadingC],
    (listUnfiltered, listFiltered, filtered, loadingC) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let counties = [];
        let txCurr = [];
        let nupiVerified = [];

        list.forEach((element) => {
            element.perc =
                (element.NupiVerified * 100) /
                (element.NupiVerified + element.TxCurr);
        });

        list.sort((b, a) => a.perc - b.perc);

        counties = list.map((p) => p.County);
        txCurr = list.map((p) => p.TxCurr);
        nupiVerified = list.map((p) => p.NupiVerified);

        return { counties, txCurr, nupiVerified, loadingC };
    }
);

export const getArtVerificationByPartnerKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered, loadingP],
    (listUnfiltered, listFiltered, filtered, loadingP) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let partners = [];
        let txCurr = [];
        let nupiVerified = [];

        list.forEach((element) => {
            element.perc =
                (element.NupiVerified * 100) /
                (element.NupiVerified + element.TxCurr);
        });

        list.sort((b, a) => a.perc - b.perc);

        partners = list.map((p) => p.SDIP);
        txCurr = list.map((p) => p.TxCurr);
        nupiVerified = list.map((p) => p.NupiVerified);

        return { partners, txCurr, nupiVerified, loadingP };
    }
);

export const getArtVerificationTotal = createSelector(
    [listUnfilteredCounty, listFilteredCounty, filtered, loadingC],
    (listUnfiltered, listFiltered, filtered, loadingC) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let total = _.sum(list.map((p) => p.NupiVerified));
        return total;
    }
);

export const getArtVerificationTxTotal = createSelector(
    [listUnfilteredCounty, listFilteredCounty, filtered, loadingC],
    (listUnfiltered, listFiltered, filtered, loadingC) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let total = _.sum(list.map((p) => p.TxCurr));
        return { total, loadingC };
    }
);