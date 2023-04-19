import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import * as missedHAARTSelectors from '../../../selectors/PMTCTRRI/MissedHAART';

const MissingHAARTFacility = () => {
    const missedHaart = useSelector(missedHAARTSelectors.getMissedHAARTFacility);
    const loading = useSelector((state) => state.missedHAARTFacility.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            HIV POSITVE MOTHERS NOT STARTED ON HAART
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="HIV POSITVE MOTHERS NOT STARTED ON HAART"
                                    separator=","
                                    datas={missedHaart}
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
                                        selector: 'Facility_Name',
                                        sortable: true,
                                    },
                                    {
                                        name: 'COUNTY',
                                        selector: 'County',
                                        sortable: true,
                                    },
                                    {
                                        name: 'SUB-COUNTY',
                                        selector: 'SubCounty',
                                        sortable: true,
                                    },
                                    {
                                        name: 'AGENCY',
                                        selector: 'Agency',
                                        sortable: true,
                                    },
                                    {
                                        name: 'PARTNER',
                                        selector: 'SDP',
                                        sortable: true,
                                    },
                                    {
                                        name: 'NEW HIV POSITIVE NOT STARTED ON HAART',
                                        selector: 'FirstANC',
                                        sortable: true,
                                    },
                                    {
                                        name: 'KNOWN HIV POSITIVE NOT STARTED ON HAART',
                                        selector: 'HIVTested',
                                        sortable: true,
                                    },
                                ]}
                                data={missedHaart}
                                noHeader
                                dense
                                defaultSortField="FirstANC"
                                defaultSortAsc={false}
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

export default MissingHAARTFacility;
