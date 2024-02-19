import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.treatmentOutcomesByFacility.listUnfiltered;
const listFiltered = state => state.treatmentOutcomesByFacility.listFiltered;
const filtered = state => state.filters.filtered;

export const getTreatmentOutcomesByFacility = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let outcomes = [];
        for(let i = 0; i < list.length; i++) {
            if (!outcomes[list[i].facility]) {
                outcomes[list[i].facility] = {
                    county: list[i].county,
                    subCounty: list[i].subCounty,
                    facility: list[i].facility,
                    partner: list[i].partner,
                };
            }
            if (list[i].artOutcome === "ACTIVE") {
                outcomes[list[i].facility].active = parseInt(list[i].totalOutcomes, 10);
            } else if (list[i].artOutcome === "DEAD") {
                outcomes[list[i].facility].dead = parseInt(list[i].totalOutcomes, 10);
            } else if (list[i].artOutcome === 'LOSS TO FOLLOW UP') {
                outcomes[list[i].facility].ltfu = parseInt(list[i].totalOutcomes, 10);
            } else if (list[i].artOutcome === "STOPPED") {
                outcomes[list[i].facility].stopped = parseInt(list[i].totalOutcomes, 10);
            } else if (list[i].artOutcome === 'TRANSFERRED OUT') {
                outcomes[list[i].facility].to = parseInt(list[i].totalOutcomes, 10);
            }
        }
        const data = Object.values(outcomes);
        const columns = [
            { name: 'Facility', selector: 'facility', sortable: true},
            { name: 'Partner', selector: 'partner', sortable: true},
            { name: 'County', selector: 'county', sortable: true},
            { name: 'Sub County', selector: 'subCounty', sortable: true},
            { name: 'Active', selector: 'active', sortable: true, right: true},
            { name: 'Dead', selector: 'dead', sortable: true, right: true},
            { name: 'LTFU', selector: 'ltfu', sortable: true, right: true},
            { name: 'Stopped', selector: 'stopped', sortable: true, right: true },
            { name: 'Transfer Out', selector: 'to', sortable: true, right: true },
        ];
        return { data, columns };
    }
);

export const getTreatmentOutcomesByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const treatmentOutcomesCategories =
            ['ACTIVE', 'DEAD', 'LOSS TO FOLLOW UP', 'STOPPED', 'TRANSFERRED OUT'];
        const countyCategories = _.chain(list)
            .filter(l => l.county && l.artOutcome === 'ACTIVE')
            .map(l => ({ ...l, county: l.county.toUpperCase() }))
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'active': _.sumBy(objs, 'totalOutcomes')
            }))
            .orderBy('active', 'desc')
            .map(l => l.county)
            .uniq()
            .value();
        let data = [];

        for(let i = 0; i < treatmentOutcomesCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < countyCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            if(!list[i].county) {
                continue;
            }
            let outcomeIndex = treatmentOutcomesCategories.indexOf(list[i].artOutcome);
            let countyIndex = countyCategories.indexOf(list[i].county.toUpperCase());
            if(outcomeIndex === -1 || countyIndex === -1 ) { // unsupported
                continue;
            }
            data[outcomeIndex][countyIndex] += parseInt(list[i].totalOutcomes);
        }
        return { data, countyCategories };
    }
);

export const getTreatmentOutcomesByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const treatmentOutcomesCategories =
            ['ACTIVE', 'DEAD', 'LOSS TO FOLLOW UP', 'STOPPED', 'TRANSFERRED OUT']
        const partnerCategories = _.chain(list)
            .filter(l => l.partner && l.artOutcome === 'ACTIVE')
            .map(l => ({ ...l, partner: l.partner.toUpperCase() }))
            .groupBy('partner')
            .map((objs, key) => ({
                'partner': key,
                'active': _.sumBy(objs, 'totalOutcomes')
            }))
            .orderBy('active', 'desc')
            .map(l => l.partner)
            .uniq()
            .value();
        let data = [];
        for(let i = 0; i < treatmentOutcomesCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < partnerCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            if(!list[i].partner) {
                continue;
            }
            let outcomeIndex = treatmentOutcomesCategories.indexOf(list[i].artOutcome);
            let partnerIndex = partnerCategories.indexOf(list[i].partner.toUpperCase());
            if(outcomeIndex === -1 || partnerIndex === -1 ) { // unsupported
                continue;
            }
            data[outcomeIndex][partnerIndex] += parseInt(list[i].totalOutcomes);
        }
        return { data, partnerCategories };
    }
);
