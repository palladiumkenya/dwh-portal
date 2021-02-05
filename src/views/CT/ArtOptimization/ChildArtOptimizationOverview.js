import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as artOptimizationOverviewSelectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';
import DataCard from '../../Shared/DataCard';

const ChildArtOptimizationOverview = () => {
    const children = useSelector(artOptimizationOverviewSelectors.getChildren);
    const childrenOnFirstLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnFirstLine);
    const childrenOnFirstLinePercent = children ? (childrenOnFirstLine/children)*100 : 0;
    const childrenOnSecondLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnSecondLine);
    const childrenOnSecondLinePercent = children ? (childrenOnSecondLine/children)*100 : 0;
    const childrenOnThirdLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnThirdLine);
    const childrenOnThirdLinePercent = children ? (childrenOnThirdLine/children)*100 : 0;

    return (
        <Row>
            <Col>
                <DataCard
                    title="CALHIV ON FIRST LINE"
                    subtitle={roundNumber(childrenOnFirstLinePercent) + "%"}
                    data={formatNumber(childrenOnFirstLine)}
                />
            </Col>
            <Col>
                <DataCard
                    title="CALHIV ON SECOND LINE"
                    subtitle={roundNumber(childrenOnSecondLinePercent) + "%"}
                    data={formatNumber(childrenOnSecondLine)}
                />
            </Col>
            <Col>
                <DataCard
                    title="CALHIV ON THIRD LINE"
                    subtitle={roundNumber(childrenOnThirdLinePercent) + "%"}
                    data={formatNumber(childrenOnThirdLine)}
                />
            </Col>
        </Row>
    );
};

export default ChildArtOptimizationOverview;
