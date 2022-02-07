import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVVaccinatedByAgeGroup.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVVaccinatedByAgeGroup.listFiltered;
const listUnfilteredAgeGroup = state => state.CovidAdultPLHIVCurrentOnTreatmentByAgeGroup.listUnfiltered;
const listFilteredAgeGroup = state => state.CovidAdultPLHIVCurrentOnTreatmentByAgeGroup.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVVaccinatedByAgeGroups = createSelector(
    [listUnfiltered, listUnfilteredAgeGroup, listFiltered, listFilteredAgeGroup, filtered],
    (listUnfiltered, listUnfilteredAgeGroup, listFiltered, listFilteredAgeGroup, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listAgeGroup = filtered ? listFilteredAgeGroup : listUnfilteredAgeGroup;

        let ageGroups = [
            "15-19",
            "20-24",
            "25-29",
            "30-34",
            "35-39",
            "40-44",
            "45-49",
            "50-54",
            "55-59",
            "60-64",
            "65+"
        ];
        let fullyVaccinated = [];
        let partiallyVaccinated = [];
        let notVaccinated = [];

        for (let j = 0; j < ageGroups.length; j++) {
            const filteredAgeGroups = list.filter(obj => obj.AgeGroup === ageGroups[j]);
            const ageGroupAdults = listAgeGroup.filter(obj => obj.AgeGroup === ageGroups[j]);
            let totalAgeGroupAdults = 0;
            if (ageGroupAdults.length > 0) {
                totalAgeGroupAdults = ageGroupAdults[0].Adults;
            }

            if (filteredAgeGroups.length > 0) {
                const filterFully = filteredAgeGroups.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
                const filterPartial = filteredAgeGroups.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');
                const filterNotVac = filteredAgeGroups.filter(obj => obj.VaccinationStatus === 'Not Vaccinated');
                if (filterFully.length > 0) {
                    let percent = Number(filterFully[0].Num) > 0 ? ((Number(filterFully[0].Num)/Number(totalAgeGroupAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

                    fullyVaccinated.push(
                        {
                            y: percent,
                            text: filterFully[0].Num
                        }
                    );
                } else {
                    fullyVaccinated.push(
                        {
                            y: 0,
                            text: 0
                        }
                    );
                }

                if (filterPartial.length > 0) {
                    let percent = Number(filterPartial[0].Num) > 0 ? ((Number(filterPartial[0].Num)/Number(totalAgeGroupAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;
                    partiallyVaccinated.push(
                        {
                            y: percent,
                            text: filterPartial[0].Num
                        }
                    );
                } else {
                    partiallyVaccinated.push(
                        {
                            y: 0,
                            text: 0
                        }
                    );
                }

                if (filterNotVac.length > 0) {
                    let percent = Number(filterNotVac[0].Num) > 0 ? ((Number(filterNotVac[0].Num)/Number(totalAgeGroupAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;
                    notVaccinated.push(
                        {
                            y: percent,
                            text: filterNotVac[0].Num
                        }
                    );
                } else {
                    notVaccinated.push(
                        {
                            y: 0,
                            text: 0
                        }
                    );
                }
            } else {
                fullyVaccinated.push(
                    {
                        y: 0,
                        text: 0
                    }
                );
                partiallyVaccinated.push(
                    {
                        y: 0,
                        text: 0
                    }
                );
                notVaccinated.push(
                    {
                        y: 0,
                        text: 0
                    }
                );
            }
        }

        return { ageGroups, fullyVaccinated, partiallyVaccinated, notVaccinated };
    }
);
