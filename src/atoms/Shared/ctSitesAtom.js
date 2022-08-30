import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import _ from 'lodash';

import { filtersAtom } from './filtersAtom';

const { persistAtom } = recoilPersist();


export const ctSitesFilterAtom = atom({
    key: 'ctSitesFilter',
    default: {
        lastFetch: null,
        loading: false,
        list: [],
        counties: [],
        subCounties: [],
        facilities: [],
        partners: [],
        agencies: [],
        projects: [],
    },
    effects_UNSTABLE: [
        persistAtom
    ],
});

export const getCounties = selector({
    key: 'selectorCtSitesCounties',
    get: ({ get }) => {
        const filteredPartners = get(filtersAtom).partners;
        const counties = get(ctSitesFilterAtom).counties;
        const list = get(ctSitesFilterAtom).list;

        return filteredPartners.length === 0
            ? counties
            : _.chain(list)
                .filter((list) => filteredPartners.includes(list.partner))
                .map((l) => (l.county ? l.county.toUpperCase() : 'No County'))
                .uniq()
                .sort()
                .value();
    },
});

export const getSubCounties = selector({
    key: 'selectorCtSitesSubCounties',
    get: ({ get }) => {
        const filteredPartners = get(filtersAtom).partners;
        const filteredCounties = get(filtersAtom).counties;
        const subCounties = get(ctSitesFilterAtom).subCounties;
        const list = get(ctSitesFilterAtom).list;

        return filteredCounties.length === 0 && filteredPartners.length === 0
            ? subCounties
            : _.chain(list)
                .filter((list) => {
                    let val = false;
                    if (
                        filteredCounties.length > 0 &&
                        filteredPartners.length > 0
                    ) {
                        val =
                            filteredCounties.includes(
                                list.county.toUpperCase()
                            ) && filteredPartners.includes(list.partner);
                    } else if (filteredCounties.length > 0) {
                        val = filteredCounties.includes(
                            list.county.toUpperCase()
                        );
                    } else if (filteredPartners.length > 0) {
                        val = filteredPartners.includes(list.partner);
                    }
                    return val;
                })
                .map((l) =>
                    l.subCounty ? l.subCounty.toUpperCase() : 'No Sub County'
                )
                .uniq()
                .sort()
                .value();
    },
});

export const getFacilities = selector({
    key: 'selectorCtSitesFacilities',
    get: ({ get }) => {
        const filteredPartners = get(filtersAtom).partners;
        const filteredCounties = get(filtersAtom).counties;
        const filteredSubCounties = get(filtersAtom).subCounties;
        const facilities = get(ctSitesFilterAtom).facilities;
        const list = get(ctSitesFilterAtom).list;

        return filteredCounties.length === 0 &&
            filteredSubCounties.length === 0 &&
            filteredPartners.length === 0
            ? facilities
            : _.chain(list)
                .filter((list) => {
                    let val = false;
                    if (
                        filteredCounties.length > 0 &&
                        filteredSubCounties.length > 0 &&
                        filteredPartners.length > 0
                    ) {
                        val =
                            filteredCounties.includes(
                                list.county.toUpperCase()
                            ) &&
                            filteredSubCounties.includes(
                                list.subCounty.toUpperCase()
                            ) &&
                            filteredPartners.includes(list.partner);
                    } else if (
                        filteredCounties.length > 0 &&
                        filteredSubCounties.length
                    ) {
                        val =
                            filteredCounties.includes(
                                list.county.toUpperCase()
                            ) &&
                            filteredSubCounties.includes(
                                list.subCounty.toUpperCase()
                            );
                    } else if (
                        filteredCounties.length > 0 &&
                        filteredPartners.length > 0
                    ) {
                        val =
                            filteredCounties.includes(
                                list.county.toUpperCase()
                            ) && filteredPartners.includes(list.partner);
                    } else if (
                        filteredSubCounties.length > 0 &&
                        filteredPartners.length > 0
                    ) {
                        val =
                            filteredSubCounties.includes(
                                list.subCounty.toUpperCase()
                            ) && filteredPartners.includes(list.partner);
                    } else if (filteredCounties.length > 0) {
                        val = filteredCounties.includes(
                            list.county.toUpperCase()
                        );
                    } else if (filteredSubCounties.length > 0) {
                        val = filteredSubCounties.includes(
                            list.subCounty.toUpperCase()
                        );
                    } else if (filteredPartners.length > 0) {
                        val = filteredPartners.includes(list.partner);
                    }
                    return val;
                })
                .map((l) => (l.facility ? l.facility : 'No Facility'))
                .uniq()
                .sort()
                .value();
    }
})

export const getPartners = selector({
    key: 'selectorCtSitesPartners',
    get: ({ get }) => {
        const filteredCounties = get(filtersAtom).counties;
        const filteredSubCounties = get(filtersAtom).subCounties;
        const partners = get(ctSitesFilterAtom).partners;
        const list = get(ctSitesFilterAtom).list;
        
        return filteredCounties.length === 0 && filteredSubCounties.length === 0
            ? partners
            : _.chain(list)
                .filter((list) => {
                    let val = false;
                    if (
                        filteredCounties.length > 0 &&
                        filteredSubCounties.length > 0
                    ) {
                        val =
                            filteredCounties.includes(
                                list.county.toUpperCase()
                            ) &&
                            filteredSubCounties.includes(
                                list.subCounty.toUpperCase()
                            );
                    } else if (filteredCounties.length > 0) {
                        val = filteredCounties.includes(
                            list.county.toUpperCase()
                        );
                    } else if (filteredSubCounties.length > 0) {
                        val = filteredSubCounties.includes(
                            list.subCounty.toUpperCase()
                        );
                    }
                    return val;
                })
                .map((l) => (l.partner ? l.partner : 'No Partner'))
                .uniq()
                .sort()
                .value();
        
    },
});

export const getAgencies = selector({
    key: 'selectorCtSitesAgencies',
    get: ({ get }) => {
        const agencies = get(ctSitesFilterAtom).agencies;
        return agencies;
        
    },
});

export const getProjects = selector({
    key: 'selectorCtSitesProjects',
    get: ({ get }) => {
        const filteredCounties = get(filtersAtom).counties;
        const filteredSubCounties = get(filtersAtom).subCounties;
        const projects = get(ctSitesFilterAtom).projects;
        const list = get(ctSitesFilterAtom).list;


        return filteredCounties.length === 0 && filteredSubCounties.length === 0
            ? projects
            : _.chain(list)
                .filter((list) => {
                    let val = false;
                    if (
                        filteredCounties.length > 0 &&
                        filteredSubCounties.length > 0
                    ) {
                        val =
                            filteredCounties.includes(
                                list.county.toUpperCase()
                            ) &&
                            filteredSubCounties.includes(
                                list.subCounty.toUpperCase()
                            );
                    } else if (filteredCounties.length > 0) {
                        val = filteredCounties.includes(
                            list.county.toUpperCase()
                        );
                    } else if (filteredSubCounties.length > 0) {
                        val = filteredSubCounties.includes(
                            list.subCounty.toUpperCase()
                        );
                    }
                    return val;
                })
                .map((l) => (l.project ? l.project : 'No Project'))
                .uniq()
                .sort()
                .value();
    },
});
