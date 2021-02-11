import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadOverallUptakeSuppressionBySex.listUnfiltered;
const listFiltered = state => state.viralLoadOverallUptakeSuppressionBySex.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadOverallUptakeSuppressionBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const vlCategories = ['txCurr', 'eligible', 'vlDone', 'suppressed'];
        const vlCategoryNames = ['TOTAL CURRENT ON ART', 'ELIGIBLE FOR VL (VALID WITHIN 12 MONTHS)', 'VL DONE', 'VIRALLY SUPPRESSED (VS)'];
        const sexCategories = ['Male', 'Female'];
        let data = [];
        for(let i = 0; i < sexCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < vlCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let sexIndex = sexCategories.indexOf(list[i].gender);
            if(sexIndex === -1 ) {
                continue;
            }
            data[sexIndex][0] = data[sexIndex][0] + parseInt(list[i].txCurr);
            data[sexIndex][1] = data[sexIndex][1] + parseInt(list[i].eligible);
            data[sexIndex][2] = data[sexIndex][2] + parseInt(list[i].vlDone);
            data[sexIndex][3] = data[sexIndex][3] + parseInt(list[i].suppressed);
        }
        return { vlCategories, vlCategoryNames, sexCategories, data };
    }
);
