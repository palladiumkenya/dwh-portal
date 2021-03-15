import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdUnstable.listUnfiltered;
const listFiltered = state => state.dsdUnstable.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArt = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.txCurr ? list.txCurr : 0;
    }
);

export const getOnArtLessThan12Months = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.onArtLessThan12Months ? list.onArtLessThan12Months : 0;
    }
);

export const getAgeLessThan20Years = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.ageLessThan20Years ? list.ageLessThan20Years : 0;
    }
);

export const getPoorAdherence = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.poorAdherence ? list.poorAdherence : 0;
    }
);

export const getPregnantAndBreastFeeding = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.latestPregnancy ? list.latestPregnancy : 0;
    }
);

export const getHighVl = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.highVl ? list.highVl : 0;
    }
);

export const getBmiLessThan18 = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.bmiLessThan18 ? list.bmiLessThan18 : 0;
    }
);
