import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component-with-filter';
import MuiDataTable from 'mui-datatables';
import moment from 'moment';
import CsvDownloader from 'react-csv-downloader';
import * as tickets from '../../../selectors/ServiceDesk/partnerLevel';


const PartnerLevelIssues = () => {
    const partnerLevel = useSelector(tickets.getPartnerLevel);
    const loading = useSelector((state) => state.partnerLevelIssues.loading);
    let filterMonth = moment(
        useSelector((state) => state.filters.fromDate),
        'MMM YYYY'
    )
        .format('MMMM')
        .toUpperCase();
    const month = useSelector((state) => state.filters.fromDate)
        ? filterMonth
        : moment().format('MMMM');

    const columns = [
        {
            name: 'facility',
            options: {
                display: 'excluded',
            },
        },
        { name: 'sdp', label: 'Partner' },
        { name: 'type', label: 'Issue Type' },
        { name: 'product', label: 'Issue Product' },
        { name: 'status', label: 'Issue Status' },
        {
            name: 'date',
            label: 'Date Reported',
            options: {
                customBodyRenderLite: (dataIndex) => (
                    <span>
                        {moment(partnerLevel[dataIndex].date).format(
                            'YYYY-MM-DD'
                        )}
                    </span>
                ),
            },
        },
        { name: 'Description', label: 'Description', options: {
            filter: false
        } },
    ];

    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            {`PARTNER LEVEL ISSUES FOR THE MONTH OF ${month}`}
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="verified vs txcurr by facility"
                                    separator=","
                                    datas={partnerLevel}
                                    className="pull-right"
                                >
                                    <i className="bordered download icon inverted black"></i>
                                </CsvDownloader>
                            )}
                        </CardHeader>
                        <CardBody className="trends-body">
                            <MuiDataTable
                                data={partnerLevel}
                                columns={columns}
                                options={{
                                    responsive: 'simple',
                                    selectableRows: 'none',
                                }}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PartnerLevelIssues;
