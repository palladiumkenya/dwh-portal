import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.artVerificationByPartner.listUnfiltered;
const listFiltered = (state) => state.artVerificationByPartner.listFiltered;
const loadingP = (state) => state.artVerificationByPartner.loading;

const listUnfilteredCounty = (state) =>
    state.artVerificationByCounty.listUnfiltered;
const listFilteredCounty = (state) =>
    state.artVerificationByCounty.listFiltered;
const loadingC = (state) => state.artVerificationByCounty.loading;

const listUnfilteredTxCurr = (state) =>
    state.currentOnArtByCounty.listUnfiltered;
const listFilteredTxCurr = (state) => state.currentOnArtByCounty.listFiltered;
const listUnfilteredVerified = (state) =>
    state.currentOnArtVerifiedByCounty.listUnfiltered;
const listFilteredVerified = (state) =>
    state.currentOnArtVerifiedByCounty.listFiltered;

const listUnfilteredVerifiedPartner = (state) =>
    state.currentOnArtVerifiedByPartner.listUnfiltered;
const listFilteredVerifiedPartner = (state) =>
    state.currentOnArtVerifiedByPartner.listFiltered;
const listUnfilteredTxCurrPartner = (state) =>
    state.currentOnArtByPartner.listUnfiltered;
const listFilteredTxCurrPartner = (state) => state.currentOnArtByPartner.listFiltered;

const filtered = (state) => state.filters.filtered;

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

export const getArtPendingUnverifiedByPartner = createSelector(
    [
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredTxCurrPartner,
        listFilteredTxCurrPartner,
        listUnfilteredVerifiedPartner,
        listFilteredVerifiedPartner,
    ],
    (
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredTxCurr,
        listFilteredTxCurr,
        listUnfilteredVerified,
        listFilteredVerified
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let listTxCurr = filtered ? listFilteredTxCurr : listUnfilteredTxCurr;
        let listVerified = filtered
            ? listFilteredVerified
            : listUnfilteredVerified;
        let newList = [];

        for (let i = 0; i < list.length; i++) {
            if (!list[i].SDIP) {
                continue;
            }

            newList.push({
                partners: list[i].SDIP.toUpperCase(),
                Pending: isNaN(
                    listTxCurr.find((x) => {
                        return (
                            x.CTPartner?.toUpperCase() ===
                            list[i].SDIP?.toUpperCase()
                        );
                    })?.txCurr -
                        listVerified.find((x) => {
                            return (
                                x.CTPartner?.toUpperCase() ===
                                list[i].SDIP?.toUpperCase()
                            );
                        })?.NumNupi -
                        list[i].SurveysReceived
                )
                    ? 0
                    : listTxCurr.find((x) => {
                          return (
                              x.CTPartner?.toUpperCase() ===
                              list[i].SDIP?.toUpperCase()
                          );
                      })?.txCurr -
                      listVerified.find((x) => {
                          return (
                              x.CTPartner?.toUpperCase() ===
                              list[i].SDIP?.toUpperCase()
                          );
                      })?.NumNupi -
                      list[i].SurveysReceived,
            });
        }

        newList = newList.sort((b, a) => a.Pending - b.Pending);

        return {
            partners: newList.map((e) => e.partners),
            pending: newList.map((e) => e.Pending < 0 ? 0 : e.Pending),
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
        unverified = list.map((p) => (p.TxCurr - p.NupiVerified));
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

export const getArtPendingUnverifiedByCounty = createSelector(
    [
        listUnfilteredCounty,
        listFilteredCounty,
        filtered,
        listUnfilteredTxCurr,
        listFilteredTxCurr,
        listUnfilteredVerified,
        listFilteredVerified,
    ],
    (
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredTxCurr,
        listFilteredTxCurr,
        listUnfilteredVerified,
        listFilteredVerified
    ) => {
        let list = filtered ? listFiltered : listUnfiltered;
        let listTxCurr = filtered ? listFilteredTxCurr : listUnfilteredTxCurr;
        let listVerified = filtered
            ? listFilteredVerified
            : listUnfilteredVerified;
        let newList = [];

        list.forEach((e) => e.County = e.County.split('-').join(' '));

        for (let i = 0; i < list.length; i++) {
            if (!list[i].County) {
                continue;
            }

            newList.push({
                county: list[i].County.toUpperCase(),
                Pending:
                    listTxCurr.find((x) => {
                        return (
                            x.County?.toUpperCase() ===
                            list[i].County?.toUpperCase()
                        );
                    })?.txCurr -
                    listVerified.find((x) => {
                        return (
                            x.County?.toUpperCase() ===
                            list[i].County?.toUpperCase()
                        );
                    })?.NumNupi -
                    list[i].SurveysReceived,
            });
        }

        newList = newList.sort((b, a) => a.Pending - b.Pending);

        return {
            counties: newList.map((e) => e.county),
            pending: newList.map((e) => e.Pending < 0 ? 0 : e.Pending),
        };
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
                    ((p.TxCurr - p.NupiVerified) * 100) / p.SurveysReceived + p.Unverified
                ),
                y: (p.TxCurr - p.NupiVerified),
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
