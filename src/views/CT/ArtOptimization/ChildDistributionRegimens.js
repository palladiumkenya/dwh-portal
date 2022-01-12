import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByRegimen';

const ChildDistributionRegimens = () => {
    const [childDistributionRegimens, setChildDistributionRegimens] = useState({});
    const childrenOnFirstLine = useSelector(selectors.getChildrenOnFirstLine);
    const childrenOnSecondLine = useSelector(selectors.getChildrenOnSecondLine);
    const childrenOnThirdLine = useSelector(selectors.getChildrenOnThirdLine);
    const childrenOnUndocumentedLine = useSelector(selectors.getChildrenOnUndocumentedLine);
    const children = useSelector(selectors.getChildren);
    const loading = useSelector(state => state.artOptimizationCurrentByRegimen.loading);
    const childrenAllData = useSelector(selectors.getChildrenAll);

    const loadChildrenByRegimenNames = useCallback(async () => {
        let data = {
            columns: [
                { name: 'Regimen Line', selector: 'regimenLine', sortable: true },
                { name: 'Regimen', selector: 'regimen', sortable: true },
                { name: 'Active on ART', selector: 'activeOnArt', sortable: true },
                { name: 'Percentage on ART', selector: 'percentageOnArt', sortable: true },
            ],
            data: [],
        };
        for(let i = 0; i < childrenOnFirstLine.length; i++) {
            data.data.push({
                regimenLine: 'FIRST LINE',
                regimen: childrenOnFirstLine[i].currentRegimen,
                activeOnArt: childrenOnFirstLine[i].txCurr,
                percentageOnArt: ((childrenOnFirstLine[i].txCurr/children)*100).toFixed(2) + " %",
                percentNumber: ((childrenOnFirstLine[i].txCurr/children)*100).toFixed(2)
            });
        }
        for(let i = 0; i < childrenOnSecondLine.length; i++) {
            data.data.push({
                regimenLine: 'SECOND LINE',
                regimen: childrenOnSecondLine[i].currentRegimen,
                activeOnArt: childrenOnSecondLine[i].txCurr,
                percentageOnArt: ((childrenOnSecondLine[i].txCurr/children)*100).toFixed(2) + " %",
                percentNumber: ((childrenOnSecondLine[i].txCurr/children)*100).toFixed(2)
            });
        }
        for(let i = 0; i < childrenOnThirdLine.length; i++) {
            data.data.push({
                regimenLine: 'THIRD LINE',
                regimen: childrenOnThirdLine[i].currentRegimen,
                activeOnArt: childrenOnThirdLine[i].txCurr,
                percentageOnArt: ((childrenOnThirdLine[i].txCurr/children)*100).toFixed(2) + " %",
                percentNumber: ((childrenOnThirdLine[i].txCurr/children)*100).toFixed(2)
            });
        }
        for(let i = 0; i < childrenOnUndocumentedLine.length; i++) {
            data.data.push({
                regimenLine: 'UNDOCUMENTED REG LINE',
                regimen: childrenOnUndocumentedLine[i].currentRegimen,
                activeOnArt: childrenOnUndocumentedLine[i].txCurr,
                percentageOnArt: ((childrenOnUndocumentedLine[i].txCurr/children)*100).toFixed(2) + " %",
                percentNumber: ((childrenOnUndocumentedLine[i].txCurr/children)*100).toFixed(2)
            });
        }
        // data.data.sort(function(a, b) {
        //     return b.percentNumber - a.percentNumber;
        // });
        setChildDistributionRegimens(data);
    }, [children, childrenOnFirstLine, childrenOnSecondLine, childrenOnThirdLine, childrenOnUndocumentedLine]);

    useEffect(() => {
        loadChildrenByRegimenNames();
    }, [loadChildrenByRegimenNames]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                PROPORTION OF CALHIV BY REGIMEN
                {
                    loading === true ?
                    <Spinner className="pull-right"/> :
                    <CsvDownloader
                        filename="ndwh_proportion_of_children_by_regimen"
                        separator=","
                        datas={childrenAllData}
                        className="pull-right"
                    >
                        <i className="bordered download icon inverted black"></i>
                    </CsvDownloader>
                }
            </CardHeader>
            <CardBody className="trends-body">
                <DataTable
                    columns={childDistributionRegimens.columns}
                    data={childDistributionRegimens.data}
                    noHeader
                    dense
                    defaultSortField="regimenLine"
                    defaultSortAsc={true}
                    pagination
                    responsive
                    highlightOnHover
                    progressPending={loading}
                    progressComponent={<Spinner/>}
                />
            </CardBody>
        </Card>
    );
};

export default ChildDistributionRegimens;
