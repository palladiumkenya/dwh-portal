import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import * as missedDTGSelectors from '../../../selectors/PMTCTRRI/MissedDTG';

const MissedDTGList = () => {
    const missedDTG = useSelector(
        missedDTGSelectors.getMissedDTGList
    );
    const loading = useSelector((state) => state.missedDTG.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            CALHIV MISSED DTG OPTIMIZATION
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="CALHIV MISSED DTG OPTIMIZATION"
                                    separator=","
                                    datas={missedDTG}
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
                                        name: 'TOTAL NUMBER OF CALHIV',
                                        selector: 'CalHIVOnDTG',
                                        sortable: true,
                                    },
                                    {
                                        name: '# MISSED DTG OPTIMIZATION',
                                        selector: 'CalHIVNotOnDTG',
                                        sortable: true,
                                    },
                                ]}
                                data={missedDTG}
                                noHeader
                                dense
                                defaultSortField="CalHIVOnDTG"
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

export default MissedDTGList;
