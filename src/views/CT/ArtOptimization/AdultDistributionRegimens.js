import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByRegimen';

const AdultDistributionRegimens = () => {
    const [adultDistributionRegimens, setAdultDistributionRegimens] = useState({});
    const adultsOnFirstLine = useSelector(selectors.getAdultsOnFirstLine);
    const adultsOnSecondLine = useSelector(selectors.getAdultsOnSecondLine);
    const adultsOnThirdLine = useSelector(selectors.getAdultsOnThirdLine);
    const adultsOnUndocumentedLine = useSelector(selectors.getAdultsOnUndocumentedLine);
    const adults = useSelector(selectors.getAdults);
    const loadAdultsByRegimenNames = useCallback(async () => {
        let data = {
            columns: [
                { name: 'Regimen Line', selector: 'regimenLine', sortable: true },
                { name: 'Regimen', selector: 'regimen', sortable: true },
                { name: 'Active on ART', selector: 'activeOnArt', sortable: true },
                { name: 'Percentage on ART', selector: 'percentageOnArt', sortable: true },
            ],
            data: [],
        };
        for(let i = 0; i < adultsOnFirstLine.length; i++) {
            data.data.push({
                regimenLine: 'FIRST LINE',
                regimen: adultsOnFirstLine[i].lastRegimen,
                activeOnArt: adultsOnFirstLine[i].txCurr,
                percentageOnArt: ((adultsOnFirstLine[i].txCurr/adults)*100).toFixed(2) + " %"
            });
        }
        for(let i = 0; i < adultsOnSecondLine.length; i++) {
            data.data.push({
                regimenLine: 'SECOND LINE',
                regimen: adultsOnSecondLine[i].lastRegimen,
                activeOnArt: adultsOnSecondLine[i].txCurr,
                percentageOnArt: ((adultsOnSecondLine[i].txCurr/adults)*100).toFixed(2) + " %"
            });
        }
        for(let i = 0; i < adultsOnThirdLine.length; i++) {
            data.data.push({
                regimenLine: 'THIRD LINE',
                regimen: adultsOnThirdLine[i].lastRegimen,
                activeOnArt: adultsOnThirdLine[i].txCurr,
                percentageOnArt: ((adultsOnThirdLine[i].txCurr/adults)*100).toFixed(2) + " %"
            });
        }
        for(let i = 0; i < adultsOnUndocumentedLine.length; i++) {
            data.data.push({
                regimenLine: 'UNDOCUMENTED REG LINE',
                regimen: adultsOnUndocumentedLine[i].lastRegimen,
                activeOnArt: adultsOnUndocumentedLine[i].txCurr,
                percentageOnArt: ((adultsOnUndocumentedLine[i].txCurr/adults)*100).toFixed(2) + " %"
            });
        }
        setAdultDistributionRegimens(data);
    }, [adults, adultsOnFirstLine, adultsOnSecondLine, adultsOnThirdLine, adultsOnUndocumentedLine]);

    useEffect(() => {
        loadAdultsByRegimenNames();
    }, [loadAdultsByRegimenNames]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                PROPORTION OF ADULTS BY REGIMEN
            </CardHeader>
            <CardBody className="trends-body">
                <DataTable
                    columns={adultDistributionRegimens.columns}
                    data={adultDistributionRegimens.data}
                    pagination={true}
                    responsive={true}
                    noHeader={true}
                    dense={true}
                />
            </CardBody>
        </Card>
    );
};

export default AdultDistributionRegimens;
