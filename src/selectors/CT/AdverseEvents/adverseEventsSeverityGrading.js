import { createSelector } from 'reselect';
import * as ageGroups from '../../AgeGroupsArray';

const listUnfiltered = state => state.adverseEventsSeverityGrading.listUnfiltered;
const listFiltered = state => state.adverseEventsSeverityGrading.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsSeverityGrading = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let mildVal = 0;
        let moderateVal = 0;
        let severeVal = 0;
        let noneVal = 0;
        let unknownVal = 0;
        let notindictatedVal = 0;

        const mild = list.filter(obj => obj.Severity === "Mild" && ageGroups.adultAgeGroups.includes(obj.ageGroup));
        const moderate = list.filter(obj => obj.Severity === "Moderate" && ageGroups.adultAgeGroups.includes(obj.ageGroup));
        const severe = list.filter(obj => obj.Severity === "Severe" && ageGroups.adultAgeGroups.includes(obj.ageGroup));
        const none = list.filter(obj => obj.Severity === "None" && ageGroups.adultAgeGroups.includes(obj.ageGroup));
        const unknown = list.filter(obj => obj.Severity === "Unknown" && ageGroups.adultAgeGroups.includes(obj.ageGroup));

        for (const mildElement of mild) {
            mildVal = mildVal + mildElement.total;
        }

        for (const moderateElement of moderate) {
            moderateVal = moderateVal + moderateElement.total;
        }

        for (const severeElement of severe) {
            severeVal = severeVal + severeElement.total;
        }

        for (const noneElement of none) {
            noneVal = noneVal + noneElement.total;
        }

        for (const unknownElement of unknown) {
            unknownVal = unknownVal + unknownElement.total;
        }

        notindictatedVal = noneVal + unknownVal;

        return { mildVal, moderateVal, severeVal, noneVal, unknownVal, notindictatedVal };
    }
);

export const getAdverseEventsSeverityGradingCalHIV = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let mildVal = 0;
        let moderateVal = 0;
        let severeVal = 0;
        let noneVal = 0;
        let unknownVal = 0;
        let notindictatedVal = 0;

        const mild = list.filter(obj => obj.Severity === "Mild" && ageGroups.childrenAgeGroups.includes(obj.ageGroup));
        const moderate = list.filter(obj => obj.Severity === "Moderate" && ageGroups.childrenAgeGroups.includes(obj.ageGroup));
        const severe = list.filter(obj => obj.Severity === "Severe" && ageGroups.childrenAgeGroups.includes(obj.ageGroup));
        const none = list.filter(obj => obj.Severity === "None" && ageGroups.childrenAgeGroups.includes(obj.ageGroup));
        const unknown = list.filter(obj => obj.Severity === "Unknown" && ageGroups.childrenAgeGroups.includes(obj.ageGroup));

        for (const mildElement of mild) {
            mildVal = mildVal + mildElement.total;
        }

        for (const moderateElement of moderate) {
            moderateVal = moderateVal + moderateElement.total;
        }

        for (const severeElement of severe) {
            severeVal = severeVal + severeElement.total;
        }

        for (const noneElement of none) {
            noneVal = noneVal + noneElement.total;
        }

        for (const unknownElement of unknown) {
            unknownVal = unknownVal + unknownElement.total;
        }

        notindictatedVal = noneVal + unknownVal;

        return { mildVal, moderateVal, severeVal, noneVal, unknownVal, notindictatedVal };
    }
)
