import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import { formatNumber, roundNumber } from '../../utils/utils';
import DataCard from '../Shared/DataCard';
import moment from 'moment';

const HomeVLCascade = () => {
    const currentOnArt = useSelector(
        currentOnArtOverviewSelectors.getCurrentOnArt
    );
    const currentOnArtText =
        'CURRENT ON ART as at ' +
        moment()
            .startOf('month')
            .subtract(2, 'month')
            .add(15, 'days')
            .format('MMM YYYY');
    const eligibleForVl = useSelector(
        currentOnArtOverviewSelectors.getEligibleForVl
    );
    const eligibleForVlPercent = currentOnArt
        ? (eligibleForVl / currentOnArt) * 100
        : 0;
    const hasCurrentVl = useSelector(
        currentOnArtOverviewSelectors.getHasCurrentVl
    );
    const hasCurrentVlPercent = currentOnArt
        ? (hasCurrentVl / eligibleForVl) * 100
        : 0;
    const virallySuppressed = useSelector(
        currentOnArtOverviewSelectors.getVirallySuppressed
    );
    const lowLevelViremia = useSelector(
        currentOnArtOverviewSelectors.getLowLevelViremia
    );
    const suppressed = virallySuppressed + lowLevelViremia;
    const suppressedPercent = currentOnArt
        ? (suppressed / hasCurrentVl) * 100
        : 0;

    return (
        <Row>
            <Col>
                <DataCard
                    title={currentOnArtText}
                    subtitle={null}
                    data={formatNumber(currentOnArt)}
                />
            </Col>
            <Col>
                <DataCard
                    title="ELIGIBLE FOR VL"
                    subtitle={roundNumber(eligibleForVlPercent) + '%'}
                    data={formatNumber(eligibleForVl)}
                />
            </Col>
            <Col>
                <DataCard
                    title="VALID VIRAL LOAD"
                    subtitle={roundNumber(hasCurrentVlPercent) + '%'}
                    data={formatNumber(hasCurrentVl)}
                />
            </Col>
            <Col>
                <DataCard
                    title="VIRALLY SUPPRESSED"
                    subtitle={roundNumber(suppressedPercent) + '%'}
                    data={formatNumber(suppressed)}
                />
            </Col>
        </Row>
    );
};

export default HomeVLCascade;
