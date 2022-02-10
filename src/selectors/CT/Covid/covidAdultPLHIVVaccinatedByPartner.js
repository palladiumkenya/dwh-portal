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

        let partners = list.map(obj => obj.CTPartner ? obj.CTPartner.toUpperCase().toString() : null);
        partners = [...new Set(partners)];
        partners = partners.filter(n => n);
        let fullyVaccinated = [];
        let partiallyVaccinated = [];
        let totalVaccinated = [];
        let notVaccinated = [];

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
                const filterNotVac = filteredPartners.filter(obj => obj.VaccinationStatus === 'Not Vaccinated');

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

                const totalFullyVaccinated = filterFully.length > 0 ? filterFully[0].Num : 0;

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
                const totalPartiallyVaccinated = filterPartial.length > 0 ? filterPartial[0].Num : 0;


                if (filterNotVac.length > 0) {
                    let percent = Number(filterNotVac[0].Num) > 0 ? ((Number(filterNotVac[0].Num)/Number(totalPartnerAdults))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;
                    notVaccinated.push(
                        {
                            y: percent,
                            text: filterNotVac[0].Num,
                            partner: partners[j]
                        }
                    );
                } else {
                    notVaccinated.push(
                        {
                            y: 0,
                            text: 0,
                            partner: partners[j]
                        }
                    );
                }
                const totalNotVaccinated = filterNotVac.length > 0 ? filterNotVac[0].Num : 0;

                const totalVacc = totalFullyVaccinated + totalPartiallyVaccinated + totalNotVaccinated;
                totalVaccinated.push(
                    {
                        y: totalVacc,
                        text: totalVacc,
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
                partiallyVaccinated.push(
                    {
                        y: 0,
                        text: 0,
                        partner: partners[j]
                    }
                );
                totalVaccinated.push(
                    {
                        y: 0,
                        text: 0,
                        partner: partners[j]
                    }
                );
                notVaccinated.push(
                    {
                        y: 0,
                        text: 0,
                        partner: partners[j]
                    }
                );
            }
        }

        totalVaccinated.sort((a, b) => {
            return b.text - a.text;
        });
        partners = totalVaccinated.map(obj => obj.partner);
        const orderedPartially = [];
        const orderedFully = [];
        const orderedNotVac = [];
        for (let i = 0; i < totalVaccinated.length; i++) {
            const obj = partiallyVaccinated.filter(obj => obj.partner === totalVaccinated[i].partner);
            const objFully = fullyVaccinated.filter(obj => obj.partner === totalVaccinated[i].partner);
            const objNotVac = notVaccinated.filter(obj => obj.partner === totalVaccinated[i].partner);
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

        return { partners, fullyVaccinated, partiallyVaccinated, notVaccinated };
    }
);
