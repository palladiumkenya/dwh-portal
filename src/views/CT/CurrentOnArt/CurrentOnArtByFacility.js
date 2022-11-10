import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import * as currentOnArtByFacility from '../../../selectors/CT/CurrentOnArt/currentOnArtByFacility';

const CurrentOnArtByFacility = () => {
    const txCurrByFacility = useSelector(currentOnArtByFacility.getCurrentOnArtByFacility).facilityData;
    const loading = useSelector((state) => state.currentOnArtByFacility.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            CURRENT ON ART COMPARED TO VERIFIED CURRENT ON ART
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="verified vs txcurr by facility"
                                    separator=","
                                    datas={txCurrByFacility}
                                    className="pull-right"
                                >
                                    <i className="bordered download icon inverted black"></i>
                                </CsvDownloader>
                            )}
                        </CardHeader>
                        <CardBody className="trends-body">
                            <DataTable
                                columns={[
                                    {
                                        name: 'FACILITY',
                                        selector: 'FacilityName',
                                        sortable: true,
                                    },
                                    {
                                        name: 'COUNTY',
                                        selector: 'County',
                                        sortable: true,
                                    },
                                    {
                                        name: 'SUB-COUNTY',
                                        selector: 'Subcounty',
                                        sortable: true,
                                    },
                                    {
                                        name: 'AGENCY',
                                        selector: 'CTAgency',
                                        sortable: true,
                                    },
                                    {
                                        name: 'PARTNER',
                                        selector: 'CTPartner',
                                        sortable: true,
                                    },
                                    {
                                        name: 'VERIFIED',
                                        selector: 'Nupi',
                                        sortable: true,
                                    },
                                    {
                                        name: 'NOT VERIFIED',
                                        selector: 'NotNupi',
                                        sortable: true,
                                    },
                                    {
                                        name: 'VERIFICATION STATUS(%)',
                                        selector: 'perc',
                                        sortable: true,
                                    },
                                ]}
                                data={txCurrByFacility}
                                noHeader
                                dense
                                defaultSortField="facility"
                                defaultSortAsc={true}
                                pagination
                                responsive
                                highlightOnHover
                                progressPending={loading}
                                progressComponent={<Spinner />}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CurrentOnArtByFacility;
