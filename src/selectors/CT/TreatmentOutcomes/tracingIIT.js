import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.IITTracing.listUnfiltered;
const listFiltered = (state) => state.IITTracing.listFiltered;
const filtered = state => state.filters.filtered;

export const getIITTracing = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let data =  []
        let contact = 0
        let nocontact = 0


        list.forEach(e =>{
            if(e.TracingOutcome.toUpperCase() === "NO CONTACT")
                nocontact = e.patients
            if(e.TracingOutcome.toUpperCase() === "CONTACT")
                contact = e.patients
        })
        data =[nocontact, contact]

        return { data };
    }
);
