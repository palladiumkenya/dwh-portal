import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';
// import MuiDataTable from 'mui-datatables';
import React from 'react';
import * as hisSelector from '../../selectors/RR/HisDeploymentsSelector';
import CsvDownloader from 'react-csv-downloader';
import DataTable from 'react-data-table-component';
import moment from 'moment';

const HisDeploymentsLinelist = () =>{
    const hisLinelist = useSelector(
        hisSelector.getFacilityLinelist
    );


    // const columns = [
    //     { name: 'MFLCode', label: 'MFL CODE' },
    //     { name: 'FacilityName', label: 'Facility Name' },
    //     { name: 'KEPH_Level', label: 'KEPH Level' },
    //     { name: 'County', label: 'County' },
    //     { name: 'SubCounty', label: 'Sub County' },
    //     { name: 'owner', label: 'Owner' },
    //     { name: 'PartnerName', label: 'SDP' },
    //     { name: 'AgencyName', label: 'Agency' },
    //     { name: 'EMR', label: 'EMR' },
    //     { name: 'EMR_Status', label: 'EMR Status' },
    //     { name: 'InfrastructureType', label: 'Infrastructure Type' },
    // ];

    return (
        <>
            {/*<Row>*/}
            {/*    <Col>*/}
            {/*        <Card className="trends-card">*/}
            {/*            <CardHeader className="trends-header">*/}
            {/*                {`HIS DEPLOYMENT LINELIST`}*/}
            {/*            </CardHeader>*/}
            {/*            <CardBody className="trends-body">*/}
            {/*                <MuiDataTable*/}
            {/*                    data={hisLinelist.list}*/}
            {/*                    columns={columns}*/}
            {/*                    options={{*/}
            {/*                        responsive: 'simple',*/}
            {/*                        selectableRows: 'none',*/}
            {/*                        file: ''*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            </CardBody>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}

            <Card className="trends-card">
                <CardHeader className="trends-header">
                    HIS DEPLOYMENT LINELIST
                    {
                        hisLinelist.loading === true ?
                            <Spinner className="pull-right"/> :
                            <CsvDownloader
                                filename={`ndwh_his_deployment_facility_linelist_${moment().format('YYYY_MM_DD')}`}
                                separator=","
                                datas={hisLinelist.list}
                                className="pull-right"
                            >
                                <i className="bordered download icon inverted black"></i>
                            </CsvDownloader>
                    }
                </CardHeader>
                <CardBody className="trends-body">
                    <DataTable
                        columns={[
                            { selector: 'MFLCode', name: 'MFL CODE' },
                            { selector: 'FacilityName', name: 'Facility Name' },
                            { selector: 'KEPH_Level', name: 'KEPH Level' },
                            { selector: 'County', name: 'County' },
                            { selector: 'SubCounty', name: 'Sub County' },
                            { selector: 'owner', name: 'Owner' },
                            { selector: 'PartnerName', name: 'SDP' },
                            { selector: 'AgencyName', name: 'Agency' },
                            { selector: 'EMR', name: 'EMR' },
                            { selector: 'EMR_Status', name: 'EMR Status' },
                            { selector: 'InfrastructureType', name: 'Infrastructure Type' },
                        ]}
                        data={hisLinelist.list}
                        noHeader
                        dense
                        defaultSortField="MFLCode"
                        defaultSortAsc={true}
                        pagination
                        paginationPerPage={20}
                        responsive
                        highlightOnHover
                        progressPending={hisLinelist.loading}
                        progressComponent={<Spinner/>}
                    />
                </CardBody>
            </Card>
        </>
    );
}


export default HisDeploymentsLinelist
