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
    const suppressed = virallySuppressed;
    const highRisk = useSelector(currentOnArtOverviewSelectors.getHighRisk);
    const lowRisk = useSelector(currentOnArtOverviewSelectors.getLowRisk);
    const ldl = useSelector(currentOnArtOverviewSelectors.getLDL);
    const unsuppressed = useSelector(currentOnArtOverviewSelectors.getUnsuppressed);
    // const totals = suppressed + highViralLoad;
    // const lowLevelViremiaPercent = currentOnArt ? ((lowLevelViremia/totals)*100) : 0;
    // const highViralLoadPercent = currentOnArt ? ((highViralLoad/totals)*100) : 0;
    // const suppressedPercent = currentOnArt ? (suppressed / totals) * 100 : 0;

    return (
        <Row>
            <Col>
                <DataCardCT
                    title="LDL"
                    // subtitle={roundNumber(suppressedPercent, 1) + '%'}
                    data={formatNumber(ldl)}
                />
            </Col>
            <Col>
                <DataCardCT
                    title="LOW RISK LLV"
                    // subtitle={roundNumber(highViralLoadPercent, 1) + '%'}
                    data={formatNumber(lowRisk)}
                />
            </Col>
            <Col>
                <DataCardCT
                    title="HIGH RISK LLV"
                    // subtitle={roundNumber(lowLevelViremiaPercent, 1) + '%'}
                    data={formatNumber(highRisk)}
                />
            </Col>
            <Col>
                <DataCardCT
                    title="UNSUPPRESSED"
                    // subtitle={roundNumber(lowLevelViremiaPercent, 1) + '%'}
                    data={formatNumber(unsuppressed)}
                />
            </Col>
        </Row>
    );
}

export default ViralLoadOutcomesOverview;
