import _ from 'lodash';
import { createSelector } from 'reselect';
import moment  from 'moment';

const listUnfiltered = (state) => state.openByProduct.listUnfiltered;
const listFiltered = (state) => state.openByProduct.listFiltered;

const listPartnerUnfiltered = (state) => state.openByPartner.listUnfiltered;
const listPartnerFiltered = (state) => state.openByPartner.listFiltered;

const listCountyUnfiltered = (state) => state.openByCounty.listUnfiltered;
const listCountyFiltered = (state) => state.openByCounty.listFiltered;

const listMonthUnfiltered = (state) => state.openByMonth.listUnfiltered;
const listMonthFiltered = (state) => state.openByMonth.listFiltered;

const filtered = state => state.filters.filtered;
const fromDate = state => state.filters.fromDate;

export const getByProduct = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let products = []
        let categories = [];

        list.forEach(function (d) {
            let category = d.category ? d.category : 'Unclassified';
            let issueType = d['Issue Type'];
            let opened = d.opened;

            let categoryObject = categories.find((c) => c.category === category);

            if (!categoryObject) {
                categoryObject = {
                    category: category,
                    bug: 0,
                    support: 0,
                    training: 0,
                    enhancement: 0,
                };
                categories.push(categoryObject);
            }

            if (issueType === 'Bug') {
                categoryObject.bug += opened;
            } else if (issueType === 'Support') {
                categoryObject.support += opened;
            } else if (issueType === 'Training') {
                categoryObject.training += opened;
            } else if (issueType === 'Enhancement') {
                categoryObject.enhancement += opened;
            }
        });
        categories = categories.filter(
            (c) =>
                c.bug !== 0 ||
                c.support !== 0 ||
                c.training !== 0 ||
                c.enhancement !== 0
        );

        products = categories.map((l) => l.category.toUpperCase());
        let enhancement = categories.map((l) => l.enhancement);
        let bug = categories.map((l) => l.bug);
        let support = categories.map((l) => l.support);
        let training = categories.map((l) => l.training);
        return {products, enhancement, bug, support, training};
    }
);

export const getByMonth = createSelector(
    [listMonthUnfiltered, listMonthFiltered, filtered, fromDate],
    (listUnfiltered, listFiltered, filtered, fromDate) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let categories = [];

        const twelveMonthsAgo = moment().subtract(12, 'months');
        const filteredData = list.filter((entry) => {
            const entryDate = moment(
                `${entry.YEAR}-${entry.MONTH}-01`,
                'YYYY-MM-DD'
            );
            if (fromDate)
                return entryDate;
            return (
                entryDate.isSameOrAfter(twelveMonthsAgo, 'month') &&
                entryDate.isSameOrBefore(moment(), 'month')
            );
        });

        filteredData.forEach(function (d) {
            let month = moment(d.MONTH, 'M').format('MMM');
            let year = d.YEAR;

            let category = `${month} ${year}`;
            let issueType = d['Issue Type'];
            let opened = d.opened;

            let categoryObject = categories.find(
                (c) => c.category === category
            );

            if (!categoryObject) {
                categoryObject = {
                    category: category,
                    bug: 0,
                    support: 0,
                    training: 0,
                    enhancement: 0,
                };
                categories.push(categoryObject);
            }

            if (issueType === 'Bug') {
                categoryObject.bug += opened;
            } else if (issueType === 'Support') {
                categoryObject.support += opened;
            } else if (issueType === 'Training') {
                categoryObject.training += opened;
            } else if (issueType === 'Enhancement') {
                categoryObject.enhancement += opened;
            }
        });

        let months = categories.map((l) => l.category.toUpperCase());
        let enhancement = categories.map((l) => l.enhancement);
        let bug = categories.map((l) => l.bug);
        let support = categories.map((l) => l.support);
        let training = categories.map((l) => l.training);
        return { months, enhancement, bug, support, training };
    }
);

export const getByPartner = createSelector(
    [listPartnerUnfiltered, listPartnerFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let categories = [];

        list.forEach(function (d) {
            let category = d.sdp ? d.sdp : 'No Partner';
            let issueType = d['Issue Type'];
            let opened = d.opened;

            let categoryObject = categories.find(
                (c) => c.category === category
            );

            if (!categoryObject) {
                categoryObject = {
                    category: category,
                    bug: 0,
                    support: 0,
                    training: 0,
                    enhancement: 0,
                };
                categories.push(categoryObject);
            }

            if (issueType === 'Bug') {
                categoryObject.bug += opened;
            } else if (issueType === 'Support') {
                categoryObject.support += opened;
            } else if (issueType === 'Training') {
                categoryObject.training += opened;
            } else if (issueType === 'Enhancement') {
                categoryObject.enhancement += opened;
            }
        });
        categories = categories.filter(
            (c) =>
                c.bug !== 0 ||
                c.support !== 0 ||
                c.training !== 0 ||
                c.enhancement !== 0
        );

        let sdp = categories.map((l) => l?.category.toUpperCase());
        let enhancement = categories.map((l) => l.enhancement);
        let bug = categories.map((l) => l.bug);
        let support = categories.map((l) => l.support);
        let training = categories.map((l) => l.training);
        return { sdp, enhancement, bug, support, training };
    }
);

export const getByCounty = createSelector(
    [listCountyUnfiltered, listCountyFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let categories = [];

        list.forEach(function (d) {
            let category = d.County ? d.County : 'No County';
            let issueType = d['Issue Type'];
            let opened = d.opened;

            let categoryObject = categories.find(
                (c) => c.category === category
            );

            if (!categoryObject) {
                categoryObject = {
                    category: category,
                    bug: 0,
                    support: 0,
                    training: 0,
                    enhancement: 0,
                };
                categories.push(categoryObject);
            }

            if (issueType === 'Bug') {
                categoryObject.bug += opened;
            } else if (issueType === 'Support') {
                categoryObject.support += opened;
            } else if (issueType === 'Training') {
                categoryObject.training += opened;
            } else if (issueType === 'Enhancement') {
                categoryObject.enhancement += opened;
            }
        });
        
        categories = categories.filter(
            (c) => c.bug !== 0 || c.support !== 0 || c.training !== 0 || c.enhancement !==0
        );

        let counties = categories.map((l) => l.category.toUpperCase());
        let enhancement = categories.map((l) => l.enhancement);
        let bug = categories.map((l) => l.bug);
        let support = categories.map((l) => l.support);
        let training = categories.map((l) => l.training);
        return { counties, enhancement, bug, support, training };
    }
);
