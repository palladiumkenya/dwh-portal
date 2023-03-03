import moment from 'moment';
import { createSelector } from 'reselect';

const listScreenedUnfiltered = (state) => state.prepScreenedTrends.listUnfiltered;
const listScreenedFiltered = (state) => state.prepScreenedTrends.listFiltered;

const listPrepCTUnfiltered = (state) => state.ctPrepTrends.listUnfiltered;
const listPrepCTFiltered = (state) => state.ctPrepTrends.listFiltered;

const listEligibleUnfiltered = (state) => state.prepEligibleTrends.listUnfiltered;
const listEligibleFiltered = (state) => state.prepEligibleTrends.listFiltered;

const listEligibleAgeUnfiltered = (state) => state.prepEligibleAgegroup.listUnfiltered;
const listEligibleAgeFiltered = (state) => state.prepEligibleAgegroup.listFiltered;

const listNewTrendsUnfiltered = (state) => state.newOnPrepTrends.listUnfiltered;
const listNewTrendsFiltered = (state) => state.newOnPrepTrends.listFiltered;

const listEligibleTrendsUnfiltered = (state) => state.prepEligibleTrends.listUnfiltered;
const listEligibleTrendsFiltered = (state) => state.prepEligibleTrends.listFiltered;

const listNewAgeSexUnfiltered = (state) => state.newOnPrepAgeSex.listUnfiltered;
const listNewAgeSexFiltered = (state) => state.newOnPrepAgeSex.listFiltered;

const listPrepDiscTrendsUnfiltered = (state) => state.prepDiscontinuationTrends.listUnfiltered;
const listPrepDiscTrendsFiltered = (state) => state.prepDiscontinuationTrends.listFiltered;

const listPrepDiagTrendsUnfiltered = (state) => state.prepDiagnosedSTITrends.listUnfiltered;
const listPrepDiagTrendsFiltered = (state) => state.prepDiagnosedSTITrends.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getPrepScreenedTotal = createSelector(
    [listScreenedUnfiltered, listScreenedFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let month = moment()
            .subtract(2, 'month')
            .add(17, 'days')
            .format('MM');
        let year = moment()
            .subtract(2, 'month')
            .add(17, 'days')
            .format('YYYY');
        let screened = list.find(e=> e.month == month && e.year == year)
        return screened ? screened.ScreenedPrep : 0;
    }
);

export const getPrepEligibleTotal = createSelector(
    [listEligibleUnfiltered, listEligibleFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let month = moment()
            .subtract(2, 'month')
            .add(17, 'days')
            .format('MM');
        let year = moment()
            .subtract(2, 'month')
            .add(17, 'days')
            .format('YYYY');
        
        let eligible = list.find(e=> e.month == month && e.year == year)
        return eligible ? eligible.EligiblePrep : 0;
    }
);

export const getPrepEligibleAgeGroup = createSelector(
    [
        listEligibleAgeUnfiltered,
        listEligibleAgeFiltered,
        listNewAgeSexUnfiltered,
        listNewAgeSexFiltered,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        listNewAgeSexUnfiltered,
        listNewAgeSexFiltered,
        filtered
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listnew = filtered
            ? listNewAgeSexFiltered
            : listNewAgeSexUnfiltered;

        let eliList = [];
        let iniList = [];
        let agegrp = ['25 to 29', '30 to 34', '35 to 39', '40 to 44', '45 to 49', '50 to 54', '55 to 59', '60 to 64', '65+'];

        let age1 = 0
        let age2 = 0
        let age3 = 0

        list.forEach(el => {
            if (el.DATIMAgeGroup === '15 to 19') { 
                age1 += el.EligiblePrep
            }
            else if (el.DATIMAgeGroup === '20 to 24') {
                age2 += el.EligiblePrep
            }
            else if (agegrp.includes(el.DATIMAgeGroup)) {
                age3 += el.EligiblePrep
            }
        });

        let ageNew1 = 0
        let ageNew2 = 0
        let ageNew3 = 0

        listnew.forEach(el => {
            if (el.DatimAgeGroup === '15 to 19') {
                ageNew1 += el.StartedPrep;
            } else if (el.DatimAgeGroup === '20 to 24') {
                ageNew2 += el.StartedPrep;
            } else if (agegrp.includes(el.DatimAgeGroup)) {
                ageNew3 += el.StartedPrep;
            }
        });
        iniList = [ageNew1, ageNew2, ageNew3]
        eliList = [age1, age2, age3]

        let perc = [
            parseFloat(((ageNew1 * 100) / age1).toFixed(1)),
            parseFloat(((ageNew2 * 100) / age2).toFixed(1)),
            parseFloat(((ageNew3 * 100) / age3).toFixed(1)),
        ];

        return {eliList, iniList, perc};
    }
);

