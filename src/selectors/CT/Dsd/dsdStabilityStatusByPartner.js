import { createSelector } from 'reselect';
import currentOnArtByPartner from '../../../reducers/CT/CurrentOnArt/currentOnArtByPartner';

const listUnfiltered = state => state.dsdStabilityStatusByPartner.listUnfiltered;
const listFiltered = state => state.dsdStabilityStatusByPartner.listFiltered;

const ListUnfilteredStability = state => state.dsdAppointmentDurationByPartner.listUnfiltered;
const listFilteredStability = state => state.dsdAppointmentDurationByPartner.listFiltered;

const ListUnfilteredCurrentOnART = state => state.currentOnArtByPartner.listUnfiltered;
const listFilteredCurrentOnART  = state => state.currentOnArtByPartner.listFiltered;

const filtered = state => state.filters.filtered;

export const getStabilityStatusByPartner = createSelector(
    [ListUnfilteredStability, ListUnfilteredCurrentOnART, listFilteredStability, listFilteredCurrentOnART, filtered],
    (ListUnfilteredStability, ListUnfilteredCurrentOnART, listFilteredStability, listFilteredCurrentOnART, filtered) => {
        const list = filtered ? listFilteredStability : ListUnfilteredStability;
        const listCurrentOnART = filtered ? listFilteredCurrentOnART : ListUnfilteredCurrentOnART;

        console.log(listCurrentOnART);
        const partners = [];
        const stability = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].partner) {
                continue;
            }
            partners.push(list[i].partner.toUpperCase());
            const selectedPartner = listCurrentOnART.filter(obj => obj.CTPartner === list[i].partner.toUpperCase());

            if (selectedPartner.length > 0) {
                stability.push({
                    name: list[i].partner.toUpperCase(),
                    y: Math.round(((list[i].stablePatients/selectedPartner[0].txCurr)*100)) > 100 ? 100 : Math.round(((list[i].stablePatients/selectedPartner[0].txCurr)*100)),
                    text: '<b>Stable Patients: ' + list[i].stablePatients + ' </b><br/> <b>Txcurr:' + selectedPartner[0].txCurr + '</b>'
                });
            } else {
                stability.push({
                    name: list[i].partner.toUpperCase(),
                    y: 0,
                    text: '<b>Stable Patients: ' + list[i].stablePatients + ' </b><br/> <b>Txcurr: </b>'
                });
            }
        }

        stability.sort(function(a, b) {
            return b.y - a.y;
        });
        return { partners, stability };
    }
);

export const getStabilityStatusByPartnerMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const partners = [];
        const mmd = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].partner) {
                continue;
            }
            partners.push(list[i].partner.toUpperCase());
            mmd.push(list[i].mmd);
        }
        return { partners, mmd };
    }
);

export const getStabilityStatusByPartnerNonMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const partners = [];
        const nonMmd = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].partner) {
                continue;
            }
            partners.push(list[i].partner.toUpperCase());
            nonMmd.push(list[i].nonMmd);
        }
        return { partners, nonMmd };
    }
);
