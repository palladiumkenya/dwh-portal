import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = state => state.newlyStartedOnArtKHIS.listUnfiltered;
const listFiltered = state => state.newlyStartedOnArtKHIS.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredTrends = state => state.newlyStartedOnArtTrendsKHIS.listUnfiltered;
const listFilteredTrends = state => state.newlyStartedOnArtTrendsKHIS.listFiltered;
const filteredTrends = state => state.filters.filtered;


export const getNewlyStartedOnArtKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const totalNewlyStarted = list.StartedART_Total;
        const malesNewlyStarted = list.Start_ART_25_Plus_M + list.Start_ART_20_24_M + list.Start_ART_15_19_M + list.Start_ART_10_14_M;
        const femalesNewlyStarted = list.Start_ART_25_Plus_F + list.Start_ART_20_24_F + list.Start_ART_15_19_F + list.Start_ART_10_14_F;
        const adultsNewlyStarted = list.Start_ART_15_19_F + list.Start_ART_15_19_M + list.Start_ART_20_24_F + list.Start_ART_20_24_M + list.Start_ART_25_Plus_F + list.Start_ART_25_Plus_M;
        const childrenNewlyStarted = list.Start_ART_10_14_F + list.Start_ART_10_14_M + list.Start_ART_1_9 + list.Start_ART_Under_1;
        const adolescentsNewlyStarted = list.Start_ART_10_14_F + list.Start_ART_10_14_M + list.Start_ART_15_19_M + list.Start_ART_15_19_F;

        const newlyStartedByAge = [
            list.Start_ART_Under_1||0,
            list.Start_ART_1_9||0,
            list.Start_ART_10_14_M || 0 + list.Start_ART_10_14_F || 0,
            list.Start_ART_15_19_M || 0 + list.Start_ART_15_19_F || 0,
            list.Start_ART_20_24_M ||0 + list.Start_ART_20_24_F || 0,
            list.Start_ART_25_Plus_M || 0 + list.Start_ART_25_Plus_F || 0
        ];
        return {
            totalNewlyStarted,
            malesNewlyStarted,
            femalesNewlyStarted,
            adultsNewlyStarted,
            childrenNewlyStarted,
            adolescentsNewlyStarted,
            newlyStartedByAge
        };
    }
);

export const getNewlyStartedOnArtTrendsKHIS = createSelector(
    [listUnfilteredTrends, listFilteredTrends, filteredTrends],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        list.length = 12;

        const labels = list.map((item) => {
            let year = item.ReportMonth_Year.substring(0, 4);
            let month = item.ReportMonth_Year.substring(4, 6);

            return moment( item.ReportMonth_Year ).format('MMM YYYY');
        }).reverse();
        const data = list.map(item => item.StartedART_Total).reverse();

        return {
            data, labels
        };
    }
);
