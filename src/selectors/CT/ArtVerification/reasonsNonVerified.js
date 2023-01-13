import { createSelector } from 'reselect';

const listUnfiltered = state => state.artVerificationReasons.listUnfiltered;
const listFiltered = (state) => state.artVerificationReasons.listFiltered;
const loading = (state) => state.artVerificationReasons.loading;

const filtered = state => state.filters.filtered;

export const getArtVerificationReasons = createSelector(
    [listUnfiltered, listFiltered, filtered, loading],
    (listUnfiltered, listFiltered, filtered, loading) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let reasons = [];
        let num = [];

        reasons = list
            .reverse()
            .map((p) =>
                p.non_verification_reason === null
                    ? 'NONE'
                    : p.non_verification_reason.toUpperCase()
            );
        num = list.map((p) => p.NUM);

        return { reasons, num, loading };
    }
);
