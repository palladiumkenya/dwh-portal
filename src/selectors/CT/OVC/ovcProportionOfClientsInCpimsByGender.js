import { createSelector } from 'reselect';
import _ from 'lodash';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcProportionOfClientsInCpimsByGender.listFiltered;
const listUnfiltered = state => state.ovcProportionOfClientsInCpimsByGender.listUnfiltered;

export const getOvcProportionOfClientsInCpimsByMale = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const enrolled = list.filter(obj => obj.EnrolledinCPIMS === "Yes" && obj.Gender === "Male");
        const notEnrolled = list.filter(obj => obj.EnrolledinCPIMS !== "Yes" && obj.Gender === "Male");

        const totalNotEnrolled = _.sumBy(notEnrolled, "Enrollments");
        const totalEnrolled = _.sumBy(enrolled, "Enrollments");

        const arrayVal = [];
        arrayVal.push({
            name: 'ENROLLED',
            y: totalEnrolled,
            color: "#69B34C"
        });

        arrayVal.push({
            name: 'NOT ENROLLED',
            y: totalNotEnrolled,
            color: "#142459"
        });

        return arrayVal;
    }
);

export const getOvcProportionOfClientsInCpimsByFemale = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const enrolled = list.filter(obj => obj.EnrolledinCPIMS === "Yes" && obj.Gender === "Female");
        const notEnrolled = list.filter(obj => obj.EnrolledinCPIMS !== "Yes" && obj.Gender === "Female");

        const totalNotEnrolled = _.sumBy(notEnrolled, "Enrollments");
        const totalEnrolled = _.sumBy(enrolled, "Enrollments");

        const arrayVal = [];
        arrayVal.push({
            name: 'ENROLLED',
            y: totalEnrolled,
            color: "#69B34C"
        });

        arrayVal.push({
            name: 'NOT ENROLLED',
            y: totalNotEnrolled,
            color: "#142459"
        });

        return arrayVal;
    }
);
