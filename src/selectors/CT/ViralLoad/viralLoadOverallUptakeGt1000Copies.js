import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadOverallUptakeGt1000Copies.listUnfiltered;
const listFiltered = state => state.viralLoadOverallUptakeGt1000Copies.listFiltered;

const listUnfilteredEAC = state => state.viralLoadOverallUptakeGt1000CopiesEac.listUnfiltered;
const listFilteredEAC = state => state.viralLoadOverallUptakeGt1000CopiesEac.listFiltered;

const listUnfilteredFollowTestsAll = state => state.viralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll.listUnfiltered;
const listFilteredFollowTestsAll = state => state.viralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll.listFiltered;

const listUnfilteredFollowTests = state => state.viralLoadOverallUptakeGt1000CopiesReceivedFollowTests.listUnfiltered;
const listFilteredFollowTests = state => state.viralLoadOverallUptakeGt1000CopiesReceivedFollowTests.listFiltered;

const listUnfilteredFollowTestsSecondlineRegiment = state => state.viralLoadOverallNumberTestsGt1000CopiesSecondlineRegiment.listUnfiltered;
const listFilteredFollowTestsSecondlineRegiment = state => state.viralLoadOverallNumberTestsGt1000CopiesSecondlineRegiment.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadOverallUptakeGt1000CopiesData = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return { data: list[0]?.Num || 0 };
    }
);

export const getViralLoadOverallUptakeGt1000CopiesEacData = createSelector(
    [listUnfilteredEAC, listFilteredEAC, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return { data: list[0] || 0 };
    }
);

export const getViralLoadOverallUptakeGt1000CopiesReceivedFollowTestAllData = createSelector(
    [listUnfilteredFollowTestsAll, listFilteredFollowTestsAll, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return { data: list[0]?.Num || 0 };
    }
);

export const getViralLoadOverallUptakeGt1000CopiesReceivedFollowTestData = createSelector(
    [listUnfilteredFollowTests, listFilteredFollowTests, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        let list = filtered ? listFiltered : listUnfiltered;
        list = list.filter((a) => a.LastVLResult != null);

        return { data: list };
    }
);

export const getViralLoadOverallNumberGt1000CopiesSecondlineRegimentData = createSelector(
    [listUnfilteredFollowTestsSecondlineRegiment, listFilteredFollowTestsSecondlineRegiment, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return { data: list[0]?.Num  };
    }
);
