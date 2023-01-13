import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import * as verifySelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCardCT from '../../Shared/DataCardCT';

const ArtVerificationOverview = () => {
    const currentOnArtVerified = useSelector(
        verifySelectors.getArtVerificationTotal
    );
    const txcurrKHIS = useSelector(verifySelectors.getArtVerificationTxTotal).total;
    let loading = useSelector(
        verifySelectors.getArtVerificationTxTotal
    ).loadingC;

    return (
        <>
            {loading ? (
                <Spinner color="danger" />
            ) : (
                <Row>
                    <Col
                        className={
                            'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  col-xl-4'
                        }
                    >
                        <DataCardCT
                            title="TX CURR (KHIS)"
                            data={formatNumber(txcurrKHIS)}
                        />
                    </Col>
                    <Col
                        className={
                            'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  col-xl-4'
                        }
                    >
                        <DataCardCT
                            title={'VERIFIED CLIENTS'}
                            data={formatNumber(currentOnArtVerified)}
                        />
                    </Col>
                    <Col
                        className={
                            'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 col-xl-4'
                        }
                    >
                        <DataCardCT
                            title="UNVERIFIED CLIENTS"
                            data={formatNumber(
                                txcurrKHIS - currentOnArtVerified
                            )}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
};

export default ArtVerificationOverview;
