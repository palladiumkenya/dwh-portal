import { createSelector } from 'reselect';

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

        const mild = list.filter(obj => obj.Severity === "Mild");
        const moderate = list.filter(obj => obj.Severity === "Moderate");
        const severe = list.filter(obj => obj.Severity === "Severe");
        const none = list.filter(obj => obj.Severity === "None");
        const unknown = list.filter(obj => obj.Severity === "Unknown");

        if (mild.length > 0) {
            mildVal = mild[0].total;
        }

        if (moderate.length > 0) {
            moderateVal = moderate[0].total;
        }

        if (severe.length > 0) {
            severeVal = severe[0].total;
        }

        if (none.length > 0) {
            noneVal = none[0].total;
        }

        if (unknown.length > 0) {
            unknownVal = unknown[0].total;
        }

        notindictatedVal = noneVal + unknownVal;

        return { mildVal, moderateVal, severeVal, noneVal, unknownVal, notindictatedVal };
    }
);
