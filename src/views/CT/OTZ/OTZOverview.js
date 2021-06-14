import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import DataCardOTZ from '../../Shared/DataCardOTZ';
import { useSelector } from 'react-redux';
import * as otzTotalAdolescentsSelector from '../../../selectors/CT/OTZ/otzTotalAdolescents';
import * as otzEnrolledSelector from '../../../selectors/CT/OTZ/otzEnrolled';
import * as otzTotalWithVlResultsSelector from '../../../selectors/CT/OTZ/otzTotalWithVlResults';
import * as otzTotalWithWithResultsLessThan1000Selector from '../../../selectors/CT/OTZ/otzTotalWithWithResultsLessThan1000';
import { formatNumber } from '../../../utils/utils';

const OTZOverview = () => {
    const [otzTotalAdolescents, setOtzTotalAdolescents] = useState({});
    const adolescents = useSelector(otzTotalAdolescentsSelector.getOtzTotalAdolescents);
    const otzEnrolled = useSelector(otzEnrolledSelector.getOtzEnrolled);
    const otzTotalWithVlResults = useSelector(otzTotalWithVlResultsSelector.getOtzTotalWithVlResults);
    const otzTotalWithVlResultsLessThan1000 = useSelector(otzTotalWithWithResultsLessThan1000Selector.getOtzTotalWithVlResultsLessThan1000);

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
                <DataCardOTZ title={"TOTAL ADOLESCENTS"} body={formatNumber(otzTotalAdolescents.otzTotalAdolescents)} subtitle={""} percent={null}  />
            </Col>
            <Col>
                <DataCardOTZ title={"ENROLLED ON OTZ"} body={formatNumber(otzTotalAdolescents.enrolledInOTZ)} subtitle={""} percent={(otzTotalAdolescents.enrolledInOTZPerc ? otzTotalAdolescents.enrolledInOTZPerc.toFixed(1) : 0) + "%"} />
            </Col>
            <Col>
                <DataCardOTZ title={"TOTAL WITH VL RESULTS"} body={formatNumber(otzTotalAdolescents.totalWithVlResults)} subtitle={""} percent={(otzTotalAdolescents.totalWithVlResultsPerc ? otzTotalAdolescents.totalWithVlResultsPerc.toFixed(1) : 0) + "%"} />
            </Col>
            <Col>
                <DataCardOTZ title={"TOTAL WITH VL<1000"} body={formatNumber(otzTotalAdolescents.totalWithVlLessThan1000)} subtitle={""} percent={(otzTotalAdolescents.totalWithVlLessThan1000Perc ? otzTotalAdolescents.totalWithVlLessThan1000Perc.toFixed(1) : 0) + "%"} />
            </Col>
        </Row>
    );
}

export default OTZOverview;
