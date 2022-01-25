import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import * as ovcOverallServSelector from '../../../selectors/CT/OVC/ovcOverallServ';
import * as ovcServByGenderSelector from '../../../selectors/CT/OVC/ovcServByGender';
import * as ovcOverallCALHIVSelector from '../../../selectors/CT/OVC/ovcOverallCALHIV';
import * as ovcCALHIVByGenderSelector from '../../../selectors/CT/OVC/ovcCALHIVByGender';
import { formatNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';


const OVCOverview = () => {
    const [ovcOverallServ, setOvcOverallServ] = useState({});
    const overallServ = useSelector(ovcOverallServSelector.getOvcOverallServ);
    const overServByGender = useSelector(ovcServByGenderSelector.getOvcServByGender);
    const overallCALHIV = useSelector(ovcOverallCALHIVSelector.getOvcOverallCALHIV);
    const ovcCALHIVByGender = useSelector(ovcCALHIVByGenderSelector.getOvcCALHIVByGender);

    const maleServ = overServByGender.filter(obj => obj.Gender === "Male");
    const femaleServ = overServByGender.filter(obj => obj.Gender === "Female");

    const maleCALHIV = ovcCALHIVByGender.filter(obj => obj.Gender === "Male");
    const femaleCALHIV = ovcCALHIVByGender.filter(obj => obj.Gender === "Female");

    const monthYear = moment().startOf('month').subtract(1, 'month').format('MMM YYYY');

    const loadOvcOverallServ = useCallback(async () => {
        setOvcOverallServ({
            ovcOverallServ: overallServ.overallOvcServ,
            maleServ: maleServ.length > 0 ? maleServ[0].overallOvcServ : 0,
            femaleServ: femaleServ.length > 0 ? femaleServ[0].overallOvcServ : 0,
            overallCALHIV: overallCALHIV.overallCALHIV,
            maleCALHIV: maleCALHIV.length > 0 ? maleCALHIV[0].CALHIV : 0,
            femaleCALHIV: femaleCALHIV.length > 0 ? femaleCALHIV[0].CALHIV : 0,
        });
    },[overallServ, overServByGender, overallCALHIV, ovcCALHIVByGender]);

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
                            data={formatNumber(ovcOverallServ.overallCALHIV)}
                            bottomSubTitle={"Total CHILDREN - " + monthYear}
                        />
                    </Col>

                    <Col className={"col-4"}>
                        <DataCard
                            title={"MALE CALHIV"}
                            subtitle={null}
                            data={formatNumber(ovcOverallServ.maleCALHIV)}
                            bottomSubTitle={"MALE CHILDREN - " + monthYear}
                        />
                    </Col>

                    <Col className={"col-4"}>
                        <DataCard
                            title={"FEMALE CALHIV"}
                            subtitle={null}
                            data={formatNumber(ovcOverallServ.femaleCALHIV)}
                            bottomSubTitle={"FEMALE CHILDREN - " + monthYear}
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
