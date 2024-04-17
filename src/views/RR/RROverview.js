import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import moment from 'moment';
import { getAll } from '../Shared/Api';
import CsvDownloader from 'react-csv-downloader';
import { Spinner } from 'reactstrap';
import { ETL_DAY } from '../../constants';

const RROverview = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [expected, setExpected] = useState('0');
    const [consistencyStats, setConsistnecy] = useState({ consistency: [], stats: '0', statsPerc: 0 });
    const [recencyStats, setRecency] = useState({ recency: [], stats: '0', statsPerc: 0 });
    const [infrastructureStats, setInfrastructure] = useState({});
    const [implementationStats, setImplementationStats] = useState(0);

    const overallReportingRatesByFacilityReportedFiltered = useSelector(state => state.overallReportingRatesByFacilityReported.listFiltered);
    const overallReportingRatesByFacilityReportedUnFiltered = useSelector(state => state.overallReportingRatesByFacilityReported.listUnfiltered);
    const overallReportingRatesByFacilityReportedList = filters.filtered ? overallReportingRatesByFacilityReportedFiltered[rrTab] : overallReportingRatesByFacilityReportedUnFiltered[rrTab];
    const overallReportingRatesByFacilityReported = overallReportingRatesByFacilityReportedList.length ? overallReportingRatesByFacilityReportedList : [];
    const overallReportingRatesByFacilityReportedLoading = useSelector(state => state.overallReportingRatesByFacilityReported.loading)[rrTab];

    const overallReportingRatesByFacilityNotReportedFiltered = useSelector(state => state.overallReportingRatesByFacilityNotReported.listFiltered);
    const overallReportingRatesByFacilityNotReportedUnFiltered = useSelector(state => state.overallReportingRatesByFacilityNotReported.listUnfiltered);
    const overallReportingRatesByFacilityNotReportedList = filters.filtered ? overallReportingRatesByFacilityNotReportedFiltered[rrTab] : overallReportingRatesByFacilityNotReportedUnFiltered[rrTab];
    const overallReportingRatesByFacilityNotReported = overallReportingRatesByFacilityNotReportedList.length ? overallReportingRatesByFacilityNotReportedList : [];
    const overallReportingRatesByFacilityNotReportedLoading = useSelector(state => state.overallReportingRatesByFacilityNotReported.loading)[rrTab];

    const consistencyByFacilityNotReportedFiltered = useSelector(state => state.consistencyByFacilityNotReported.listFiltered);
    const consistencyByFacilityNotReportedUnFiltered = useSelector(state => state.consistencyByFacilityNotReported.listUnfiltered);
    const consistencyByFacilityNotReportedList = filters.filtered ? consistencyByFacilityNotReportedFiltered[rrTab] : consistencyByFacilityNotReportedUnFiltered[rrTab];
    const consistencyByFacilityNotReported = consistencyByFacilityNotReportedList.length ? consistencyByFacilityNotReportedList : [];
    const consistencyByFacilityNotReportedLoading = useSelector(state => state.consistencyByFacilityNotReported.loading)[rrTab];

    const getPerc = (count, total) => {
        const numTotal = parseInt(total.replace(",",""), 10);
        if (count && total && numTotal > 0 && (numTotal >= count)) {
            return Math.round((count / numTotal) * 100);
        } else {
            return 0;
        }
    };

    const loadExpected = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate || moment().format("MMM YYYY")
        };
        params.period = filters.fromDate ?
            moment(params.fromDate, "MMM YYYY").startOf('month').subtract(1, 'month').format('YYYY,M') :
            moment().startOf('month').subtract(2, 'month').format('YYYY,M');
        const data = await getAll('manifests/expected/' + rrTab, params);
        setExpected(data.expected.toLocaleString('en'));
    }, [filters, rrTab]);

    const loadConsistnecy = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate || moment().subtract(2, 'month').add(ETL_DAY, 'days').format('MMM YYYY')
        };
        params.period = filters.fromDate
            ? moment(params.fromDate, 'MMM YYYY')
                  .startOf('month')
                  .subtract(1, 'month')
                  .format('YYYY,M')
            : moment()
                  .subtract(2, 'month')
                  .add(ETL_DAY, 'days')
                  .format('YYYY,M');
        const data = await getAll('manifests/consistency/' + rrTab, params);
        setConsistnecy({ consistency: [], stats: data.consistency ? data.consistency.toLocaleString('en') : [], statsPerc: getPerc(data.consistency , expected) });
    }, [filters, rrTab, expected]);

    const loadRecency = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate
                ? filters.fromDate
                : moment()
                      .subtract(16, 'days')
                      .format('MMM YYYY'),
        };
        params.period = filters.fromDate
            ? moment(params.fromDate, 'MMM YYYY')
                  .startOf('month')
                  .add(1, 'month')
                  .format('YYYY,M')
            : moment()
                  .subtract(19, 'days')
                  .format('YYYY,M');
        const data = await getAll('manifests/recency/' + rrTab, params);
        setRecency({ recency: [], stats: data.recency ? data.recency.toLocaleString('en') : 0, statsPerc: getPerc(data.recency , expected) });
    }, [filters, rrTab, expected]);

    const loadFacilityInfrastructureType = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate
                ? filters.fromDate
                : moment()
                      .subtract(16, 'days')
                      .format('MMM YYYY'),
        };
        params.period = filters.fromDate
            ? moment(params.fromDate, 'MMM YYYY')
                  .startOf('month')
                  .add(1, 'month')
                  .format('YYYY,M')
            : moment()
                  .subtract(16, 'days')
                  .format('YYYY,M');
        const data = await getAll('manifests/emrinfo/' + rrTab, params);
        setInfrastructure({
            onCloud: data.find((e) => e?.infrastructure_type === 'On Cloud'),
            onPremises: data.find(
                (e) => e?.infrastructure_type === 'On Premises'
            ),
        });
    }, [filters, rrTab, expected]);

    const loadImplementationDate = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate || moment()
                .subtract(16, 'days')
                .format('MMM YYYY'),
        };
        params.period = filters.fromDate
            ? moment(params.fromDate, 'MMM YYYY')
                  .startOf('month')
                  .add(1, 'month')
                  .format('YYYY,M')
            : moment()
                  .subtract(16, 'days')
                  .format('YYYY,M');
        params.year = filters.fromDate
                ? moment(params.fromDate, 'MMM YYYY')
                    .startOf('month')
                    .format('YYYY')
                : moment()
                    .subtract(16, 'days')
                    .format('YYYY')
        params.month = filters.fromDate
                ? moment(params.fromDate, 'MMM YYYY')
                    .format('M')
                : moment()
                    .subtract(16, 'days')
                    .format('M')
        const data = await getAll(
            'manifests/implementationDate/' + rrTab,
            params
        );
        setImplementationStats(data?.facilities_number);
    }, [filters, rrTab, expected]);

    useEffect(() => {
        loadExpected();
        loadConsistnecy();
        loadRecency();
        loadFacilityInfrastructureType();
        loadImplementationDate();
    }, [loadExpected, loadConsistnecy, loadRecency]);

    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-4 col-md-6 col-sm-6 col-xs-6 col-xl-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            EXPECTED UPLOADS
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px',
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">
                                    {expected}
                                </span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-lg-4 col-md-6 col-sm-6 col-xs-6 col-xl-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            OVERALL REPORTING RATES
                        </CardHeader>
                        <CardBody
                            className="align-items-center justify-content-center"
                            style={{
                                backgroundColor: '#F6F6F6',
                                height: '100px',
                            }}
                        >
                            <div
                                className="col-12"
                                style={{ textAlign: 'center' }}
                            >
                                <span className="overall-rates-figure">
                                    {recencyStats.stats}
                                </span>
                                &nbsp;
                                <sup className="overall-rates-sup">
                                    {' '}
                                    {recencyStats.statsPerc || 0}
                                    <span className="overall-rates-sup-perc">
                                        {' '}
                                        %
                                    </span>
                                </sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-lg-4 col-md-12 col-sm-12 col-xs-12 col-xl-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CONSISTENCY OF REPORTING
                        </CardHeader>
                        <CardBody
                            className="align-items-center justify-content-center"
                            style={{
                                backgroundColor: '#F6F6F6',
                                height: '100px',
                            }}
                        >
                            <div
                                className="col-12"
                                style={{ textAlign: 'center' }}
                            >
                                <span className="consistency-reporting-figure">
                                    {consistencyStats.stats}
                                </span>
                                <sup className="consistency-reporting-sup">
                                    {' '}
                                    {consistencyStats.statsPerc
                                        ? consistencyStats.statsPerc
                                        : 0}
                                    <span className="consistency-reporting-sup-perc">
                                        {' '}
                                        %
                                    </span>
                                </sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                {(rrTab === 'ct') ? (
                    <>
                        <div className="col">
                            <Card className="card-uploads-consistency-rates">
                                <CardHeader className="expected-uploads-header">
                                    FACILITIES RECENTLY MIGRATED FROM PAPER
                                </CardHeader>
                                <CardBody
                                    className="align-items-center d-flex justify-content-center"
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: '#F6F6F6',
                                        height: '100px',
                                    }}
                                >
                                    <div className="col-12">
                                        <span className="expected-uploads-text">
                                            {implementationStats}
                                        </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col">
                            <Card className="card-uploads-consistency-rates">
                                <CardHeader className="expected-uploads-header">
                                    FACILITIES ON CLOUD
                                </CardHeader>
                                <CardBody
                                    className="align-items-center d-flex justify-content-center"
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: '#F6F6F6',
                                        height: '100px',
                                    }}
                                >
                                    <div className="col-12">
                                        <span className="expected-uploads-text">
                                            {infrastructureStats.onCloud?.facilities_number.toLocaleString(
                                                'en'
                                            ) || 0}
                                        </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col">
                            <Card className="card-uploads-consistency-rates">
                                <CardHeader className="expected-uploads-header">
                                    FACILITIES ON PREMISES
                                </CardHeader>
                                <CardBody
                                    className="align-items-center d-flex justify-content-center"
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: '#F6F6F6',
                                        height: '100px',
                                    }}
                                >
                                    <div className="col-12">
                                        <span className="expected-uploads-text">
                                            {infrastructureStats.onPremises?.facilities_number.toLocaleString('en') || 0}
                                        </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </>
                ): (<></>)}
            </div>
            <div className="row">
                <div className="col-4">
                    {overallReportingRatesByFacilityNotReportedLoading ===
                    true ? (
                        <Spinner />
                    ) : (
                        <CsvDownloader
                            filename="ndwh_reporting_rates_not_reported"
                            separator=","
                            datas={overallReportingRatesByFacilityNotReported.map(
                                (l) => ({
                                    mfl: l.FacilityId,
                                    name: l.FacilityName,
                                    county: l.County,
                                    sub_county: l.subCounty,
                                    agency: l.Agency,
                                    partner: l.Partner,
                                    reporting_date: filters.fromDate || moment()
                                        .subtract(2, 'month')
                                        .add(ETL_DAY, 'days')
                                        .format('MMM YYYY'),
                                })
                            )}
                            text="Download facilities not reporting"
                            className="btn btn-danger"
                        />
                    )}
                </div>
                <div className="col-4">
                    {overallReportingRatesByFacilityReportedLoading === true ? (
                        <Spinner />
                    ) : (
                        <CsvDownloader
                            filename="ndwh_reporting_rates_reported"
                            separator=","
                            datas={overallReportingRatesByFacilityReported.map(
                                (l) => ({
                                    mfl: l.FacilityId,
                                    name: l.FacilityName,
                                    county: l.County,
                                    sub_county: l.subCounty,
                                    agency: l.Agency,
                                    partner: l.Partner,
                                    upload_date: l.uploaddate
                                        ? l.uploaddate.substring(0, 10)
                                        : '',
                                })
                            )}
                            text="Download facilities reporting"
                            className="btn btn-success"
                        />
                    )}
                </div>
                <div className="col-4">
                    {consistencyByFacilityNotReportedLoading === true ? (
                        <Spinner />
                    ) : (
                        <CsvDownloader
                            filename="ndwh_reporting_rates_not_consistent"
                            separator=","
                            datas={consistencyByFacilityNotReported.map(
                                (l) => ({
                                    mfl: l.MFLCode,
                                    name: l.FacilityName,
                                    county: l.County,
                                    sub_county: l.Subcounty,
                                    agency: l.Agency,
                                    partner: l.Partner,
                                    reporting_date: filters.fromDate || moment()
                                        .startOf('month')
                                        .subtract(1, 'month')
                                        .format('MMM YYYY'),
                                    number_of_uploads: l.NumberOfUploads,
                                })
                            )}
                            text="Download facilities not consistent"
                            className="btn btn-warning"
                        />
                    )}
                </div>
            </div>
            <br></br>
        </>
    );
};

export default RROverview;
