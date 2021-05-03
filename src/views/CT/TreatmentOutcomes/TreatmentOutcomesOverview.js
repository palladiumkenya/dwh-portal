import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as newOnArtOverviewSelectors from '../../../selectors/CT/NewOnArt/newOnArtOverview';
import * as treatmentOutcomesBySexSelectors from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesBySex';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const TreatmentOutcomesOverview = () => {
    const startedOnArt = useSelector(newOnArtOverviewSelectors.getNewOnArt);
    const active = useSelector(treatmentOutcomesBySexSelectors.getActive);
    const dead = useSelector(treatmentOutcomesBySexSelectors.getDead);
    const ltfu = useSelector(treatmentOutcomesBySexSelectors.getLtfu);
    const stopped = useSelector(treatmentOutcomesBySexSelectors.getStopped);
    const transferOut = useSelector(treatmentOutcomesBySexSelectors.getTransferOut);
    const netCohort = startedOnArt > 0 ? (startedOnArt - transferOut - stopped) : 0;
    const activePercent = startedOnArt > 0 ? ((active/startedOnArt)*100) : 0;
    const deadPercent = netCohort > 0 ? ((dead/netCohort)*100) : 0;
    const ltfuPercent = netCohort > 0 ? ((ltfu/netCohort)*100) : 0;
    const stoppedPercent = netCohort > 0 ? ((stopped/netCohort)*100) : 0;
    const transferOutPercent = netCohort > 0 ? ((transferOut/netCohort)*100) : 0;

    return (
        <>
            <Row>
                <Col>
                    <DataCard
                        title="STARTED ART"
                        subtitle={null}
                        data={formatNumber(startedOnArt)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="CURRENT ON ART"
                        subtitle={roundNumber(activePercent) + "%"}
                        data={formatNumber(active)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="LOST TO FOLLOW UP"
                        subtitle={roundNumber(ltfuPercent) + "%"}
                        data={formatNumber(ltfu)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataCard
                        title="DEAD"
                        subtitle={roundNumber(deadPercent) + "%"}
                        data={formatNumber(dead)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="TRANSFER OUT"
                        subtitle={roundNumber(transferOutPercent) + "%"}
                        data={formatNumber(transferOut)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="STOPPED ART"
                        subtitle={roundNumber(stoppedPercent) + "%"}
                        data={formatNumber(stopped)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default TreatmentOutcomesOverview;
