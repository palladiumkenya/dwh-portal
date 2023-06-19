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
            .filter(list => list.artOutcome === "Active")
            .sumBy("totalOutcomes")
            .value();
    }
);

export const getDead = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.artOutcome === "Dead")
            .sumBy("totalOutcomes")
            .value();
    }
);

export const getLtfu = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter((list) => list.artOutcome === 'Loss To Follow Up')
            .sumBy('totalOutcomes')
            .value();
    }
);

export const getStopped = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(list => list.artOutcome === "Stopped")
            .sumBy("totalOutcomes")
            .value();
    }
);

export const getTransferOut = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter((list) => list.artOutcome === 'Transferred Out')
            .sumBy('totalOutcomes')
            .value();
    }
);

export const getUndocumentedLtfu = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter((list) => list.artOutcome === 'Undocumented Loss')
            .sumBy('totalOutcomes')
            .value();
    }
);

export const getActiveBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const male = _.chain(list)
            .filter(list => list.artOutcome === "Active" && list.gender === "Male")
            .sumBy("totalOutcomes")
            .value();
        const female = _.chain(list)
            .filter(list => list.artOutcome === "Active" && list.gender === "Female")
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
            .filter(list => list.artOutcome === "Dead" && list.gender === "Male")
            .sumBy("totalOutcomes")
            .value();
        const female = _.chain(list)
            .filter(list => list.artOutcome === "Dead" && list.gender === "Female")
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
                    list.artOutcome === 'Loss To Follow Up' &&
                    list.gender === 'Male'
            )
            .sumBy('totalOutcomes')
            .value();
        const female = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'Loss To Follow Up' &&
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
            .filter(list => list.artOutcome === "Stopped" && list.gender === "Male")
            .sumBy("totalOutcomes")
            .value();
        const female = _.chain(list)
            .filter(list => list.artOutcome === "Stopped" && list.gender === "Female")
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
                    list.artOutcome === 'Transferred Out' &&
                    list.gender === 'Male'
            )
            .sumBy('totalOutcomes')
            .value();
        const female = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'Transferred Out' &&
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
                    list.artOutcome === 'Undocumented Loss' &&
                    list.gender === 'Male'
            )
            .sumBy('totalOutcomes')
            .value();
        const female = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'Undocumented Loss' &&
                    list.gender === 'Female'
            )
            .sumBy('totalOutcomes')
            .value();
        return [male, female];
    }
);
