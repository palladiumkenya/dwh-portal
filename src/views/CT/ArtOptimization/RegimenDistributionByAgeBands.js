import { Card, CardBody, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationRegimenDistributionByAgeBands';

const RegimenDistributionByAgeBands = () => {
    const [regimenDistributionByAgeBands, setRegimenDistributionByAgeBands] = useState({});
    const regimenDistribution = useSelector(selectors.getRegimenDistributionByAgeBands);

    const loadRegimenDistributionByAgeBands = useCallback(async () => {
        let data = {
            columns: [
                { name: 'Regimen', selector: 'regimen', sortable: true },
                { name: '<2 Years', selector: '<2 Years', sortable: true },
                { name: '2-4 Years', selector: '2-4 Years', sortable: true },
                { name: '5-9 Years', selector: '5-9 Years', sortable: true },
                { name: '10-14 Years', selector: '10-14 Years', sortable: true },
                { name: 'Grand Total', selector: 'Grand Total', sortable: true },
            ],
            data: [],
        };
        for (const regimenDistributionElement of regimenDistribution) {
            data.data.push({
                regimen: regimenDistributionElement.Lastregimen,
                '<2 Years': regimenDistributionElement['<2 Years'],
                '2-4 Years': regimenDistributionElement['2-4 Years'],
                '5-9 Years': regimenDistributionElement['5-9 Years'],
                '10-14 Years': regimenDistributionElement['10-14 Years'],
                'Grand Total': regimenDistributionElement['Grand Total']
            });
        }
        setRegimenDistributionByAgeBands(data);
    }, [regimenDistribution]);

    useEffect(() => {
        loadRegimenDistributionByAgeBands();
    }, [loadRegimenDistributionByAgeBands]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                REGIMEN DISTRIBUTION BASED ON AGE BANDS
            </CardHeader>
            <CardBody className="trends-body">
                <DataTable
                    columns={regimenDistributionByAgeBands.columns}
                    data={regimenDistributionByAgeBands.data}
                    pagination={true}
                    responsive={true}
                    noHeader={true}
                    dense={true}
                />
            </CardBody>
        </Card>
    );
}

export default RegimenDistributionByAgeBands;
