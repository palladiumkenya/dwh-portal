import { Card, Col, Row } from "reactstrap";
import SectionHeader from "../../Shared/SectionHeader";
import ViralLoadUptakeU_U from "./ViralLoadUptakeU_U";
import ViralLoadCategorizationU_U from "./ViralLoadCategorizationU_U";
import DataCardCT from "../../Shared/DataCardCT";
import { formatNumber } from "../../../utils/utils";
import * as vlSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import { useSelector } from "react-redux";
import ViralLoadPropotionU_U from "./ViralLoadPropotionU_U";


const ViralLoadU_U = () => {
    const currentOnArt = useSelector(vlSelectors.getCurrentOnArt);
    const eligibleForVl = useSelector(vlSelectors.getEligibleForVl);
    const hasCurrentVl = useSelector(vlSelectors.getHasCurrentVl);

	return (
        <>
            <SectionHeader title={`UNDETECTABLE=UNTRAMITTABLE`} />
            <Row>
                <Col>
                    <DataCardCT
                        title="CURRENTLY ON ART"
                        subtitle={null}
                        data={formatNumber(currentOnArt)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="ELIGIBLE FOR VIRAL LOAD TEST"
                        subtitle={null}
                        data={formatNumber(eligibleForVl)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="VALID VIRAL LOAD RESULTS"
                        subtitle={null}
                        data={formatNumber(hasCurrentVl)}
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
                        data={formatNumber(hasCurrentVl)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="NUMBER WITH TWO CONSECUTIVE VALID VL RESULTS"
                        subtitle={null}
                        data={formatNumber(hasCurrentVl)}
                    />
                </Col>
                <Col>
                    <DataCardCT
                        title="BOTH VIRAL LOAD TESTS ARE <50 COPIES /ML"
                        subtitle={null}
                        data={formatNumber(hasCurrentVl)}
                    />
                </Col>
            </Row>
			<ViralLoadPropotionU_U />
        </>
    );

}

export default ViralLoadU_U;