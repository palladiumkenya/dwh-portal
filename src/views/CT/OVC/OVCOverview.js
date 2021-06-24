import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import DataCardOTZ from '../../Shared/DataCardOTZ';
import { useSelector } from 'react-redux';
import * as ovcOverallServSelector from '../../../selectors/CT/OVC/ovcOverallServ';
import * as ovcServByGenderSelector from '../../../selectors/CT/OVC/ovcServByGender';
import { formatNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';


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
                <DataCard
                    title={"OVERALL OVC_SERV"}
                    subtitle={null}
                    data={formatNumber(ovcOverallServ.ovcOverallServ)}
                />
            </Col>
            <Col className={"col-4"}>
                <DataCard
                    title={"FEMALE OVC_SERV"}
                    subtitle={null}
                    data={formatNumber(ovcOverallServ.femaleServ)}
                />
            </Col>
            <Col className={"col-4"}>
                <DataCard
                    title={"MALE OVC_SERV"}
                    subtitle={null}
                    data={formatNumber(ovcOverallServ.maleServ)}
                />
            </Col>
        </Row>
    );
};

export default OVCOverview;
