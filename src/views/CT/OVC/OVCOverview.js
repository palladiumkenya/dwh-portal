import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import DataCardOTZ from '../../Shared/DataCardOTZ';
import { useSelector } from 'react-redux';
import * as ovcOverallServSelector from '../../../selectors/CT/OVC/ovcOverallServ';
import * as ovcServByGenderSelector from '../../../selectors/CT/OVC/ovcServByGender';
import { formatNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';


const OVCOverview = () => {
    const [ovcOverallServ, setOvcOverallServ] = useState({});
    const overallServ = useSelector(ovcOverallServSelector.getOvcOverallServ);
    const overServByGender = useSelector(ovcServByGenderSelector.getOvcServByGender);

    const maleServ = overServByGender.filter(obj => obj.Gender === "Male");
    const femaleServ = overServByGender.filter(obj => obj.Gender === "Female");

    const monthYear = moment().startOf('month').subtract(1, 'month').format('MMM YYYY');

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
            <Col className={"col-12"}>
                <Row>
                    <Col className={"col-4"}>
                        <DataCard
                            title={"OVERALL CALHIV"}
                            subtitle={null}
                            data={formatNumber(ovcOverallServ.ovcOverallServ)}
                            bottomSubTitle={"Total CHILDREN - " + monthYear}
                        />
                    </Col>

                    <Col className={"col-4"}>
                        <DataCard
                            title={"MALE CALHIV"}
                            subtitle={null}
                            data={formatNumber(ovcOverallServ.femaleServ)}
                            bottomSubTitle={"FEMALE CHILDREN - " + monthYear}
                        />
                    </Col>

                    <Col className={"col-4"}>
                        <DataCard
                            title={"FEMALE CALHIV"}
                            subtitle={null}
                            data={formatNumber(ovcOverallServ.maleServ)}
                            bottomSubTitle={"MALE CHILDREN - " + monthYear}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col className={"col-4"}>
                        <DataCard
                            title={"OVERALL OVC"}
                            subtitle={null}
                            data={formatNumber(ovcOverallServ.ovcOverallServ)}
                            bottomSubTitle={"TOTAL ADOLESCENTS - " + monthYear}
                        />
                    </Col>

                    <Col className={"col-4"}>
                        <DataCard
                            title={"MALE OVC"}
                            subtitle={null}
                            data={formatNumber(ovcOverallServ.maleServ)}
                            bottomSubTitle={"MALE OVC - " + monthYear}
                        />
                    </Col>

                    <Col className={"col-4"}>
                        <DataCard
                            title={"FEMALE OVC"}
                            subtitle={null}
                            data={formatNumber(ovcOverallServ.femaleServ)}
                            bottomSubTitle={"FEMALE OVC - " + monthYear}
                        />
                    </Col>
                </Row>
            </Col>



        </Row>
    );
};

export default OVCOverview;
