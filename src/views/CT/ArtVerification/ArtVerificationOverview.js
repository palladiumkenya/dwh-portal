import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import * as verifySelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';
import * as currentOnArtSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArt';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCardCT from '../../Shared/DataCardCT';

const ArtVerificationOverview = () => {
    const currentOnArt = useSelector(currentOnArtSelectors.getCurrentOnArt);
    const currentOnArtVerified = useSelector(
        currentOnArtOverviewSelectors.getCurrentOnArtVerified
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
                            title="TX CURR"
                            data={formatNumber(currentOnArt)}
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
                                currentOnArt - currentOnArtVerified
                            )}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
};

export default ArtVerificationOverview;
