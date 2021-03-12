import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const ViralLoadOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const eligibleForVl = useSelector(currentOnArtOverviewSelectors.getEligibleForVl);
    const eligibleForVlPercent = currentOnArt ? ((eligibleForVl/currentOnArt)*100) : 0;
    const hasCurrentVl = useSelector(currentOnArtOverviewSelectors.getHasCurrentVl);
    const hasCurrentVlPercent = currentOnArt ? ((hasCurrentVl/eligibleForVl)*100) : 0;

    return (
        <Row>
            <Col>
                <DataCard
                    title="CURRENTLY ON ART"
                    subtitle={null}
                    data={formatNumber(currentOnArt)}
                />
            </Col>
            <Col>
                <DataCard
                    title="ELIGIBLE FOR VIRAL LOAD"
                    subtitle={roundNumber(eligibleForVlPercent) + "%"}
                    data={formatNumber(eligibleForVl)}
                />
            </Col>
            <Col>
                <DataCard
                    title="VALID VIRAL LOAD"
                    subtitle={roundNumber(hasCurrentVlPercent) + "%"}
                    data={formatNumber(hasCurrentVl)}
                />
            </Col>
        </Row>
    );
};

export default ViralLoadOverview;
