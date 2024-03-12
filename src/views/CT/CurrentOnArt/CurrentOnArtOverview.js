import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import * as currentOnArtSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArt';
import { formatNumber, roundNumber } from '../../../utils/utils';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DataCardCT from '../../Shared/DataCardCT';

const CurrentOnArtOverview = () => {
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

    return (
        <>
            <Row>
                <Col
                    className={
                        'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  col-xl-4'
                    }
                >
                    <DataCardCT
                        title="TOTAL CURRENT ON ART"
                        data={formatNumber(currentOnArt)}
                    />
                </Col>
                <Col
                    className={
                        'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  col-xl-4'
                    }
                >
                    <DataCardCT
                        title={'VERIFIED AND CURRENT ON ART'}
                        subtitle={
                            roundNumber(currentOnArtVerifiedPercent, 2) + '%'
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
                        title="NOT VERIFIED AND CURRENT ON ART"
                        subtitle={
                            roundNumber(currentOnArtNotVerifiedPercent, 2) + '%'
                        }
                        data={formatNumber(currentOnArt - currentOnArtVerified)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default CurrentOnArtOverview;
