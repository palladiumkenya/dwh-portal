import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import CsvDownloader from 'react-csv-downloader';
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationRegimenDistributionByWeightBands';

const RegimenDistributionByWeightBands = () => {
    const [regimenDistributionByWeightBands, setRegimenDistributionByWeightBands] = useState({});
    const loading = useSelector(state => state.artOptimizationRegimenDistributionByWeightBands.loading);
    const regimenDistribution = useSelector(selectors.getRegimenDistributionByWeightBands);

    const loadRegimenDistributionByWeightBands = useCallback(async () => {
        let data = {
            columns: [
                { name: 'Regimen', selector: 'regimen', sortable: true },
                { name: '<20Kgs', selector: '<20Kgs', sortable: true },
                { name: '20-35Kgs', selector: '20-35Kgs', sortable: true },
                { name: '>35Kgs', selector: '>35Kgs', sortable: true },
            ],
            data: [],
        };
        for (const regimenDistributionElement of regimenDistribution) {
            data.data.push({
                regimen: regimenDistributionElement.Lastregimen,
                '<20Kgs': regimenDistributionElement['<20Kgs'],
                '20-35Kgs': regimenDistributionElement['20-35Kgs'],
                '>35Kgs': regimenDistributionElement['>35Kgs']
            });
        }
        setRegimenDistributionByWeightBands(data);
    }, [regimenDistribution]);

    useEffect(() => {
        loadRegimenDistributionByWeightBands();
    }, [loadRegimenDistributionByWeightBands]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                REGIMEN DISTRIBUTION BASED ON WEIGHT BANDS
                {
                    loading === true ?
                    <Spinner className="pull-right"/> :
                    <CsvDownloader
                        filename="ndwh_regimen_distribution_by_weight_bands"
                        separator=","
                        datas={regimenDistribution}
                        className="pull-right"
                    >
                        <i class="bordered download icon inverted black"></i>
                    </CsvDownloader>
                }
            </CardHeader>
            <CardBody className="trends-body">
                <DataTable
                    columns={regimenDistributionByWeightBands.columns}
                    data={regimenDistributionByWeightBands.data}
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
}

export default RegimenDistributionByWeightBands;
