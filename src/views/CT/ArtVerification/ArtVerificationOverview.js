import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import * as currentOnArtSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArt';
import { formatNumber, roundNumber } from '../../../utils/utils';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DataCardCT from '../../Shared/DataCardCT';

const ArtVerificationOverview = () => {
    const currentOnArt = useSelector(currentOnArtSelectors.getCurrentOnArt);
    
    const currentOnArtVerified = useSelector(
        currentOnArtOverviewSelectors.getCurrentOnArtVerified
    );
    const currentOnArtVerifiedPercent = currentOnArt
        ? (currentOnArtVerified / currentOnArt) * 100
        : 0;
    const currentOnArtNotVerifiedPercent = currentOnArt
        ? ((currentOnArt - currentOnArtVerified) / currentOnArt) * 100
        : 0;
	const txcurrKHIS = 1000;

    return (
        <>
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
                        subtitle={
                            roundNumber(currentOnArtVerifiedPercent) + '%'
                        }
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
                        subtitle={
                            roundNumber(currentOnArtNotVerifiedPercent) + '%'
                        }
                        data={formatNumber(currentOnArt - currentOnArtVerified)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default ArtVerificationOverview;
