import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import * as currentOnArtDistributionByCountySelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtDistributionByCounty';

const CurrentOnArtDistributionByCounty = () => {
    const [currentOnArtDistributionByCountyTable, setCurrentOnArtDistributionByCountyTable] = useState({});
    const currentOnArtDistributionByCountyData = useSelector(currentOnArtDistributionByCountySelectors.getCurrentOnArtDistributionByCounty);

    const loadCurrentOnArtDistributionByCountyTable = useCallback(async () => {
        setCurrentOnArtDistributionByCountyTable({
            columns: currentOnArtDistributionByCountyData.columns,
            data: currentOnArtDistributionByCountyData.data
        });
    }, [currentOnArtDistributionByCountyData]);

    useEffect(() => {
        loadCurrentOnArtDistributionByCountyTable();
    }, [loadCurrentOnArtDistributionByCountyTable]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CURRENT ON ART BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <DataTable columns={currentOnArtDistributionByCountyTable.columns} data={currentOnArtDistributionByCountyTable.data} pagination={true} defaultSortField="county" responsive={true}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CurrentOnArtDistributionByCounty;
