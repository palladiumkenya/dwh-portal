import * as actionTypes from '../types';

export const filterByCounty = counties => ({
    type: actionTypes.FILTER_BY_COUNTY,
    payload: { counties }
});

export const filterBySubCounty = subCounties => ({
    type: actionTypes.FILTER_BY_SUB_COUNTY,
    payload: { subCounties }
});

export const filterByFacility = facilities => ({
    type: actionTypes.FILTER_BY_FACILITY,
    payload: { facilities }
});

export const filterByPartner = partners => ({
    type: actionTypes.FILTER_BY_PARTNER,
    payload: { partners }
});

export const filterByAgency = agencies => ({
    type: actionTypes.FILTER_BY_AGENCY,
    payload: { agencies }
});

export const filterByPBFW = (pbfws) => ({
    type: actionTypes.FILTER_BY_PBFW,
    payload: { pbfws },
});

export const filterByProject = projects => ({
    type: actionTypes.FILTER_BY_PROJECT,
    payload: { projects }
});

export const filterByFromDate = fromDate => ({
    type: actionTypes.FILTER_BY_FROM_DATE,
    payload: { fromDate }
});

export const filterByToDate = toDate => ({
    type: actionTypes.FILTER_BY_TO_DATE,
    payload: { toDate }
});

export const filterByGender = genders => ({
    type: actionTypes.FILTER_BY_GENDER,
    payload: { genders }
});

export const filterByDatimAgeGroup = datimAgeGroups => ({
    type: actionTypes.FILTER_BY_DATIM_AGE_GROUP,
    payload: { datimAgeGroups }
});

export const filterByDatimAgePopulation = datimAgePopulation => ({
    type: actionTypes.FILTER_BY_DATIM_AGE_POPULATION,
    payload: { datimAgePopulation }
});

export const filterByLatestPregnancy = latestPregnancies => ({
    type: actionTypes.FILTER_BY_LATEST_PREGNANCY,
    payload: { latestPregnancies }
});

export const filterByPopulationType = populationTypes => ({
    type: actionTypes.FILTER_BY_POPULATION_TYPE,
    payload: { populationTypes }
});

export const filterByIndicator = indicators => ({
    type: actionTypes.FILTER_BY_INDICATOR,
    payload: { indicators }
});

export const filterByEMR = emr => ({
    type: actionTypes.FILTER_BY_EMR_TYPE,
    payload: { emr }
});

export const enableFromDateFilter = () => ({
    type: actionTypes.ENABLE_FROM_DATE_FILTER
});

export const disableFromDateFilter = () => ({
    type: actionTypes.DISABLE_FROM_DATE_FILTER
});

export const enableToDateFilter = () => ({
    type: actionTypes.ENABLE_TO_DATE_FILTER
});

export const disableToDateFilter = () => ({
    type: actionTypes.DISABLE_TO_DATE_FILTER
});

export const enableAgencyFilter = () => ({
    type: actionTypes.ENABLE_AGENCY_FILTER
});

export const disableAgencyFilter = () => ({
    type: actionTypes.DISABLE_AGENCY_FILTER
});

export const enablePBFWFilter = () => ({
    type: actionTypes.ENABLE_PBFW_FILTER,
});

export const disablePBFWFilter = () => ({
    type: actionTypes.DISABLE_PBFW_FILTER,
});

export const enableFacilityFilter = () => ({
    type: actionTypes.ENABLE_FACILITY_FILTER
});

export const disableFacilityFilter = () => ({
    type: actionTypes.DISABLE_FACILITY_FILTER
});

export const enableGenderFilter = () => ({
    type: actionTypes.ENABLE_GENDER_FILTER
});

export const disableGenderFilter = () => ({
    type: actionTypes.DISABLE_GENDER_FILTER
});

export const enableIndicatorFilter = (tab) => ({
    type: actionTypes.ENABLE_INDICATOR_FILTER
});

export const disableIndicatorFilter = () => ({
    type: actionTypes.DISABLE_INDICATOR_FILTER
});

export const enableDatimAgeGroupFilter = () => ({
    type: actionTypes.ENABLE_DATIM_AGE_GROUP_FILTER
});

export const disableDatimAgeGroupFilter = () => ({
    type: actionTypes.DISABLE_DATIM_AGE_GROUP_FILTER
});

export const enableDatimAgePopulationFilter = () => ({
    type: actionTypes.ENABLE_DATIM_AGE_POPULATION_FILTER
});

export const disableDatimAgePopulationFilter = () => ({
    type: actionTypes.DISABLE_DATIM_AGE_POPULATION_FILTER
});

export const enableLatestPregnancyFilter = () => ({
    type: actionTypes.ENABLE_LATEST_PREGNANCY_FILTER
});

export const disableLatestPregnancyFilter = () => ({
    type: actionTypes.DISABLE_LATEST_PREGNANCY_FILTER
});

export const enablePopulationTypeFilter = () => ({
    type: actionTypes.ENABLE_POPULATION_TYPE_FILTER
});

export const disablePopulationTypeFilter = () => ({
    type: actionTypes.DISABLE_POPULATION_TYPE_FILTER
});

export const enableEMRFilter = () => ({
    type: actionTypes.ENABLE_EMR_TYPE_FILTER
});

export const disableEMRFilter = () => ({
    type: actionTypes.DISABLE_EMR_TYPE_FILTER
});

export const enableCache = () => ({
    type: actionTypes.ENABLE_CACHE
});

export const disableCache = () => ({
    type: actionTypes.DISABLE_CACHE
});
