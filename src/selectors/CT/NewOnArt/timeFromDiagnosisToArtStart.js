import { createSelector } from 'reselect';

const listUnfiltered = state => state.timeFromDiagnosisToArtStart.listUnfiltered;
const listFiltered = state => state.timeFromDiagnosisToArtStart.listFiltered;
const filtered = state => state.filters.filtered;

export const getTimeFromDiagnosisToArtStart = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const periodGroups = [];
        let firstPeriod = [];
        let firstPeriodPercent = [];
        let secondPeriod = [];
        let secondPeriodPercent = [];
        let thirdPeriod = [];
        let thirdPeriodPercent = [];
        let fourthPeriod = [];
        let fourthPeriodPercent = [];

        list.forEach(function (res) {
            if(periodGroups.indexOf(res.year) === -1){
                periodGroups.push(res.year);
            }
        });

        list.forEach(function (res) {
            let index = periodGroups.indexOf(res.year);
            if (res.period === 'Same Day') {
                firstPeriod.splice(index, 0, parseInt(res.txNew));
            } else if (res.period === '1 to 7 Days') {
                secondPeriod.splice(index, 0, parseInt(res.txNew));
            } else if (res.period === '8 to 14 Days') {
                thirdPeriod.splice(index, 0, parseInt(res.txNew));
            } else if (res.period === '> 14 Days') {
                fourthPeriod.splice(index, 0, parseInt(res.txNew));
            }
        });

        periodGroups.forEach(function (periodGroup, i) {
            let total = 0;
            total = total + firstPeriod[i];
            total = total + secondPeriod[i];
            total = total + thirdPeriod[i];
            total = total + fourthPeriod[i];
            firstPeriodPercent.splice(i, 0, Number(parseFloat((firstPeriod[i]/total)*100).toFixed(1)));
            secondPeriodPercent.splice(i, 0, Number(parseFloat((secondPeriod[i]/total)*100).toFixed(1)));
            thirdPeriodPercent.splice(i, 0, Number(parseFloat((thirdPeriod[i]/total)*100).toFixed(1)));
            fourthPeriodPercent.splice(i, 0, Number(parseFloat((fourthPeriod[i]/total)*100).toFixed(1)));
        });

        return { periodGroups, firstPeriodPercent, secondPeriodPercent, thirdPeriodPercent, fourthPeriodPercent };
    }
);