export const getPrepEligibleVnewTrend = createSelector(
    [
        listEligibleTrendsUnfiltered,
        listEligibleTrendsFiltered,
        listNewTrendsUnfiltered,
        listNewTrendsFiltered,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        listNewTrendsUnfiltered,
        listNewTrendsFiltered,
        filtered
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listnew = filtered
            ? listNewTrendsFiltered
            : listNewTrendsUnfiltered;

        let eliList = [];
        let iniList = [];
        let label = [];
        let perc = [];

        for (let i = 1; i <= 12; i++) {
            let date = moment().subtract(i, 'months');
            let month = date.format('MM');
            let year = date.format('YYYY');

            iniList.push(
                listnew.find((x) => x.year == year && x.month == month)
                    ?.StartedPrep ?? 0
            );

            eliList.push(
                list.find((x) => x.year == year && x.month == month)
                    ?.EligiblePrep ?? 0
            );

            perc.push(
                parseFloat(
                    (
                        ((listnew.find(
                            (x) => x.year == year && x.month == month
                        )?.StartedPrep ?? 0) *
                            100) /
                        (list.find((x) => x.year == year && x.month == month)
                            ?.EligiblePrep ?? 0)
                    ).toFixed(1)
                )
            );

            label.push(date.format('YYYY-MMM').toUpperCase());
        }
        eliList.reverse()
        iniList.reverse()
        perc.reverse()
        label.reverse()

        return {eliList, iniList, perc, label};
    }
);

export const getPrepNewAgeSexGroup = createSelector(
    [
        listNewAgeSexUnfiltered,
        listNewAgeSexFiltered,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        filtered
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let iniListM = [];
        let iniListF = [];
        let agegrp = ['15 to 19', '20 to 24', '25 to 29', '30 to 34', '35 to 39', '40 to 44', '45 to 49', '50 to 54', '55 to 59', '60 to 64', '65+'];

        agegrp.forEach((el) => {
            iniListM.push(list.find(
                (x) => x.Gender.toLowerCase() === 'male' && x.DatimAgeGroup === el
            )?.StartedPrep ?? 0);
            iniListF.push(list.find(
                (x) => x.Gender.toLowerCase() === 'female' && x.DatimAgeGroup === el
            )?.StartedPrep ?? 0);
        });

        return {iniListF, iniListM, agegrp};
    }
);

export const getPrepDiscTrend = createSelector(
    [listPrepDiscTrendsUnfiltered, listPrepDiscTrendsFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let discList = [];
        let label = [];

        for (let i = 1; i <= 12; i++) {
            let date = moment().subtract(i, 'months');
            let month = date.format('MM');
            let year = date.format('YYYY');

            discList.push(
                list.find((x) => x.year == year && x.month == month)
                    ?.PrepDiscontinuations ?? 0
            );

            label.push(date.format('YYYY-MMM').toUpperCase());
        }
        discList.reverse();
        label.reverse();

        return { discList, label };
    }
);

export const getPrepDiagTrend = createSelector(
    [listPrepDiagTrendsUnfiltered, listPrepDiagTrendsFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let diagList = [];
        let label = [];

        for (let i = 1; i <= 12; i++) {
            let date = moment().subtract(i, 'months');
            let month = date.format('MM');
            let year = date.format('YYYY');

            diagList.push(
                list.find((x) => x.year == year && x.Month == month)
                    ?.diagnosed ?? 0
            );

            label.push(date.format('YYYY-MMM').toUpperCase());
        }
        diagList.reverse();
        label.reverse();

        return { diagList, label };
    }
);

export const getPrepScreenedTrend = createSelector(
    [listScreenedUnfiltered, listScreenedFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let scList = [];
        let label = [];

        for (let i = 1; i <= 12; i++) {
            let date = moment().subtract(i, 'months');
            let month = date.format('MM');
            let year = date.format('YYYY');

            scList.push(
                list.find((x) => x.year == year && x.month == month)
                    ?.ScreenedPrep ?? 0
            );

            label.push(date.format('YYYY-MMM').toUpperCase());
        }
        scList.reverse();
        label.reverse();

        return { scList, label };
    }
);

export const getPrepCTTrend = createSelector(
    [listPrepCTUnfiltered, listPrepCTFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let ctList = [];
        let label = [];

        for (let i = 1; i <= 12; i++) {
            let date = moment().subtract(i, 'months');
            let month = date.format('MM');
            let year = date.format('YYYY');

            ctList.push(
                list.find((x) => x.year == year && x.month == month)?.PrepCT ??
                    0
            );

            label.push(date.format('YYYY-MMM').toUpperCase());
        }
        ctList.reverse();
        label.reverse();

        return { ctList, label };
    }
);

