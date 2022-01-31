import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const ViralLoadOutcomesOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const hasCurrentVl = useSelector(currentOnArtOverviewSelectors.getHasCurrentVl);
    const virallySuppressed = useSelector(currentOnArtOverviewSelectors.getVirallySuppressed);
    const lowLevelViremia = useSelector(currentOnArtOverviewSelectors.getLowLevelViremia);
    const lowLevelViremiaPercent = currentOnArt ? ((lowLevelViremia/currentOnArt)*100) : 0;
    const highViralLoad = useSelector(currentOnArtOverviewSelectors.getHighViralLoad);
    const highViralLoadPercent = currentOnArt ? ((highViralLoad/currentOnArt)*100) : 0;
    const suppressed = virallySuppressed + lowLevelViremia;
    const suppressedPercent = currentOnArt ? ((suppressed/hasCurrentVl)*100) : 0;

    return (
        <Row>
            <Col>
                <DataCard
                    title="LESS THAN DETECTABLE LEVEL(LDL)"
                    subtitle={roundNumber(suppressedPercent, 1) + "%"}
                    data={formatNumber(suppressed)}
                />
            </Col>
            <Col>
                <DataCard
                    title="HIGH VIRAL LOAD"
                    subtitle={roundNumber(highViralLoadPercent, 1) + "%"}
                    data={formatNumber(highViralLoad)}
                />
            </Col>
            <Col>
                <DataCard
                    title="LOW LEVEL VIREMIA"
                    subtitle={roundNumber(lowLevelViremiaPercent, 1) + "%"}
                    data={formatNumber(lowLevelViremia)}
                />
            </Col>
        </Row>
    );
}

export default ViralLoadOutcomesOverview;
