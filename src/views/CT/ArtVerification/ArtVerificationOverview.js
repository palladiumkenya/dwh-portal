import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import * as currOnArtKHIS from '../../../selectors/Operational&HIS/Comparison/currOnArtKHIS';
import * as currentOnArtSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArt';
import { formatNumber, roundNumber } from '../../../utils/utils';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DataCardCT from '../../Shared/DataCardCT';

const ArtVerificationOverview = () => {
    const currentOnArt = useSelector(currentOnArtSelectors.getCurrentOnArt);
    
    const currentOnArtVerified = useSelector(
        currentOnArtOverviewSelectors.getCurrentOnArtVerified
    );
	const txcurrKHIS = useSelector(currOnArtKHIS.getCurrOnArtKHIS).totalOnART;

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
                        data={formatNumber(txcurrKHIS - currentOnArtVerified)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default ArtVerificationOverview;
