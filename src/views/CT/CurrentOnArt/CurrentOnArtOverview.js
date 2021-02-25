import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const CurrentOnArtOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const eligibleForVl = useSelector(currentOnArtOverviewSelectors.getEligibleForVl);
    const eligibleForVlPercent = currentOnArt ? ((eligibleForVl/currentOnArt)*100) : 0;
    const hasCurrentVl = useSelector(currentOnArtOverviewSelectors.getHasCurrentVl);
    const hasCurrentVlPercent = currentOnArt ? ((hasCurrentVl/currentOnArt)*100) : 0;
    const virallySuppressed = useSelector(currentOnArtOverviewSelectors.getVirallySuppressed);
    const virallySuppressedPercent = currentOnArt ? ((virallySuppressed/hasCurrentVl)*100) : 0;
    const lowLevelViremia = useSelector(currentOnArtOverviewSelectors.getLowLevelViremia);
    const lowLevelViremiaPercent = currentOnArt ? ((lowLevelViremia/currentOnArt)*100) : 0;
    const highViralLoad = useSelector(currentOnArtOverviewSelectors.getHighViralLoad);
    const highViralLoadPercent = currentOnArt ? ((highViralLoad/currentOnArt)*100) : 0;

    return (
        <>
            {/*<Row>
                <Col>
                    <DataCard
                        title="CURRENTLY ON ART"
                        subtitle={null}
                        data={formatNumber(currentOnArt)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="ELIGIBLE FOR VL"
                        subtitle={roundNumber(eligibleForVlPercent) + "%"}
                        data={formatNumber(eligibleForVl)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="HAS CURRENT VIRAL LOAD"
                        subtitle={roundNumber(hasCurrentVlPercent) + "%"}
                        data={formatNumber(hasCurrentVl)}
                    />
                </Col>
            </Row>*/}
            <Row>
                <Col>
                    <DataCard
                        title="VIRALLY SUPPRESSED"
                        subtitle={roundNumber(virallySuppressedPercent) + "%"}
                        data={formatNumber(virallySuppressed)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="LOW LEVEL VIREMIA"
                        subtitle={roundNumber(lowLevelViremiaPercent) + "%"}
                        data={formatNumber(lowLevelViremia)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="HIGH VIRAL LOAD"
                        subtitle={roundNumber(highViralLoadPercent) + "%"}
                        data={formatNumber(highViralLoad)}
                    />
                </Col>
            </Row>
        </>
    );
}

export default CurrentOnArtOverview;
