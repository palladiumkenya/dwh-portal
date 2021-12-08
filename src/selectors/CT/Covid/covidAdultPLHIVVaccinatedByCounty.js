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

        let counties = list.map(obj => obj.County.toUpperCase().toString());
        counties = [...new Set(counties)];
        let fullyVaccinated = [];
        let partiallyVaccinated = [];
        let totalVaccinated = [];

        for (let j = 0; j < counties.length; j++) {
            const filteredCounties = list.filter(obj => obj.County ? obj.County.toUpperCase().toString() === counties[j].toUpperCase().toString() : []);
            const countyAdults = listCounty.filter(obj => obj.County ? obj.County.toUpperCase().toString() === counties[j].toUpperCase().toString(): []);
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

                const totalFullyVaccinated = filterFully.length > 0 ? filterFully[0].Num : 0;

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

                const totalPartiallyVaccinated = filterPartial.length > 0 ? filterPartial[0].Num : 0;

                const total = totalFullyVaccinated + totalPartiallyVaccinated;
                totalVaccinated.push(
                    {
                        y: total,
                        text: total,
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
                partiallyVaccinated.push(
                    {
                        y: 0,
                        text: 0,
                        county: counties[j]
                    }
                );
                totalVaccinated.push(
                    {
                        y: 0,
                        text: 0,
                        county: counties[j]
                    }
                );
            }
        }

        totalVaccinated.sort((a, b) => {
            return b.text - a.text;
        });

        counties = totalVaccinated.map(obj => obj.county);
        const orderedPartially = [];
        const orderedFully = [];
        for (let i = 0; i < totalVaccinated.length; i++) {
            const obj = partiallyVaccinated.filter(obj => obj.county === totalVaccinated[i].county);
            const objFully = fullyVaccinated.filter(obj => obj.county === totalVaccinated[i].county);
            if (obj.length > 0) {
                orderedPartially.push(obj[0]);
            }
            if (objFully.length > 0) {
                orderedFully.push(objFully[0]);
            }
        }
        partiallyVaccinated = orderedPartially;
        fullyVaccinated = orderedFully;

        return { counties, fullyVaccinated, partiallyVaccinated };
    }
);
