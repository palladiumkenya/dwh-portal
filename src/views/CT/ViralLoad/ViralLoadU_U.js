import { useSelector } from "react-redux";
import { Card, Col, Row } from "reactstrap";
import SectionHeader from "../../Shared/SectionHeader";
import ViralLoadUptakeU_U from "./ViralLoadUptakeU_U";
import ViralLoadCategorizationU_U from "./ViralLoadCategorizationU_U";
import DataCardCT from "../../Shared/DataCardCT";
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as vlSelectors from '../../../selectors/CT/ViralLoad/viralLoadUToU';
import ViralLoadPropotionU_U from "./ViralLoadPropotionU_U";


const ViralLoadU_U = () => {
    const vl = useSelector(vlSelectors.getViralLoadUptakeUToU);

	return (
        <>
            <SectionHeader title={`UNDETECTABLE=UNTRANSMITTABLE`} />
            <Row>
                <Col>
                    <DataCardCT
                        title="CURRENTLY ON ART"
                        subtitle={null}
                        data={formatNumber(vl?.TXCurr)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="ELIGIBLE FOR VIRAL LOAD TEST"
                        subtitle={`${roundNumber((vl?.EligibleVL * 100/vl?.TXCurr), 2)}%`}
                        data={formatNumber(vl?.EligibleVL)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="VALID VIRAL LOAD RESULTS"
                        subtitle={`${roundNumber((vl?.HasValidVL * 100/vl?.EligibleVL), 2)}%`}
                        data={formatNumber(vl?.HasValidVL)}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                    <ViralLoadUptakeU_U />
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                    <ViralLoadCategorizationU_U />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataCardCT
                        title="NUMBER ELIGIBLE FOR AT LEAST 2 VL TESTS"
                        subtitle={null}
                        data={formatNumber(vl?.TwoEligibleTests)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="NUMBER WITH TWO CONSECUTIVE VALID VL RESULTS"
                        subtitle={`${roundNumber((vl?.TwoConsTests * 100/vl?.TwoEligibleTests), 2)}%`}
                        data={formatNumber(vl?.TwoConsTests)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="BOTH VIRAL LOAD TESTS ARE <50 COPIES /ML"
                        subtitle={`${roundNumber((vl?.DurableLDL * 100/vl?.TwoConsTests), 2)}%`}
                        data={formatNumber(vl?.DurableLDL)}
                    />
                </Col>
            </Row>
            <ViralLoadPropotionU_U />
        </>
    );

}

export default ViralLoadU_U;
