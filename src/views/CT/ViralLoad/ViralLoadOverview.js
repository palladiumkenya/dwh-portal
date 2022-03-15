import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import DataCardCT from '../../Shared/DataCardCT';

const ViralLoadOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const eligibleForVl = useSelector(currentOnArtOverviewSelectors.getEligibleForVl);
    const eligibleForVlPercent = currentOnArt ? ((eligibleForVl/currentOnArt)*100) : 0;
    const hasCurrentVl = useSelector(currentOnArtOverviewSelectors.getHasCurrentVl);
    const hasCurrentVlPercent = currentOnArt ? ((hasCurrentVl/eligibleForVl)*100) : 0;

    return (
        <Row>
            <Col>
                <DataCardCT
                    title="CURRENTLY ON ART"
                    subtitle={null}
                    data={formatNumber(currentOnArt)}
                />
            </Col>
            <Col>
                <DataCardCT
                    title="ELIGIBLE FOR VIRAL LOAD"
                    subtitle={roundNumber(eligibleForVlPercent, 1) + "%"}
                    data={formatNumber(eligibleForVl)}
                />
            </Col>
            <Col>
                <DataCardCT
                    title="VALID VIRAL LOAD"
                    subtitle={roundNumber(hasCurrentVlPercent, 1) + "%"}
                    data={formatNumber(hasCurrentVl)}
                />
            </Col>
        </Row>
    );
};

export default ViralLoadOverview;
