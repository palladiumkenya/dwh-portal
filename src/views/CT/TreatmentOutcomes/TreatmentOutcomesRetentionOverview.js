import { Col, Row } from 'reactstrap';
import DataCard from '../../Shared/DataCard';
import { formatNumber, roundNumber } from '../../../utils/utils';
import React from 'react';
import { useSelector } from 'react-redux';
import * as treatmentOutcomesOverallLast12m
    from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesOverallLast12m';

import * as treatmentOutcomesNetCohort
    from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesNetCohort';

const TreatmentOutcomesRetentionOverview = () => {
    const startedOnArt = useSelector(treatmentOutcomesOverallLast12m.getStartedOnArt);
    const netCohort = useSelector(treatmentOutcomesNetCohort.getTreatmentOutcomesNetCohort);
    const active = useSelector(treatmentOutcomesOverallLast12m.getActive);
    const dead = useSelector(treatmentOutcomesOverallLast12m.getDead);
    const ltfu = useSelector(treatmentOutcomesOverallLast12m.getLtfu);
    const stopped = useSelector(treatmentOutcomesOverallLast12m.getStopped);
    const transferOut = useSelector(treatmentOutcomesOverallLast12m.getTransferOut);
    // const netCohort = startedOnArt > 0 ? (startedOnArt - transferOut - stopped) : 0;
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
                        title="NET COHORT"
                        subtitle={null}
                        data={formatNumber(netCohort)}
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
                <Col className={"col-3"}>
                    <DataCard
                        title="DEAD"
                        subtitle={roundNumber(deadPercent) + "%"}
                        data={formatNumber(dead)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default TreatmentOutcomesRetentionOverview;
