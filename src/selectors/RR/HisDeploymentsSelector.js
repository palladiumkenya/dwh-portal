import { createSelector } from 'reselect';

const listStatusUnfiltered = state => state.hisFacilityStatus.listUnfiltered;
const listStatusFiltered = state => state.hisFacilityStatus.listFiltered;
const filtered = state => state.filters.filtered;

const listStatusByPartnerUnfiltered = state => state.hisFacilityStatusByPartner.listUnfiltered;
const listStatusByPartnerFiltered = state => state.hisFacilityStatusByPartner.listFiltered;

const listLevelByPartnerUnfiltered = state => state.hisFacilityLevelByPartner.listUnfiltered;
const listLevelByPartnerFiltered = state => state.hisFacilityLevelByPartner.listFiltered;

const listLevelByCountyUnfiltered = state => state.hisFacilityLevelByCounty.listUnfiltered;
const listLevelByCountyFiltered = state => state.hisFacilityLevelByCounty.listFiltered;

const listByInfrastructureUnfiltered = state => state.hisFacilityByInfrastructure.listUnfiltered;
const listByInfrastructureFiltered = state => state.hisFacilityByInfrastructure.listFiltered;

const listLinelistUnfiltered = state => state.hisFacilityLinelist.listUnfiltered;
const listLinelistFiltered = state => state.hisFacilityLinelist.listFiltered;
const listLinelistLoading = state => state.hisFacilityLinelist.loading;

const listTxcurrUnfiltered = state => state.hisFacilityTxcurr.listUnfiltered;
const listTxcurrFiltered = state => state.hisFacilityTxcurr.listFiltered;
const listTxcurrLoading = state => state.hisFacilityTxcurr.loading;

export const getFacilityStatus = createSelector(
    [listStatusUnfiltered, listStatusFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let active = list.find(x => x.EMR_Status.toLowerCase() === 'active')?.facilities
        let discontinued = list.find(x => x.EMR_Status.toLowerCase() === "discontinued")?.facilities
        let stalled = list.find(x => x.EMR_Status.toLowerCase() === "stalled/inactive")?.facilities + list.find(x => x.EMR_Status.toLowerCase() === "inactive")?.facilities

        return { active, discontinued, stalled };
    }
);

export const getFacilityStatusByPartner = createSelector(
    [listStatusByPartnerUnfiltered, listStatusByPartnerFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let data = list.reduce((acc, curr) => {
            const { facilities, EMR_Status, PartnerName } = curr
            if(!acc[PartnerName]) {
                acc[PartnerName] = {
                    "PartnerName": PartnerName,
                    "Active": 0,
                    "Discontinued": 0,
                    "Inactive/Stalled": 0,
                    "Total": 0
                }
            }
            const statusKey = (EMR_Status === "Stalled/Inactive" || EMR_Status === "Inactive") ? "Inactive/Stalled" : EMR_Status;

            acc[PartnerName][statusKey] += parseInt(facilities);
            acc[PartnerName].Total += parseInt(facilities);
            return acc
        }, {});
        let formattedResult = Object.values(data);
        formattedResult.sort((a, b) => b.Active - a.Active);
        formattedResult = formattedResult.map(partner => {
            partner.activePerc = partner.Total ? (partner.Active/partner.Total)*100 : 0
            return partner
        }).sort((a, b) => b.activePerc - a.activePerc)

        const partnerNames = formattedResult.map(i => i.PartnerName?.toUpperCase())
        const actives = formattedResult.map(i => i.Active)
        const discontinueds = formattedResult.map(i => i.Discontinued)
        const inactives = formattedResult.map(i => i["Inactive/Stalled"])

        return { partnerNames, actives, discontinueds, inactives }
    }
);

export const getFacilityByInfrastructure = createSelector(
    [listByInfrastructureUnfiltered, listByInfrastructureFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let data = list.reduce((acc, curr) => {
            const { facilities, InfrastructureType, PartnerName } = curr
            if(!acc[PartnerName]) {
                acc[PartnerName] = {
                    "PartnerName": PartnerName,
                    "On Premises": 0,
                    "On Cloud": 0,
                    "Total": 0
                }
            }

            acc[PartnerName][InfrastructureType] += parseInt(facilities);
            acc[PartnerName].Total += parseInt(facilities);
            return acc
        }, {});
        let formattedResult = Object.values(data);
        formattedResult.sort((a, b) => b["On Premises"] - a["On Premises"]);
        formattedResult = formattedResult.map(partner => {
            partner.onPremPerc = partner.Total ? (partner["On Premises"]/partner.Total)*100 : 0
            return partner
        }).sort((a, b) => b.onPremPerc - a.onPremPerc)

        const partnerNames = formattedResult.map(i => i.PartnerName?.toUpperCase())
        const onPremises = formattedResult.map(i => i["On Premises"])
        const onCloud = formattedResult.map(i => i["On Cloud"])

        return { partnerNames, onPremises, onCloud }
    }
);

