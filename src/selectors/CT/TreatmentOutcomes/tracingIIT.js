import { createSelector } from 'reselect';
import _ from 'lodash';

const listUnfiltered = (state) => state.IITTracing.listUnfiltered;
const listFiltered = (state) => state.IITTracing.listFiltered;
const listUnfilteredOutcomes = (state) => state.IITTracingOutcomes.listUnfiltered;
const listFilteredOutcomes = (state) => state.IITTracingOutcomes.listFiltered;

const filtered = state => state.filters.filtered;

export const getIITTracing = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let data = [];
        let contact = 0;
        let nocontact = 0;

        list.forEach((e) => {
            nocontact = e.nottracedPatients;
            contact = e.tracedPatients;
        });
        data = [nocontact, contact];

        return { data };
    }
);

export const getIITTracingOutcomes = createSelector(
    [listUnfilteredOutcomes, listFilteredOutcomes, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let data =  []
        let contact = []
        let nocontact = []


        list.forEach(e =>{
            if (
                _.includes(
                    [
                        'NO CONTACT',
                        'NOT KNOWN IN THE LOCALITY',
                        'PATIENT NOT FOUND',
                        'WAS NOT REACHED THROUGH THE PHONE CALL',
                    ],
                    e.TracingOutcome.toUpperCase()
                )
            )
                nocontact.push(e);
            if (
                _.includes(
                    [
                        'CONTACT',
                        'DIED',
                        'PATIENT RELOCATED',
                        'PROMISED TO ATTEND CLINIC',
                        'FOUND BUT REFUSED TREATMENT',
                        'CLIENT TRACED BACK AND ATTENDED CLINIC',
                        'FORGETTING APPOINTMENTS',
                        'DOES NOT PERCEIVE APPOINTMENTS AS NECESSARY',
                        'ADMITTED AT HOSPITAL',
                        'REFILLED DRUGS IN ANOTHER CLINIC',
                        'STIGMA',
                        'TRANSFER OUT',
                        'PATIENT SEEKING CARE FROM MULTIPLE PROVIDERS',
                    ],
                    e.TracingOutcome.toUpperCase()
                )
            )
                contact.push(e);
        })
        
        data = [chartFormat(nocontact), chartFormat(contact)];

        return { data };
    }
);

const chartFormat = (data) =>{
    // Extracting labels and patient counts
    let labels = data.map((item) => item.TracingOutcome);
    let counts = data.map((item) => item.patients);

    // Calculating total number of patients
    const totalPatients = counts.reduce((sum, count) => sum + count, 0);

    // Calculating percentages and creating an array of objects
    let percentages = counts.map((count, index) => ({
        label: labels[index],
        count: count,
        percentage: Number(((count / totalPatients) * 100).toFixed(2)),
    }));

    // Sorting the array by percentage in descending order
    percentages.sort((a, b) => b.percentage - a.percentage);

    labels = percentages.map((item) => item.label.toUpperCase());
    counts = percentages.map((item) => item.count);
    percentages = percentages.map((item) => item.percentage);

    return { labels, percentages, counts };
}