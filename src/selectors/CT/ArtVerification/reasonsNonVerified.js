import { createSelector } from 'reselect';

const listUnfiltered = state => state.artVerificationReasons.listUnfiltered;
const listFiltered = (state) => state.artVerificationReasons.listFiltered;


const filtered = state => state.filters.filtered;

export const getArtVerificationReasons = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let reasons = [];
        let num = [];

        reasons = list.map((p) => p.non_verification_reason);
        num = list.map((p) => p.NUM);

        return { reasons, num };
    }
);
