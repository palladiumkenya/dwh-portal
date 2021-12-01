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

        let partners = list.map(obj => obj.CTPartner.toUpperCase().toString());
        partners = [...new Set(partners)];
        let fullyVaccinated = [];
        let partiallyVaccinated = [];

        for (let j = 0; j < partners.length; j++) {
            const filteredPartners = list.filter(obj => obj.CTPartner ? obj.CTPartner.toUpperCase().toString() === partners[j].toUpperCase().toString() : []);
            const partnerAdults = listPartner.filter(obj => obj.CTPartner ? obj.CTPartner.toUpperCase().toString() === partners[j].toUpperCase().toString() : []);
            let totalPartnerAdults = 0;
            if (partnerAdults.length > 0) {
                totalPartnerAdults = partnerAdults[0].Adults;
            }

            if (filteredPartners.length > 0) {
                const filterFully = filteredPartners.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
                const filterPartial = filteredPartners.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');

                if (filterFully.length > 0) {
                    let percent = Number(filterFully[0].Num) > 0 ? ((Number(filterFully[0].Num)/Number(totalPartnerAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;
                    fullyVaccinated.push(
                        {
                            y: percent,
                            text: filterFully[0].Num,
                            partner: partners[j]
                        }
                    );
                } else {
                    fullyVaccinated.push(
                        {
                            y: 0,
                            text: 0,
                            partner: partners[j]
                        }
                    );
                }

                if (filterPartial.length > 0) {
                    let percent = Number(filterPartial[0].Num) > 0 ? ((Number(filterPartial[0].Num)/Number(totalPartnerAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;
                    partiallyVaccinated.push(
                        {
                            y: percent,
                            text: filterPartial[0].Num,
                            partner: partners[j]
                        }
                    );
                } else {
                    partiallyVaccinated.push(
                        {
                            y: 0,
                            text: 0,
                            partner: partners[j]
                        }
                    );
                }
            } else {
                fullyVaccinated.push(
                    {
                        y: 0,
                        text: 0,
                        partner: partners[j]
                    }
                );
                partiallyVaccinated.push(
                    {
                        y: 0,
                        text: 0,
                        partner: partners[j]
                    }
                );
            }
        }

        fullyVaccinated.sort((a, b) => {
            return b.y - a.y;
        });
        partners = fullyVaccinated.map(obj => obj.partner);
        const orderedPartially = [];
        for (let i = 0; i < fullyVaccinated.length; i++) {
            const obj = partiallyVaccinated.filter(obj => obj.partner === fullyVaccinated[i].partner);
            if (obj.length > 0) {
                orderedPartially.push(obj[0]);
            }
        }
        partiallyVaccinated = orderedPartially;

        return { partners, fullyVaccinated, partiallyVaccinated };
    }
);
