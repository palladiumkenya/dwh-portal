import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.treatmentOutcomesByPopulationType.listUnfiltered;
const listFiltered = state => state.treatmentOutcomesByPopulationType.listFiltered;
const filtered = state => state.filters.filtered;

export const getActiveByPopulationType = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const generalPopulation = _.chain(list)
            .filter(list => list.artOutcome === "Active" && list.populationType === "General Population")
            .sumBy("totalOutcomes")
            .value();
        const keyPopulation = _.chain(list)
            .filter(list => list.artOutcome === "Active" && list.populationType === "Key Population")
            .sumBy("totalOutcomes")
            .value();
        return [generalPopulation, keyPopulation];
    }
);

export const getDeadByPopulationType = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const generalPopulation = _.chain(list)
            .filter(list => list.artOutcome === "Dead" && list.populationType === "General Population")
            .sumBy("totalOutcomes")
            .value();
        const keyPopulation = _.chain(list)
            .filter(list => list.artOutcome === "Dead" && list.populationType === "Key Population")
            .sumBy("totalOutcomes")
            .value();
        return [generalPopulation, keyPopulation];
    }
);

export const getLtfuByPopulationType = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const generalPopulation = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'Loss To Follow Up' &&
                    list.populationType === 'General Population'
            )
            .sumBy('totalOutcomes')
            .value();
        const keyPopulation = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'Loss To Follow Up' &&
                    list.populationType === 'Key Population'
            )
            .sumBy('totalOutcomes')
            .value();
        return [generalPopulation, keyPopulation];
    }
);

export const getStoppedByPopulationType = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const generalPopulation = _.chain(list)
            .filter(list => list.artOutcome === "Stopped" && list.populationType === "General Population")
            .sumBy("totalOutcomes")
            .value();
        const keyPopulation = _.chain(list)
            .filter(list => list.artOutcome === "Stopped" && list.populationType === "Key Population")
            .sumBy("totalOutcomes")
            .value();
        return [generalPopulation, keyPopulation];
    }
);

export const getTransferOutByPopulationType = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const generalPopulation = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'Transferred Out' &&
                    list.populationType === 'General Population'
            )
            .sumBy('totalOutcomes')
            .value();
        const keyPopulation = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'Transferred Out' &&
                    list.populationType === 'Key Population'
            )
            .sumBy('totalOutcomes')
            .value();
        return [generalPopulation, keyPopulation];
    }
);

export const getUndocumentedLtfuByPopulationType = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const generalPopulation = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'Undocumented Loss' &&
                    list.populationType === 'General Population'
            )
            .sumBy('totalOutcomes')
            .value();
        const keyPopulation = _.chain(list)
            .filter(
                (list) =>
                    list.artOutcome === 'Undocumented Loss' &&
                    list.populationType === 'Key Population'
            )
            .sumBy('totalOutcomes')
            .value();
        return [generalPopulation, keyPopulation];
    }
);
