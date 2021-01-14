import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByRegimen';

const ChildDistributionRegimens = () => {
    const [childDistributionRegimens, setChildDistributionRegimens] = useState({});
    const childrenOnFirstLine = useSelector(selectors.getChildrenOnFirstLine);
    const childrenOnSecondLine = useSelector(selectors.getChildrenOnSecondLine);
    const childrenOnThirdLine = useSelector(selectors.getChildrenOnThirdLine);
    const childrenOnUndocumentedLine = useSelector(selectors.getChildrenOnUndocumentedLine);
    const children = useSelector(selectors.getChildren);
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
                regimen: childrenOnFirstLine[i].lastRegimen,
                activeOnArt: childrenOnFirstLine[i].txCurr,
                percentageOnArt: ((childrenOnFirstLine[i].txCurr/children)*100).toFixed(2) + " %"
            });
        }
        for(let i = 0; i < childrenOnSecondLine.length; i++) {
            data.data.push({
                regimenLine: 'SECOND LINE',
                regimen: childrenOnSecondLine[i].lastRegimen,
                activeOnArt: childrenOnSecondLine[i].txCurr,
                percentageOnArt: ((childrenOnSecondLine[i].txCurr/children)*100).toFixed(2) + " %"
            });
        }
        for(let i = 0; i < childrenOnThirdLine.length; i++) {
            data.data.push({
                regimenLine: 'THIRD LINE',
                regimen: childrenOnThirdLine[i].lastRegimen,
                activeOnArt: childrenOnThirdLine[i].txCurr,
                percentageOnArt: ((childrenOnThirdLine[i].txCurr/children)*100).toFixed(2) + " %"
            });
        }
        for(let i = 0; i < childrenOnUndocumentedLine.length; i++) {
            data.data.push({
                regimenLine: 'UNDOCUMENTED REG LINE',
                regimen: childrenOnUndocumentedLine[i].lastRegimen,
                activeOnArt: childrenOnUndocumentedLine[i].txCurr,
                percentageOnArt: ((childrenOnUndocumentedLine[i].txCurr/children)*100).toFixed(2) + " %"
            });
        }
        setChildDistributionRegimens(data);
    }, [children, childrenOnFirstLine, childrenOnSecondLine, childrenOnThirdLine, childrenOnUndocumentedLine]);

    useEffect(() => {
        loadChildrenByRegimenNames();
    }, [loadChildrenByRegimenNames]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                PROPORTION OF CALHIV BY REGIMEN
            </CardHeader>
            <CardBody className="trends-body">
                <DataTable
                    columns={childDistributionRegimens.columns}
                    data={childDistributionRegimens.data}
                    pagination={true}
                    responsive={true}
                    noHeader={true}
                    dense={true}
                />
            </CardBody>
        </Card>
    );
};

export default ChildDistributionRegimens;
