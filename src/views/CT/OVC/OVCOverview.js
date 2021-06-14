import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import DataCardOTZ from '../../Shared/DataCardOTZ';
import { useSelector } from 'react-redux';
import * as ovcOverallServSelector from '../../../selectors/CT/OVC/ovcOverallServ';
import * as ovcServByGenderSelector from '../../../selectors/CT/OVC/ovcServByGender';
import { formatNumber } from '../../../utils/utils';


const OVCOverview = () => {
    const [ovcOverallServ, setOvcOverallServ] = useState({});
    const overallServ = useSelector(ovcOverallServSelector.getOvcOverallServ);
    const overServByGender = useSelector(ovcServByGenderSelector.getOvcServByGender);

    const maleServ = overServByGender.filter(obj => obj.Gender === "Male");
    const femaleServ = overServByGender.filter(obj => obj.Gender === "Female");

    const loadOvcOverallServ = useCallback(async () => {
        setOvcOverallServ({
            ovcOverallServ: overallServ.overallOvcServ,
            maleServ: maleServ.length > 0 ? maleServ[0].overallOvcServ : 0,
            femaleServ: femaleServ.length > 0 ? femaleServ[0].overallOvcServ : 0
        });
    },[overallServ, overServByGender]);

    useEffect(() => {
        loadOvcOverallServ();
    }, [loadOvcOverallServ]);

    return (
        <Row>
            <Col className={"col-4"}>
                <DataCardOTZ title={"OVERALL OVC_SERV"} body={formatNumber(ovcOverallServ.ovcOverallServ)} subtitle={""} percent={null} />
            </Col>
            <Col className={"col-4"}>
                <DataCardOTZ title={"FEMALE OVC_SERV"} body={formatNumber(ovcOverallServ.femaleServ)} subtitle={""} percent={null} />
            </Col>
            <Col className={"col-4"}>
                <DataCardOTZ title={"MALE OVC_SERV"} body={formatNumber(ovcOverallServ.maleServ)} subtitle={""} percent={null} />
            </Col>
        </Row>
    );
};

export default OVCOverview;
