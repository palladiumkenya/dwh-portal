import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVVaccinatedByCounty.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVVaccinatedByCounty.listFiltered;
const listUnfilteredCounty = state => state.CovidAdultPLHIVCurrentOnTreatmentByCounty.listUnfiltered;
const listFilteredCounty = state => state.CovidAdultPLHIVCurrentOnTreatmentByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVVaccinatedByCounty = createSelector(
    [listUnfiltered, listUnfilteredCounty, listFiltered, listFilteredCounty, filtered],
    (listUnfiltered, listUnfilteredCounty, listFiltered, listFilteredCounty, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listCounty = filtered ? listFilteredCounty : listUnfilteredCounty;

        let counties = list.map(obj => obj.County);
        let fullyVaccinated = [];
        let partiallyVaccinated = [];

        for (let j = 0; j < counties.length; j++) {
            const filteredCounties = list.filter(obj => obj.County === counties[j]);
            const countyAdults = listCounty.filter(obj => obj.County === counties[j]);
            let totalCountyAdults = 0;
            if (countyAdults.length > 0) {
                totalCountyAdults = countyAdults[0].Adults;
            }

            if (filteredCounties.length > 0) {
                const filterFully = filteredCounties.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
                const filterPartial = filteredCounties.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');
                if (filterFully.length > 0) {
                    let percent = Number(filterFully[0].Num) > 0 ? ((Number(filterFully[0].Num)/Number(totalCountyAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

                    fullyVaccinated.push(
                        {
                            y: percent,
                            text: filterFully[0].Num,
                            county: counties[j]
                        }
                    );
                } else {
                    fullyVaccinated.push(
                        {
                            y: 0,
                            text: 0,
                            county: counties[j]
                        }
                    );
                }

                if (filterPartial.length > 0) {
                    let percent = Number(filterPartial[0].Num) > 0 ? ((Number(filterPartial[0].Num)/Number(totalCountyAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

                    partiallyVaccinated.push(
                        {
                            y: percent,
                            text: filterPartial[0].Num,
                            county: counties[j]
                        }
                    );
                } else {
                    partiallyVaccinated.push(
                        {
                            y: 0,
                            text: 0,
                            county: counties[j]
                        }
                    );
                }
            } else {
                fullyVaccinated.push(
                    {
                        y: 0,
                        text: 0,
                        county: counties[j]
                    }
                );
                partiallyVaccinated.push(
                    {
                        y: 0,
                        text: 0,
                        county: counties[j]
                    }
                );
            }
        }

        fullyVaccinated.sort((a, b) => {
            return b.y - a.y;
        });
        counties = fullyVaccinated.map(obj => obj.county);
        const orderedPartially = [];
        for (let i = 0; i < fullyVaccinated.length; i++) {
            const obj = partiallyVaccinated.filter(obj => obj.county === fullyVaccinated[i].county);
            if (obj.length > 0) {
                orderedPartially.push(obj[0]);
            }
        }
        partiallyVaccinated = orderedPartially;

        return { counties, fullyVaccinated, partiallyVaccinated };
    }
);
