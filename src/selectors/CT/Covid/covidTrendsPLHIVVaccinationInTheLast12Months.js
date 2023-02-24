import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidTrendsPLHIVVaccinationInTheLast12Months.listUnfiltered;
const listFiltered = state => state.CovidTrendsPLHIVVaccinationInTheLast12Months.listFiltered;
const filtered = state => state.filters.filtered;

export const getTrendsPLHIVVaccinationInTheLast12Months = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;


        let yearMonthTrends = list.map(obj => obj.DategivenFirstDose + ' ' + obj.YearFirstDose);
        yearMonthTrends = [...new Set(yearMonthTrends)];
        let trendsFullyVaccinated = [];
        let trendsPartiallyVaccinated = [];
        let trendsNotVaccinated = [];
        for (let i = 0; i < yearMonthTrends.length; i++) {
            const arrayVals = yearMonthTrends[i].split(" ");
            const fullyVaccinated = list.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated'
                && obj.DategivenFirstDose === arrayVals[0]
                && obj.YearFirstDose === arrayVals[1]);
            const partiallyVaccinated = list.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated'
                && obj.DategivenFirstDose === arrayVals[0]
                && obj.YearFirstDose === arrayVals[1]);
            const notVaccinated = list.filter(obj => obj.VaccinationStatus === 'Not Vaccinated'
                && obj.DategivenFirstDose === arrayVals[0]
                && obj.YearFirstDose === arrayVals[1]);

            if (fullyVaccinated.length > 0) {
                trendsFullyVaccinated.push(fullyVaccinated[0].Num);
            } else {
                trendsFullyVaccinated.push(0);
            }

            if (partiallyVaccinated.length > 0) {
                trendsPartiallyVaccinated.push(partiallyVaccinated[0].Num);
            } else {
                trendsPartiallyVaccinated.push(0);
            }

            if (notVaccinated.length > 0) {
                trendsNotVaccinated.push(notVaccinated[0].Num);
            } else {
                trendsNotVaccinated.push(0);
            }
        }

        // const trendsFullyVaccinated = fullyVaccinated.map(obj => obj.Num);
        // const trendsPartiallyVaccinated = partiallyVaccinated.map(obj => obj.Num);

        return { yearMonthTrends, trendsFullyVaccinated, trendsPartiallyVaccinated, trendsNotVaccinated };
    }
);
