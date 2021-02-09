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
            if (list[i].artOutcome === "Active") {
                outcomes[list[i].facility].active = parseInt(list[i].totalOutcomes, 10);
            } else if (list[i].artOutcome === "Dead") {
                outcomes[list[i].facility].dead = parseInt(list[i].totalOutcomes, 10);
            } else if (list[i].artOutcome === "LTFU") {
                outcomes[list[i].facility].ltfu = parseInt(list[i].totalOutcomes, 10);
            } else if (list[i].artOutcome === "Stopped") {
                outcomes[list[i].facility].stopped = parseInt(list[i].totalOutcomes, 10);
            } else if (list[i].artOutcome === "TransferOut") {
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
        const treatmentOutcomesCategories = ['Active', 'Dead', 'LTFU', 'Stopped', 'TransferOut'];
        const countyCategories = [];
        let data = [];
        for(let i = 0; i < list.length; i++) {
            if(!list[i].county) {
                continue;
            }
            if(countyCategories.indexOf(list[i].county.toUpperCase()) === -1){
                countyCategories.push(list[i].county.toUpperCase());
            }
        }
        countyCategories.sort();
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
            data[outcomeIndex][countyIndex] = data[outcomeIndex][countyIndex] + parseInt(list[i].totalOutcomes);
        }
        return { data, countyCategories };
    }
);

export const getTreatmentOutcomesByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const treatmentOutcomesCategories = ['Active', 'Dead', 'LTFU', 'Stopped', 'TransferOut'];
        const partnerCategories = [];
        let data = [];
        for(let i = 0; i < list.length; i++) {
            if(!list[i].partner) {
                continue;
            }
            if(partnerCategories.indexOf(list[i].partner.toUpperCase()) === -1){
                partnerCategories.push(list[i].partner.toUpperCase());
            }
        }
        partnerCategories.sort();
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
            data[outcomeIndex][partnerIndex] = data[outcomeIndex][partnerIndex] + parseInt(list[i].totalOutcomes);
        }
        return { data, partnerCategories };
    }
);