import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as artOptimizationOverviewSelectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';
import DataCard from '../../Shared/DataCard';

const AdultArtOptimizationOverview = () => {
    const adults = useSelector(artOptimizationOverviewSelectors.getAdults);
    const adultsOnFirstLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnFirstLine);
    const adultsOnFirstLinePercent = adults ? (adultsOnFirstLine/adults)*100 : 0;
    const adultsOnSecondLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnSecondLine);
    const adultsOnSecondLinePercent = adults ? (adultsOnSecondLine/adults)*100 : 0;
    const adultsOnThirdLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnThirdLine);
    const adultsOnThirdLinePercent = adults ? (adultsOnThirdLine/adults)*100 : 0;

    const adultsOnUndocumented = useSelector(artOptimizationOverviewSelectors.getAdultsOnUndocumentedLine);
    const adultsOnUndocumentedPercent = adults ? (adultsOnUndocumented/adults)*100 : 0;

    const adultsOnTld = useSelector(artOptimizationOverviewSelectors.getAdultsOnTld);
    const adultsOnTldPercent = adults ? (adultsOnTld/adults)*100 : 0;
    const adultsOnNvp = useSelector(artOptimizationOverviewSelectors.getAdultsOnNvp);
    const adultsOnNvpPercent = adults ? (adultsOnNvp/adults)*100 : 0;

    return (
        <>
            <Row>
                <Col>
                    <DataCard
                        title="ADULTS ON FIRST LINE"
                        subtitle={roundNumber(adultsOnFirstLinePercent) + "%"}
                        data={formatNumber(adultsOnFirstLine)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="ADULTS ON SECOND LINE"
                        subtitle={roundNumber(adultsOnSecondLinePercent) + "%"}
                        data={formatNumber(adultsOnSecondLine)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="ADULTS ON THIRD LINE"
                        subtitle={roundNumber(adultsOnThirdLinePercent) + "%"}
                        data={formatNumber(adultsOnThirdLine)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataCard
                        title={"ADULTS ON UNDOCUMENTED LINE"}
                        subtitle={roundNumber(adultsOnUndocumentedPercent) + "%"}
                        data={formatNumber(adultsOnUndocumented)}
                        />
                </Col>
                <Col>
                    <DataCard
                        title="ADULTS ON TLD"
                        subtitle={roundNumber(adultsOnTldPercent) + "%"}
                        data={formatNumber(adultsOnTld)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="ADULTS ON NVP-BASED REGIMEN"
                        subtitle={roundNumber(adultsOnNvpPercent) + "%"}
                        data={formatNumber(adultsOnNvp)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default AdultArtOptimizationOverview;
