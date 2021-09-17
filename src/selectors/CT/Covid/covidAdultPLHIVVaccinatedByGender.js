import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVVaccinatedByGender.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVVaccinatedByGender.listFiltered;
const listUnfilteredGender = state => state.CovidAdultPLHIVCurrentOnTreatmentByGender.listUnfiltered;
const listFilteredGender = state => state.CovidAdultPLHIVCurrentOnTreatmentByGender.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVVaccinatedByGender = createSelector(
    [listUnfiltered, listUnfilteredGender, listFiltered, listFilteredGender, filtered],
    (listUnfiltered, listUnfilteredGender, listFiltered, listFilteredGender, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listGender = filtered ? listFilteredGender : listUnfilteredGender;

        let totalMales = 0;
        let totalFemales = 0;
        const filterMales = listGender.filter(obj => obj.Gender === "Male");
        const filterFemales = listGender.filter(obj => obj.Gender === "Female");
        if (filterMales.length > 0) {
            totalMales = filterMales[0].Adults;
        }
        if (filterFemales.length > 0) {
            totalFemales = filterFemales[0].Adults;
        }

        let gender = [
            "Female",
            "Male"
        ];
        let fullyVaccinated = [];
        let partiallyVaccinated = [];

        for (let j = 0; j < gender.length; j++) {
            const filteredGenders = list.filter(obj => obj.gender === gender[j]);
            const currentOnArtAdults = gender[j] === "Female" ? totalFemales : totalMales;
            if (filteredGenders.length > 0) {
                const filterFully = filteredGenders.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
                const filterPartial = filteredGenders.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');
                if (filterFully.length > 0) {
                    let percent = Number(filterFully[0].Num) > 0 ? ((Number(filterFully[0].Num)/Number(currentOnArtAdults))*100) : 0;
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
                    let percent = Number(filterPartial[0].Num) > 0 ? ((Number(filterPartial[0].Num)/Number(currentOnArtAdults))*100) : 0;
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
            }
        }

        return { gender, fullyVaccinated, partiallyVaccinated };
    }
);
