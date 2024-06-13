import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';
import React from 'react';
import * as hisSelector from '../../selectors/RR/HisDeploymentsSelector';
import CsvDownloader from 'react-csv-downloader';
import DataTable from 'react-data-table-component';
import moment from 'moment';

const HisDeploymentsArtHtsMnchLinelist = () =>{
    const hisLinelist = useSelector(
        hisSelector.getFacilityArtHtsMnchLinelist
    );


    return (
        <>
            <Card className="trends-card">
                <CardHeader className="trends-header">
                    HIS FACILITY LINELIST
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
                            { selector: 'SiteCode', name: 'MFL CODE' },
                            { selector: 'KEPH_Level', name: 'KEPH Level' },
                            { selector: 'CurrentOnART_Total', name: 'Current On ART Total' },
                            { selector: 'Tested_Total', name: 'Tested Total' },
                            { selector: 'onMaternalHAARTtotal', name: 'On Maternal HAART Total' },
                        ]}
                        data={hisLinelist.list}
                        noHeader
                        dense
                        defaultSortField="SiteCode"
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


export default HisDeploymentsArtHtsMnchLinelist
