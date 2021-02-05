import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import * as currentOnArtDistributionByPartnerSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtDistributionByPartner';

const CurrentOnArtDistributionByPartner = () => {
    const [currentOnArtDistributionByPartnerTable, setCurrentOnArtDistributionByPartnerTable] = useState({});
    const currentOnArtDistributionByPartnerData = useSelector(currentOnArtDistributionByPartnerSelectors.getCurrentOnArtDistributionByPartner);

    const loadCurrentOnArtDistributionByPartnerTable = useCallback(async () => {
        setCurrentOnArtDistributionByPartnerTable({
            columns: currentOnArtDistributionByPartnerData.columns,
            data: currentOnArtDistributionByPartnerData.data
        });
    }, [currentOnArtDistributionByPartnerData]);

    useEffect(() => {
        loadCurrentOnArtDistributionByPartnerTable();
    }, [loadCurrentOnArtDistributionByPartnerTable]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CURRENT ON ART BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <DataTable columns={currentOnArtDistributionByPartnerTable.columns} data={currentOnArtDistributionByPartnerTable.data} pagination={true} defaultSortField="partner" responsive={true}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CurrentOnArtDistributionByPartner;
