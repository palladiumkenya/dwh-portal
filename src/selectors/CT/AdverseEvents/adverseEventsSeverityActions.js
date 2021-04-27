import { createSelector } from 'reselect';
import * as ageGroups from '../../AgeGroupsArray';

const listUnfiltered = state => state.adverseEventsSeverityActions.listUnfiltered;
const listFiltered = state => state.adverseEventsSeverityActions.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsSeverityActions = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return getAdverseEventsSeverityTabs(list, 'adult');
    }
);

export const getAdverseEventsSeverityCalHIVActions = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return getAdverseEventsSeverityTabs(list, 'calhiv');
    }
);

export const getAdverseEventsSeverityTabs = (list, tab) => {
    const ageGroup = tab === 'adult' ? ageGroups.adultAgeGroups : ageGroups.childrenAgeGroups;

    const undocumented = list.filter(obj => obj.AdverseEventActionTaken === 'Undocumented' && ageGroup.includes(obj.ageGroup));
    const mild_undocumented = undocumented.length > 0 ? undocumented.filter(obj => obj.Severity === 'Mild') : [];
    const moderate_undocumented = undocumented.length > 0 ? undocumented.filter(obj => obj.Severity === 'Moderate') : [];
    const severe_undocumented = undocumented.length > 0 ? undocumented.filter(obj => obj.Severity === 'Severe') : [];
    const unknown_undocumented = undocumented.length > 0 ? undocumented.filter(obj => obj.Severity === 'Unknown') : [];
    const mild_undocumented_total = mild_undocumented.length > 0 ? mild_undocumented.map(item => item.total).reduce((i, j) => i + j) : 0;
    const moderate_undocumented_total = moderate_undocumented.length > 0 ? moderate_undocumented.map(item => item.total).reduce((j, k) => j + k) : 0;
    const severe_undocumented_total = severe_undocumented.length > 0 ? severe_undocumented.map(item => item.total).reduce((m, n) => m + n) : 0;
    const unknown_undocumented_total = unknown_undocumented.length > 0 ? unknown_undocumented.map(item => item.total).reduce((x, y) => x + y) : 0;

    const medicineNotChanged = list.filter(obj => obj.AdverseEventActionTaken === 'Medicine not changed' && ageGroup.includes(obj.ageGroup));
    const mild_medicineNotChanged = medicineNotChanged.length > 0 ? medicineNotChanged.filter(obj => obj.Severity === 'Mild') : [];
    const moderate_medicineNotChanged = medicineNotChanged.length > 0 ? medicineNotChanged.filter(obj => obj.Severity === 'Moderate') : [];
    const severe_medicineNotChanged = medicineNotChanged.length > 0 ? medicineNotChanged.filter(obj => obj.Severity === 'Severe') : [];
    const unknown_medicineNotChanged = medicineNotChanged.length > 0 ? medicineNotChanged.filter(obj => obj.Severity === 'Unknown') : [];
    const mild_medicineNotChanged_total = mild_medicineNotChanged.length > 0 ? mild_medicineNotChanged.map(item => item.total).reduce((i, j) => i + j) : 0;
    const moderate_medicineNotChanged_total = moderate_medicineNotChanged.length > 0 ? moderate_medicineNotChanged.map(item => item.total).reduce((j, k) => j + k) : 0;
    const severe_medicineNotChanged_total = severe_medicineNotChanged.length > 0 ? severe_medicineNotChanged.map(item => item.total).reduce((m, n) => m + n) : 0;
    const unknown_medicineNotChanged_total = unknown_medicineNotChanged.length > 0 ? unknown_medicineNotChanged.map(item => item.total).reduce((x, y) => x + y) : 0;

    const doseReduced = list.filter(obj => obj.AdverseEventActionTaken === 'Dose reduced' && ageGroup.includes(obj.ageGroup));
    const mild_doseReduced = doseReduced.length > 0 ? doseReduced.filter(obj => obj.Severity === 'Mild') : [];
    const moderate_doseReduced = doseReduced.length > 0 ? doseReduced.filter(obj => obj.Severity === 'Moderate') : [];
    const severe_doseReduced = doseReduced.length > 0 ? doseReduced.filter(obj => obj.Severity === 'Severe') : [];
    const unknown_doseReduced = doseReduced.length > 0 ? doseReduced.filter(obj => obj.Severity === 'Unknown') : [];
    const mild_doseReduced_total = mild_doseReduced.length > 0 ? mild_doseReduced.map(item => item.total).reduce((i, j) => i + j) : 0;
    const moderate_doseReduced_total = moderate_doseReduced.length > 0 ? moderate_doseReduced.map(item => item.total).reduce((j, k) => j + k) : 0;
    const severe_doseReduced_total = severe_doseReduced.length > 0 ? severe_doseReduced.map(item => item.total).reduce((m, n) => m + n) : 0;
    const unknown_doseReduced_total = unknown_doseReduced.length > 0 ? unknown_doseReduced.map(item => item.total).reduce((x, y) => x + y) : 0;

    const medicineWithdrawn = list.filter(obj => obj.AdverseEventActionTaken === 'Medicine causing AE substituted/withdrawn' && ageGroup.includes(obj.ageGroup));
    const mild_medicine_withdrawn = medicineWithdrawn.length > 0 ? medicineWithdrawn.filter(obj => obj.Severity === 'Mild') : [];
    const moderate_medicine_withdrawn = medicineWithdrawn.length > 0 ? medicineWithdrawn.filter(obj => obj.Severity === 'Moderate') : [];
    const severe_medicine_withdrawn = medicineWithdrawn.length > 0 ? medicineWithdrawn.filter(obj => obj.Severity === 'Severe') : [];
    const unknown_medicine_withdrawn = medicineWithdrawn.length > 0 ? medicineWithdrawn.filter(obj => obj.Severity === 'Unknown') : [];
    const mild_medicine_withdrawn_total = mild_medicine_withdrawn.length > 0 ? mild_medicine_withdrawn.map(item => item.total).reduce((i, j) => i + j) : 0;
    const moderate_medicine_withdrawn_total = moderate_medicine_withdrawn.length > 0 ? moderate_medicine_withdrawn.map(item => item.total).reduce((j, k) => j + k) : 0;
    const severe_medicine_withdrawn_total = severe_medicine_withdrawn.length > 0 ? severe_medicine_withdrawn.map(item => item.total).reduce((m, n) => m + n) : 0;
    const unknown_medicine_withdrawn_total = unknown_medicine_withdrawn.length > 0 ? unknown_medicine_withdrawn.map(item => item.total).reduce((x, y) => x + y) : 0;

    const allDrugsStopped = list.filter(obj => obj.AdverseEventActionTaken === 'All drugs stopped' && ageGroup.includes(obj.ageGroup));
    const mild_allDrugsStopped = allDrugsStopped.length > 0 ? allDrugsStopped.filter(obj => obj.Severity === 'Mild') : [];
    const moderate_allDrugsStopped = allDrugsStopped.length > 0 ? allDrugsStopped.filter(obj => obj.Severity === 'Moderate') : [];
    const severe_allDrugsStopped = allDrugsStopped.length > 0 ? allDrugsStopped.filter(obj => obj.Severity === 'Severe') : [];
    const unknown_allDrugsStopped = allDrugsStopped.length > 0 ? allDrugsStopped.filter(obj => obj.Severity === 'Unknown') : [];
    const mild_all_drugs_stopped_total = mild_allDrugsStopped.length > 0 ? mild_allDrugsStopped.map(item => item.total).reduce((i, j) => i + j) : 0;
    const moderate_all_drugs_stopped_total = moderate_allDrugsStopped.length > 0 ? moderate_allDrugsStopped.map(item => item.total).reduce((j, k) => j + k) : 0;
    const severe_all_drugs_stopped_total = severe_allDrugsStopped.length > 0 ? severe_allDrugsStopped.map(item => item.total).reduce((m, n) => m + n) : 0;
    const unknown_all_drugs_stopped_total = unknown_allDrugsStopped.length > 0 ? unknown_allDrugsStopped.map(item => item.total).reduce((x, y) => x + y) : 0;

    return {
        mild_undocumented_total, moderate_undocumented_total, severe_undocumented_total, unknown_undocumented_total,
        mild_medicineNotChanged_total, moderate_medicineNotChanged_total, severe_medicineNotChanged_total, unknown_medicineNotChanged_total,
        mild_doseReduced_total, moderate_doseReduced_total, severe_doseReduced_total, unknown_doseReduced_total,
        mild_medicine_withdrawn_total, moderate_medicine_withdrawn_total, severe_medicine_withdrawn_total, unknown_medicine_withdrawn_total,
        mild_all_drugs_stopped_total, moderate_all_drugs_stopped_total, severe_all_drugs_stopped_total, unknown_all_drugs_stopped_total,
    };
};
