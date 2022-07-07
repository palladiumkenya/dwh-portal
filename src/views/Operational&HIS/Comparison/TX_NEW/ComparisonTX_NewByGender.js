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
                            {
                                loading === true ?
                                <Spinner className="pull-right"/> :
                                <CsvDownloader
                                    filename="ndwh_patients_missing_hiv_diagnosis_date_by_facility"
                                    separator=","
                                    datas={txCurrByGender}
                                    className="pull-right"
                                >
                                    <i className="bordered download icon inverted black"></i>
                                </CsvDownloader>
                            }
                        </CardHeader>
                        <CardBody className="trends-body">
                            <DataTable
                                columns={[
                                    { name: 'Facility', selector: 'FacilityName', sortable: true },
                                    { name: 'County', selector: 'County', sortable: true },
                                    { name: 'Sub-County', selector: 'SubCounty', sortable: true },
                                    { name: 'AGENCY', selector: 'CTAgency', sortable: true },
                                    { name: 'Partner', selector: 'CTPartner', sortable: true },
                                    { name: 'MALE NDWH', selector: 'KHISMale', sortable: true },
                                    { name: 'FEMALE NDWH', selector: 'KHISFemale', sortable: true },
                                    { name: 'TOTAL NDWH', selector: 'KHIStxNew', sortable: true },
                                    { name: 'MALE KHIS', selector: 'DWHmale', sortable: true },
                                    { name: 'FEMALE KHIS', selector: 'DWHFemale', sortable: true },
                                    { name: 'TOTAL KHIS', selector: 'DWHtxNew', sortable: true },
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
                                progressComponent={<Spinner/>}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ComparisonTXNewByGender;
