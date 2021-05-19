import { createSelector } from 'reselect';
import _ from 'lodash';

const listUnfiltered = state => state.dsdStabilityStatusByPartner.listUnfiltered;
const listFiltered = state => state.dsdStabilityStatusByPartner.listFiltered;

const ListUnfilteredStability = state => state.dsdAppointmentDurationByPartner.listUnfiltered;
const listFilteredStability = state => state.dsdAppointmentDurationByPartner.listFiltered;

const ListUnfilteredCurrentOnART = state => state.currentOnArtDistributionByPartner.listUnfiltered;
const listFilteredCurrentOnART  = state => state.currentOnArtDistributionByPartner.listFiltered;

const filtered = state => state.filters.filtered;

export const getStabilityStatusByPartner = createSelector(
    [ListUnfilteredStability, ListUnfilteredCurrentOnART, listFilteredStability, listFilteredCurrentOnART, filtered],
    (ListUnfilteredStability, ListUnfilteredCurrentOnART, listFilteredStability, listFilteredCurrentOnART, filtered) => {
        const list = filtered ? listFilteredStability : ListUnfilteredStability;
        const listCurrentOnART = filtered ? listFilteredCurrentOnART : ListUnfilteredCurrentOnART;

        const stability = [];

        let partners = _.uniqBy(list, 'partner');
        partners = partners.map(obj => obj.partner ? obj.partner.toUpperCase() : "");
        for (const partner of partners) {
            const currentOnARTExcludedAgeGroups = listCurrentOnART.filter(obj => obj.ageGroup !== '<1'
                && obj.ageGroup !== '1-4'
                && obj.ageGroup !== '5-9'
                && obj.ageGroup !== '10-14'
                && obj.ageGroup !== '15-19');

            const selectedPartner = currentOnARTExcludedAgeGroups.filter(obj => obj.CTPartner ? obj.CTPartner.toUpperCase() === partner : null);

            const withExcludedAgeGroups = list.filter(obj => obj.ageGroup !== 'Under 1'
                && obj.ageGroup !== '1 to 4'
                && obj.ageGroup !== '5 to 9'
                && obj.ageGroup !== '10 to 14'
                && obj.ageGroup !== '15 to 19');

            const partnerData = withExcludedAgeGroups.filter(obj => obj.partner ? obj.partner.toUpperCase() === partner : []);
            if (selectedPartner.length > 0 && partnerData.length > 0) {
                const partnerStablePatients = _.sumBy(partnerData, 'stablePatients');
                const txCurr = _.sumBy(selectedPartner, 'txCurr');

                stability.push({
                    name: partner,
                    y: Math.round(((partnerStablePatients/txCurr)*100)) > 100 ? 100 : Math.round(((partnerStablePatients/txCurr)*100)),
                    text:  '<b>Stable Patients: ' + partnerStablePatients + ' </b><br/> <b>Txcurr:' + txCurr + '</b>'
                });
            } else {
                stability.push({
                    name: partner,
                    y: 0,
                    text:  0
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
