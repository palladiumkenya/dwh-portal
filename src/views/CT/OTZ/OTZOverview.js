import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import * as otzTotalAdolescentsSelector from '../../../selectors/CT/OTZ/otzTotalAdolescents';
import * as otzEnrolledSelector from '../../../selectors/CT/OTZ/otzEnrolled';
import * as otzTotalWithVlResultsSelector from '../../../selectors/CT/OTZ/otzTotalWithVlResults';
import * as otzTotalWithWithResultsLessThan1000Selector from '../../../selectors/CT/OTZ/otzTotalWithWithResultsLessThan1000';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';

const OTZOverview = () => {
    const [otzTotalAdolescents, setOtzTotalAdolescents] = useState({});
    const adolescents = useSelector(otzTotalAdolescentsSelector.getOtzTotalAdolescents);
    const otzEnrolled = useSelector(otzEnrolledSelector.getOtzEnrolled);
    const otzTotalWithVlResults = useSelector(otzTotalWithVlResultsSelector.getOtzTotalWithVlResults);
    const otzTotalWithVlResultsLessThan1000 = useSelector(otzTotalWithWithResultsLessThan1000Selector.getOtzTotalWithVlResultsLessThan1000);
    const currentOnArtText = "ADOLESCENTS CURRENT ON ART as at " + moment().startOf('month').subtract(1, 'month').format('MMM YYYY');

    const loadOtzTotalAdolescents = useCallback(async () => {
        setOtzTotalAdolescents({
            otzTotalAdolescents : adolescents.totalAdolescents,
            enrolledInOTZ: otzEnrolled.enrolledInOTZ,
            enrolledInOTZPerc: parseInt(adolescents.totalAdolescents, 10) > 0 ? ((otzEnrolled.enrolledInOTZ/adolescents.totalAdolescents)*100) : 0,
            totalWithVlResults: otzTotalWithVlResults.totalWithVlResults,
            totalWithVlResultsPerc: parseInt(otzEnrolled.enrolledInOTZ, 10) > 0 ? ((otzTotalWithVlResults.totalWithVlResults/otzEnrolled.enrolledInOTZ)*100) : 0,
            totalWithVlLessThan1000: otzTotalWithVlResultsLessThan1000.totalWithVlLessThan1000,
            totalWithVlLessThan1000Perc: parseInt(otzEnrolled.enrolledInOTZ, 10) > 0 ? ((otzTotalWithVlResultsLessThan1000.totalWithVlLessThan1000/otzEnrolled.enrolledInOTZ)*100) : 0,
        });
    },[adolescents]);

    useEffect(() => {
        loadOtzTotalAdolescents();
    }, [loadOtzTotalAdolescents]);

    return (
        <Row>
            <Col>
                <DataCard
                    title={currentOnArtText}
                    subtitle={null}
                    data={formatNumber(otzTotalAdolescents.otzTotalAdolescents)}
                />
            </Col>
            <Col>
                <DataCard
                    title="ENROLLED ON OTZ"
                    subtitle={roundNumber(otzTotalAdolescents.enrolledInOTZPerc) + "%"}
                    data={formatNumber(otzTotalAdolescents.enrolledInOTZ)}
                />
            </Col>
            <Col>
                <DataCard
                    title="ADOLESCENTS ON OTZ WITH VALID VL"
                    subtitle={roundNumber(otzTotalAdolescents.totalWithVlResultsPerc) + "%"}
                    data={formatNumber(otzTotalAdolescents.totalWithVlResults)}
                />
            </Col>
            <Col>
                <DataCard
                    title="ADOLESCENTS ON OTZ VIRALLY SUPPRESSED"
                    subtitle={roundNumber(otzTotalAdolescents.totalWithVlLessThan1000Perc) + "%"}
                    data={formatNumber(otzTotalAdolescents.totalWithVlLessThan1000)}
                />
            </Col>
        </Row>
    );
}

export default OTZOverview;
