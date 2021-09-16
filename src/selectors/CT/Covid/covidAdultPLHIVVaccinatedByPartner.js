import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVVaccinatedByPartner.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVVaccinatedByPartner.listFiltered;
const listUnfilteredPartner = state => state.CovidAdultPLHIVCurrentOnTreatmentByPartner.listUnfiltered;
const listFilteredPartner = state => state.CovidAdultPLHIVCurrentOnTreatmentByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVVaccinatedByPartner = createSelector(
    [listUnfiltered, listUnfilteredPartner, listFiltered, listFilteredPartner, filtered],
    (listUnfiltered, listUnfilteredPartner, listFiltered, listFilteredPartner, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listPartner = filtered ? listFilteredPartner : listUnfilteredPartner;

        let partners = list.map(obj => obj.CTPartner);
        let fullyVaccinated = [];
        let partiallyVaccinated = [];

        for (let j = 0; j < partners.length; j++) {
            const filteredPartners = list.filter(obj => obj.CTPartner === partners[j]);
            const partnerAdults = listPartner.filter(obj => obj.CTPartner === partners[j]);
            let totalPartnerAdults = 0;
            if (partnerAdults.length > 0) {
                totalPartnerAdults = partnerAdults[0].Adults;
            }

            if (filteredPartners.length > 0) {
                const filterFully = filteredPartners.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
                const filterPartial = filteredPartners.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');

                if (filterFully.length > 0) {
                    let percent = Number(filterFully[0].Adults) > 0 ? ((Number(filterFully[0].Adults)/Number(totalPartnerAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;
                    fullyVaccinated.push(percent);
                } else {
                    fullyVaccinated.push(0);
                }

                if (filterPartial.length > 0) {
                    let percent = Number(filterPartial[0].Num) > 0 ? ((Number(filterPartial[0].Num)/Number(totalPartnerAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;
                    partiallyVaccinated.push(percent);
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