export const getFacilityLevelByPartner = createSelector(
    [listLevelByPartnerUnfiltered, listLevelByPartnerFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let data = list.reduce((acc, curr) => {
            const { facilities, Keph_level, PartnerName } = curr
            if(!acc[PartnerName]) {
                acc[PartnerName] = {
                    "PartnerName": PartnerName,
                    "Level 1": 0,
                    "Level 2": 0,
                    "Level 3": 0,
                    "Level 4": 0,
                    "Level 5": 0,
                    "Level 6": 0,
                    "Total": 0
                }
            }

            acc[PartnerName][Keph_level] += parseInt(facilities);
            acc[PartnerName].Total += parseInt(facilities);
            return acc
        }, {});
        let formattedResult = Object.values(data);
        formattedResult.sort((a, b) => b["Level 2"] - a["Level 2"]);
        formattedResult = formattedResult.map(partner => {
            partner.lvl2Perc = partner.Total ? (partner["Level 2"]/partner.Total)*100 : 0
            return partner
        }).sort((a, b) => b.lvl2Perc - a.lvl2Perc)

        const partnerNames = formattedResult.map(i => i.PartnerName?.toUpperCase())
        const lvl1 = formattedResult.map(i => i["Level 1"])
        const lvl2 = formattedResult.map(i => i["Level 2"])
        const lvl3 = formattedResult.map(i => i["Level 3"])
        const lvl4 = formattedResult.map(i => i["Level 4"])
        const lvl5 = formattedResult.map(i => i["Level 5"])
        const lvl6 = formattedResult.map(i => i["Level 6"])

        return { partnerNames, lvl1, lvl2, lvl3, lvl4, lvl5, lvl6 }
    }
);

export const getFacilityLevelByCounty = createSelector(
    [listLevelByCountyUnfiltered, listLevelByCountyFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let data = list.reduce((acc, curr) => {
            const { facilities, Keph_level, County } = curr
            if(!acc[County]) {
                acc[County] = {
                    "County": County,
                    "Level 1": 0,
                    "Level 2": 0,
                    "Level 3": 0,
                    "Level 4": 0,
                    "Level 5": 0,
                    "Level 6": 0,
                    "Total": 0
                }
            }

            acc[County][Keph_level] += parseInt(facilities);
            acc[County].Total += parseInt(facilities);
            return acc
        }, {});
        let formattedResult = Object.values(data);
        formattedResult.sort((a, b) => b["Level 2"] - a["Level 2"]);
        formattedResult = formattedResult.map(partner => {
            partner.lvl2Perc = partner.Total ? (partner["Level 2"]/partner.Total)*100 : 0
            return partner
        }).sort((a, b) => b.lvl2Perc - a.lvl2Perc)

        const counties = formattedResult.map(i => i.County?.toUpperCase())
        const lvl1 = formattedResult.map(i => i["Level 1"])
        const lvl2 = formattedResult.map(i => i["Level 2"])
        const lvl3 = formattedResult.map(i => i["Level 3"])
        const lvl4 = formattedResult.map(i => i["Level 4"])
        const lvl5 = formattedResult.map(i => i["Level 5"])
        const lvl6 = formattedResult.map(i => i["Level 6"])

        return { counties, lvl1, lvl2, lvl3, lvl4, lvl5, lvl6 }
    }
);

export const getFacilityLinelist = createSelector(
    [listLinelistUnfiltered, listLinelistFiltered, filtered, listLinelistLoading],
    (listUnfiltered, listFiltered, filtered, loading) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return { list, loading };
    }
);

export const getFacilityTxCurr = createSelector(
    [listTxcurrUnfiltered, listTxcurrFiltered, filtered, listTxcurrLoading],
    (listUnfiltered, listFiltered, filtered, loading) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let data = list.map((d) => d.KEPH_Level === null ? { 'KEPH_Level': 'Missing', ...d} : {...d})

        return { 'list': data, loading };
    }
);
