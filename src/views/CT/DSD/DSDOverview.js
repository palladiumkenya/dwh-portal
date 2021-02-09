import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import * as dsdStabilityStatusByAgeSexSelectors from '../../../selectors/CT/Dsd/dsdStabilityStatusByAgeSex';
import * as dsdUnstableSelectors from '../../../selectors/CT/Dsd/dsdUnstable';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const DSDOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const mmd = useSelector(dsdStabilityStatusByAgeSexSelectors.getMmd);
    const mmdPercent = currentOnArt ? ((mmd/currentOnArt)*100) : 0;
    const stable = useSelector(dsdStabilityStatusByAgeSexSelectors.getStable);
    const stablePercent = currentOnArt ? ((stable/currentOnArt)*100) : 0;
    const onArtLessThan12Months = useSelector(dsdUnstableSelectors.getOnArtLessThan12Months);
    const onArtLessThan12MonthsPercent = currentOnArt ? ((onArtLessThan12Months/currentOnArt)*100) : 0;
    const highVl = useSelector(dsdUnstableSelectors.getHighVl);
    const highVlPercent = currentOnArt ? ((highVl/currentOnArt)*100) : 0;
    const poorAdherence = useSelector(dsdUnstableSelectors.getPoorAdherence);
    const poorAdherencePercent = currentOnArt ? ((poorAdherence/currentOnArt)*100) : 0;

    return (
        <>
            <Row>
                <Col>
                    <DataCard
                        title="CURRENT ON ART"
                        subtitle={null}
                        data={formatNumber(currentOnArt)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="PATIENTS ON MMD"
                        subtitle={roundNumber(mmdPercent) + "%"}
                        data={formatNumber(mmd)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="STABLE PATIENTS"
                        subtitle={roundNumber(stablePercent) + "%"}
                        data={formatNumber(stable)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataCard
                        title="PATIENTS ON ART &lt;1 YEAR"
                        subtitle={roundNumber(onArtLessThan12MonthsPercent) + "%"}
                        data={formatNumber(onArtLessThan12Months)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="PATIENTS WITH HVL"
                        subtitle={roundNumber(highVlPercent) + "%"}
                        data={formatNumber(highVl)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="PATIENTS WITH POOR ADHERANCE"
                        subtitle={roundNumber(poorAdherencePercent) + "%"}
                        data={formatNumber(poorAdherence)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default DSDOverview;
