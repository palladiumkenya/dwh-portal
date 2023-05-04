import * as actionTypes from "../../actions/types";

const initialState = {
    filtered: false,
    noCache: false,
    counties: [],
    subCounties: [],
    facilities: [],
    partners: [],
    agencies: [],
    projects: [],
    genders: [],
    datimAgeGroups: [],
    datimAgePopulation: [],
    latestPregnancies: [],
    populationTypes: [],
    fromDate: '',
    toDate: '',
    indicators: 'Tx_Curr',
    emr: [],
    countyFilterEnabled: true,
    subCountyFilterEnabled: true,
    facilityFilterEnabled: true,
    partnerFilterEnabled: true,
    agencyFilterEnabled: true,
    projectFilterEnabled: false,
    fromDateFilterEnabled: false,
    toDateFilterEnabled: false,
    genderFilterEnabled: false,
    datimAgeGroupFilterEnabled: false,
    datimAgePopulationFilterEnabled: false,
    latestPregnancyFilterEnabled: false,
    populationTypeFilterEnabled: false,
    indicatorFilterEnabled: false,
    emrFilterEnabled: false,
};

export default (state = initialState, action) => {
    let filtered = false;
    switch (action.type) {
        case actionTypes.FILTER_BY_COUNTY:
            filtered =
                action.payload.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                counties: action.payload.counties,
            };
        case actionTypes.FILTER_BY_SUB_COUNTY:
            filtered =
                state.counties.length > 0 ||
                action.payload.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                subCounties: action.payload.subCounties,
            };
        case actionTypes.FILTER_BY_FACILITY:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                action.payload.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                facilities: action.payload.facilities,
            };
        case actionTypes.FILTER_BY_PARTNER:
            filtered = state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                action.payload.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                partners: action.payload.partners,
            };
        case actionTypes.FILTER_BY_AGENCY:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                action.payload.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                agencies: action.payload.agencies,
            };
        case actionTypes.FILTER_BY_PROJECT:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                action.payload.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                projects: action.payload.projects,
            };
        case actionTypes.FILTER_BY_FROM_DATE:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                action.payload.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                fromDate: action.payload.fromDate,
            };
        case actionTypes.FILTER_BY_TO_DATE:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                action.payload.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                toDate: action.payload.toDate,
            };
        case actionTypes.FILTER_BY_GENDER:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                action.payload.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                genders: action.payload.genders,
            };
        case actionTypes.FILTER_BY_INDICATOR:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                indicators: action.payload.indicators,
            };
        case actionTypes.FILTER_BY_DATIM_AGE_GROUP:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                action.payload.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                datimAgeGroups: action.payload.datimAgeGroups,
            };
        case actionTypes.FILTER_BY_EMR_TYPE:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                action.payload.emr.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.populationTypes.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                emr: action.payload.emr,
            };
        case actionTypes.FILTER_BY_DATIM_AGE_POPULATION:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                action.payload.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                datimAgePopulation: action.payload.datimAgePopulation,
            };
        case actionTypes.FILTER_BY_POPULATION_TYPE:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                action.payload.populationTypes.length > 0 ||
                state.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                populationTypes: action.payload.populationTypes,
            };
        case actionTypes.FILTER_BY_LATEST_PREGNANCY:
            filtered =
                state.counties.length > 0 ||
                state.subCounties.length > 0 ||
                state.facilities.length > 0 ||
                state.partners.length > 0 ||
                state.agencies.length > 0 ||
                state.projects.length > 0 ||
                state.genders.length > 0 ||
                state.datimAgeGroups.length > 0 ||
                state.datimAgePopulation.length > 0 ||
                state.populationTypes.length > 0 ||
                action.payload.latestPregnancies.length > 0 ||
                state.fromDate !== '' ||
                state.toDate !== '' ||
                false;
            return {
                ...state,
                filtered,
                latestPregnancies: action.payload.latestPregnancies,
            };
        case actionTypes.ENABLE_COUNTY_FILTER:
            return {
                ...state,
                countyFilterEnabled: true,
            };
        case actionTypes.DISABLE_COUNTY_FILTER:
            return {
                ...state,
                countyFilterEnabled: false,
                counties: [],
            };
        case actionTypes.ENABLE_SUB_COUNTY_FILTER:
            return {
                ...state,
                subCountyFilterEnabled: true,
            };
        case actionTypes.DISABLE_SUB_COUNTY_FILTER:
            return {
                ...state,
                subCountyFilterEnabled: false,
                subCounties: [],
            };
        case actionTypes.ENABLE_FACILITY_FILTER:
            return {
                ...state,
                facilityFilterEnabled: true,
            };
        case actionTypes.DISABLE_FACILITY_FILTER:
            return {
                ...state,
                facilityFilterEnabled: false,
                facilities: [],
            };
        case actionTypes.ENABLE_PARTNER_FILTER:
            return {
                ...state,
                partnerFilterEnabled: true,
            };
        case actionTypes.DISABLE_PARTNER_FILTER:
            return {
                ...state,
                partnerFilterEnabled: false,
                partners: [],
            };
        case actionTypes.ENABLE_INDICATOR_FILTER:
            return {
                ...state,
                indicatorFilterEnabled: true,
            };
        case actionTypes.DISABLE_INDICATOR_FILTER:
            return {
                ...state,
                indicatorFilterEnabled: false,
                indicators: '',
            };
        case actionTypes.ENABLE_EMR_TYPE_FILTER:
            return {
                ...state,
                emrFilterEnabled: true,
            };
        case actionTypes.DISABLE_EMR_TYPE_FILTER:
            return {
                ...state,
                emrFilterEnabled: false,
                emr: [],
            };
        case actionTypes.ENABLE_AGENCY_FILTER:
            return {
                ...state,
                agencyFilterEnabled: true,
            };
        case actionTypes.DISABLE_AGENCY_FILTER:
            return {
                ...state,
                agencyFilterEnabled: false,
                agencies: [],
            };
        case actionTypes.ENABLE_PROJECT_FILTER:
            return {
                ...state,
                projectFilterEnabled: true,
            };
        case actionTypes.DISABLE_PROJECT_FILTER:
            return {
                ...state,
                projectFilterEnabled: false,
                projects: [],
            };
        case actionTypes.ENABLE_FROM_DATE_FILTER:
            return {
                ...state,
                fromDateFilterEnabled: true,
            };
        case actionTypes.DISABLE_FROM_DATE_FILTER:
            return {
                ...state,
                fromDateFilterEnabled: false,
                fromDate: '',
            };
        case actionTypes.ENABLE_TO_DATE_FILTER:
            return {
                ...state,
                toDateFilterEnabled: true,
            };
        case actionTypes.DISABLE_TO_DATE_FILTER:
            return {
                ...state,
                toDateFilterEnabled: false,
                toDate: '',
            };
        case actionTypes.ENABLE_GENDER_FILTER:
            return {
                ...state,
                genderFilterEnabled: true,
            };
        case actionTypes.DISABLE_GENDER_FILTER:
            return {
                ...state,
                genderFilterEnabled: false,
                genders: [],
            };
        case actionTypes.ENABLE_DATIM_AGE_GROUP_FILTER:
            return {
                ...state,
                datimAgeGroupFilterEnabled: true,
            };
        case actionTypes.DISABLE_DATIM_AGE_GROUP_FILTER:
            return {
                ...state,
                datimAgeGroupFilterEnabled: false,
                datimAgeGroups: [],
            };
        case actionTypes.ENABLE_DATIM_AGE_POPULATION_FILTER:
            return {
                ...state,
                datimAgePopulationFilterEnabled: true,
            };
        case actionTypes.DISABLE_DATIM_AGE_POPULATION_FILTER:
            return {
                ...state,
                datimAgePopulationFilterEnabled: false,
                datimAgePopulation: [],
            };
        case actionTypes.ENABLE_POPULATION_TYPE_FILTER:
            return {
                ...state,
                populationTypeFilterEnabled: true,
            };
        case actionTypes.DISABLE_POPULATION_TYPE_FILTER:
            return {
                ...state,
                populationTypeFilterEnabled: false,
                populationTypes: [],
            };
        case actionTypes.ENABLE_LATEST_PREGNANCY_FILTER:
            return {
                ...state,
                latestPregnancyFilterEnabled: true,
            };
        case actionTypes.DISABLE_LATEST_PREGNANCY_FILTER:
            return {
                ...state,
                latestPregnancyFilterEnabled: false,
                latestPregnancies: [],
            };
        case actionTypes.ENABLE_CACHE:
            return {
                ...state,
                noCache: false,
            };
        case actionTypes.DISABLE_CACHE:
            return {
                ...state,
                noCache: true,
            };
        default:
            return state;
    }
}
