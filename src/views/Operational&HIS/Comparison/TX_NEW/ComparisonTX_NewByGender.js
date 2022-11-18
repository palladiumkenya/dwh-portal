import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import { getNewOnArtByFacilityPartnerKHIS } from '../../../../selectors/Operational&HIS/Comparison/newStartedOnArtByFacilityPartnerKHIS';

const ComparisonTXNewByGender = () => {
    const txCurrByGender = useSelector(getNewOnArtByFacilityPartnerKHIS).data;
    const loading = useSelector(state => state.newOnArtByFacilityKHIS.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            COMPARISON OF TX_NEW BASED ON GENDER
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="ndwh_patients_missing_hiv_diagnosis_date_by_facility"
                                    separator=","
                                    datas={txCurrByGender}
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
                                        selector: 'SubCounty',
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
                                        name: 'KHIS TOTAL',
                                        selector: 'KHIStxNew',
                                        sortable: true,
                                    },
                                    {
                                        name: 'DWH TOTAL',
                                        selector: 'DWHtxNew',
                                        sortable: true,
                                    },
                                    {
                                        name: 'CONCORDANCE (%)',
                                        selector: 'concordance',
                                        sortable: true,
                                    },
                                    // { name: 'MALE NDWH', selector: 'DWHmale', sortable: true },
                                    // { name: 'FEMALE NDWH', selector: 'DWHFemale', sortable: true },
                                    // { name: 'MALE KHIS', selector: 'KHISMale', sortable: true },
                                    // { name: 'FEMALE KHIS', selector: 'KHISFemale', sortable: true },
                                ]}
                                data={txCurrByGender}
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

export default ComparisonTXNewByGender;
