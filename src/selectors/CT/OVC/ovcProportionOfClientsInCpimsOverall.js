import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcProportionOfClientsInCpimsOverall.listFiltered;
const listUnfiltered = state => state.ovcProportionOfClientsInCpimsOverall.listUnfiltered;

export const getOvcProportionOfClientsInCpimsOverall = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const enrolled = list.filter(obj => obj.EnrolledinCPIMS === "Yes");
        const notEnrolled = list.filter(obj => obj.EnrolledinCPIMS !== "Yes");

        const totalNotEnrolled = _.sumBy(notEnrolled, "Enrollments");
        const totalEnrolled = _.sumBy(enrolled, "Enrollments");

        const arrayVal = [];
        arrayVal.push({
            name: 'ENROLLED',
            y: totalEnrolled,
            color: "#006800"
        });

        arrayVal.push({
            name: 'NOT ENROLLED',
            y: totalNotEnrolled,
            color: "#B50706"
        });

        return arrayVal;
    }
);
