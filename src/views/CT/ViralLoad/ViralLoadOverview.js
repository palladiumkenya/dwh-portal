import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const ViralLoadOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const hasCurrentVl = useSelector(currentOnArtOverviewSelectors.getHasCurrentVl);
    const hasCurrentVlPercent = currentOnArt ? ((hasCurrentVl/currentOnArt)*100) : 0;
    const virallySuppressed = useSelector(currentOnArtOverviewSelectors.getVirallySuppressed);
    const virallySuppressedPercent = currentOnArt ? ((virallySuppressed/currentOnArt)*100) : 0;

    return (
        <Row>
            <Col>
                <DataCard
                    title="PATIENTS CURRENT ON TREATMENT"
                    subtitle={null}
                    data={formatNumber(currentOnArt)}
                />
            </Col>
            <Col>
                <DataCard
                    title="PATIENTS WITH CURRENT VL"
                    subtitle={roundNumber(hasCurrentVlPercent) + "%"}
                    data={formatNumber(hasCurrentVl)}
                />
            </Col>
            <Col>
                <DataCard
                    title="VIRAL SUPPRESSION"
                    subtitle={roundNumber(virallySuppressedPercent) + "%"}
                    data={formatNumber(virallySuppressed)}
                />
            </Col>
        </Row>
    );
};

export default ViralLoadOverview;
