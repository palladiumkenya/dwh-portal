import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.treatmentOutcomesOverallLast12m.listUnfiltered;
const listFiltered = state => state.treatmentOutcomesOverallLast12m.listFiltered;
const filtered = state => state.filters.filtered;

export const getStartedOnArt = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .sumBy("totalOutcomes")
            .value();
    }
);

export const getActive = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.artOutcome === "ACTIVE")
            .sumBy("totalOutcomes")
            .value();
    }
);

export const getDead = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.artOutcome === "DEAD")
            .sumBy("totalOutcomes")
            .value();
    }
);

export const getLtfu = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter((list) => list.artOutcome === 'LOSS TO FOLLOW UP')
            .sumBy('totalOutcomes')
            .value();
    }
);

export const getStopped = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.artOutcome === "STOPPED")
            .sumBy("totalOutcomes")
            .value();
    }
);

export const getTransferOut = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter((list) => list.artOutcome === 'TRANSFERRED OUT')
            .sumBy('totalOutcomes')
            .value();
    }
);

export const getUndocumentedLtfu = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter((list) => list.artOutcome === 'UNDOCUMENTED LOSS')
            .sumBy('totalOutcomes')
            .value();
    }
);
