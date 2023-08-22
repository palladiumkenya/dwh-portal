import React from 'react';
import { formatNumber, roundNumber } from '../../../utils/utils';
import { Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import DataCard from '../../Shared/DataCard';
import * as treatmentOutcomesOverallLast12m from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesOverallLast12m';
import DataCardCT from '../../Shared/DataCardCT';

const TreatmentOutcomesOverview = () => {
    const startedOnArt = useSelector(treatmentOutcomesOverallLast12m.getStartedOnArt);
    const active = useSelector(treatmentOutcomesOverallLast12m.getActive);
    const dead = useSelector(treatmentOutcomesOverallLast12m.getDead);
    const ltfu = useSelector(treatmentOutcomesOverallLast12m.getLtfu);
    const stopped = useSelector(treatmentOutcomesOverallLast12m.getStopped);
    const transferOut = useSelector(treatmentOutcomesOverallLast12m.getTransferOut);
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
                    <DataCardCT
                        title="STARTED ART"
                        subtitle={null}
                        data={formatNumber(startedOnArt)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="CURRENT ON ART"
                        subtitle={roundNumber(activePercent) + "%"}
                        data={formatNumber(active)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="IIT"
                        subtitle={roundNumber(ltfuPercent) + "%"}
                        data={formatNumber(ltfu)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataCardCT
                        title="DEAD"
                        subtitle={roundNumber(deadPercent) + "%"}
                        data={formatNumber(dead)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="TRANSFER OUT"
                        subtitle={roundNumber(transferOutPercent) + "%"}
                        data={formatNumber(transferOut)}
                    />
                </Col>
                <Col>
                    <DataCardCT
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
