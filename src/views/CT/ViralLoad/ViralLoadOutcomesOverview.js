import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import DataCardCT from '../../Shared/DataCardCT';

const ViralLoadOutcomesOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const hasCurrentVl = useSelector(currentOnArtOverviewSelectors.getHasCurrentVl);
    const virallySuppressed = useSelector(currentOnArtOverviewSelectors.getVirallySuppressed);
    const lowLevelViremia = useSelector(currentOnArtOverviewSelectors.getLowLevelViremia);
    const highViralLoad = useSelector(currentOnArtOverviewSelectors.getHighViralLoad);
    const suppressed = virallySuppressed + lowLevelViremia;
    const totals = suppressed + highViralLoad;
    const lowLevelViremiaPercent = currentOnArt ? ((lowLevelViremia/totals)*100) : 0;
    const highViralLoadPercent = currentOnArt ? ((highViralLoad/totals)*100) : 0;
    const suppressedPercent = currentOnArt ? ((suppressed/hasCurrentVl)*100) : 0;

    return (
        <Row>
            <Col>
                <DataCardCT
                    title="LESS THAN DETECTABLE LEVEL(LDL)"
                    subtitle={roundNumber(suppressedPercent, 1) + "%"}
                    data={formatNumber(suppressed)}
                />
            </Col>
            <Col>
                <DataCardCT
                    title="HIGH VIRAL LOAD"
                    subtitle={roundNumber(highViralLoadPercent, 1) + "%"}
                    data={formatNumber(highViralLoad)}
                />
            </Col>
            <Col>
                <DataCardCT
                    title="LOW LEVEL VIREMIA"
                    subtitle={roundNumber(lowLevelViremiaPercent, 1) + "%"}
                    data={formatNumber(lowLevelViremia)}
                />
            </Col>
        </Row>
    );
}

export default ViralLoadOutcomesOverview;
