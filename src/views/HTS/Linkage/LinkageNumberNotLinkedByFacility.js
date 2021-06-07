import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import { getLinkageNumberNotLinkedByFacility } from '../../../selectors/HTS/Linkage/linkageNumberNotLinkedByFacility';

const LinkageNumberNotLinkedByFacility = () => {
    const linkageNumberNotLinkedByFacility = useSelector(getLinkageNumberNotLinkedByFacility);
    const loading = useSelector(state => state.linkageNumberNotLinkedByFacility.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            Number of Positive Patients who have not been linked - By Facility
                            {
                                loading === true ?
                                <Spinner className="pull-right"/> :
                                <CsvDownloader
                                    filename="ndwh_positive_patients_not_linked_by_facility"
                                    separator=","
                                    datas={linkageNumberNotLinkedByFacility}
                                    className="pull-right"
                                >
                                    <i className="bordered download icon inverted black"></i>
                                </CsvDownloader>
                            }
                        </CardHeader>
                        <CardBody className="trends-body">
                            <DataTable
                                columns={[
                                    { name: 'MFL Code', selector: 'mfl', sortable: true },
                                    { name: 'Facility', selector: 'facility', sortable: true },
                                    { name: 'County', selector: 'county', sortable: true },
                                    { name: 'Sub-County', selector: 'subCounty', sortable: true },
                                    { name: 'Partner', selector: 'partner', sortable: true },
                                    { name: '# Positive', selector: 'positive', sortable: true },
                                    { name: '# Linked', selector: 'linked', sortable: true },
                                ]}
                                data={linkageNumberNotLinkedByFacility}
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

export default LinkageNumberNotLinkedByFacility;
