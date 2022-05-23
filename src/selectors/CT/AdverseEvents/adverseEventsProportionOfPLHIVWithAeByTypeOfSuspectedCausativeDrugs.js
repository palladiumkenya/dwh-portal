import { createSelector } from 'reselect';

const listUnFiltered = (state) =>
    state.adverseEventsProportionOfPlHivWithAeByCausativeDrugs.listUnfiltered;
const listFiltered = (state) =>
    state.adverseEventsProportionOfPlHivWithAeByCausativeDrugs.listFiltered;
const filtered = (state) => state.filters.filtered;

export const getProportionOfPLHIVWithAeByTypeOfSuspectedCausativeDrugs =
    createSelector(
        [listUnFiltered, listFiltered, filtered],
        (listUnFiltered, listFiltered, filtered) => {
            listFiltered = listFiltered.filter(function (item) {
                return !['Stavudine', 'Didanosin'].includes(
                    item.adverseEventCause
                );
            });
            listUnFiltered = listUnFiltered.filter(function (item) {
                return !['Stavudine', 'Didanosin'].includes(
                    item.adverseEventCause
                );
            });
            return filtered ? listFiltered : listUnFiltered;
        }
    );
