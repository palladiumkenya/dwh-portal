import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.treatmentOutcomesBySex.listUnfiltered;
const listFiltered = state => state.treatmentOutcomesBySex.listFiltered;
const filtered = state => state.filters.filtered;

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

export const getActiveBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const male = _.chain(list)
            .filter(list => list.artOutcome === "ACTIVE" && list.gender === "Male")
            .sumBy("totalOutcomes")
            .value();
        const female = _.chain(list)
            .filter(list => list.artOutcome === "ACTIVE" && list.gender === "Female")
            .sumBy("totalOutcomes")
            .value();
        return [male, female];
    }
);

export const getDeadBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const male = _.chain(list)
            .filter(list => list.artOutcome === "DEAD" && list.gender === "Male")
            .sumBy("totalOutcomes")
            .value();
        const female = _.chain(list)
            .filter(list => list.artOutcome === "DEAD" && list.gender === "Female")
            .sumBy("totalOutcomes")
            .value();
        return [male, female];
    }
);

export const getLtfuBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const male = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'LOSS TO FOLLOW UP' &&
                    list.gender === 'Male'
            )
            .sumBy('totalOutcomes')
            .value();
        const female = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'LOSS TO FOLLOW UP' &&
                    list.gender === 'Female'
            )
            .sumBy('totalOutcomes')
            .value();
        return [male, female];
    }
);

export const getStoppedBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const male = _.chain(list)
            .filter(list => list.artOutcome === "STOPPED" && list.gender === "Male")
            .sumBy("totalOutcomes")
            .value();
        const female = _.chain(list)
            .filter(list => list.artOutcome === "STOPPED" && list.gender === "Female")
            .sumBy("totalOutcomes")
            .value();
        return [male, female];
    }
);

export const getTransferOutBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const male = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'TRANSFERRED OUT' &&
                    list.gender === 'Male'
            )
            .sumBy('totalOutcomes')
            .value();
        const female = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'TRANSFERRED OUT' &&
                    list.gender === 'Female'
            )
            .sumBy('totalOutcomes')
            .value();
        return [male, female];
    }
);

export const getUndocumentedLtfuBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const male = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'UNDOCUMENTED LOSS' &&
                    list.gender === 'Male'
            )
            .sumBy('totalOutcomes')
            .value();
        const female = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'UNDOCUMENTED LOSS' &&
                    list.gender === 'Female'
            )
            .sumBy('totalOutcomes')
            .value();
        return [male, female];
    }
);
