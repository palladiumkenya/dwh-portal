import _ from 'lodash';
import { createSelector } from 'reselect';
import CovidAdultPLHIVVaccinatedByPartner from '../../../reducers/CT/Covid/covidAdultPLHIVVaccinatedByPartner';

const listUnfiltered = state => state.CovidAdultPLHIVVaccinatedByPartner.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVVaccinatedByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVVaccinatedByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let partners = list.map(obj => obj.CTPartner);
        let fullyVaccinated = [];
        let partiallyVaccinated = [];

        for (let j = 0; j < partners.length; j++) {
            const filteredPartners = list.filter(obj => obj.CTPartner === partners[j]);
            if (filteredPartners.length > 0) {
                const filterFully = filteredPartners.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
                const filterPartial = filteredPartners.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');
                if (filterFully.length > 0) {
                    fullyVaccinated.push(Number(filterFully[0].Num));
                } else {
                    fullyVaccinated.push(0);
                }

                if (filterPartial.length > 0) {
                    partiallyVaccinated.push(Number(filterPartial[0].Num));
                } else {
                    partiallyVaccinated.push(0);
                }
            } else {
                fullyVaccinated.push(0);
                partiallyVaccinated.push(0);
            }
        }

        return { partners, fullyVaccinated, partiallyVaccinated };
    }
);
