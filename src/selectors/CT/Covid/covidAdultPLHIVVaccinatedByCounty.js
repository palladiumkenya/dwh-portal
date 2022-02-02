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

        let counties = list.map(obj => obj.County ? obj.County.toUpperCase().toString() : null);
        counties = [...new Set(counties)];
        counties = counties.filter(n => n);
        let fullyVaccinated = [];
        let partiallyVaccinated = [];
        let totalVaccinated = [];
        let notVaccinated = [];

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
                const filterNotVac = filteredCounties.filter(obj => obj.VaccinationStatus === 'Not Vaccinated');
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

                if (filterNotVac.length > 0) {
                    let percent = Number(filterNotVac[0].Num) > 0 ? ((Number(filterNotVac[0].Num)/Number(totalCountyAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

                    notVaccinated.push(
                        {
                            y: percent,
                            text: filterNotVac[0].Num,
                            county: counties[j]
                        }
                    );
                } else {
                    notVaccinated.push(
                        {
                            y: 0,
                            text: 0,
                            county: counties[j]
                        }
                    );
                }

                const totalNotVaccinated = filterNotVac.length > 0 ? filterNotVac[0].Num : 0;

                const total = totalFullyVaccinated + totalPartiallyVaccinated + totalNotVaccinated;
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
                notVaccinated.push(
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
        const orderedNotVac = [];
        for (let i = 0; i < totalVaccinated.length; i++) {
            const obj = partiallyVaccinated.filter(obj => obj.county === totalVaccinated[i].county);
            const objFully = fullyVaccinated.filter(obj => obj.county === totalVaccinated[i].county);
            const objNotVac = notVaccinated.filter(obj => obj.county === totalVaccinated[i].county);
            if (obj.length > 0) {
                orderedPartially.push(obj[0]);
            }
            if (objFully.length > 0) {
                orderedFully.push(objFully[0]);
            }
            if (objNotVac.length > 0) {
                orderedNotVac.push(objNotVac[0]);
            }
        }
        partiallyVaccinated = orderedPartially;
        fullyVaccinated = orderedFully;
        notVaccinated = orderedNotVac;

        return { counties, fullyVaccinated, partiallyVaccinated, notVaccinated };
    }
);
