import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const CurrentOnArtOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const currentOnArtMale = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtBySex).currentOnArtMale;
    const currentOnArtMalePercent = currentOnArt ? ((currentOnArtMale/currentOnArt)*100) : 0;
    const currentOnArtFemale = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtBySex).currentOnArtFemale;
    const currentOnArtFemalePercent = currentOnArt ? ((currentOnArtFemale/currentOnArt)*100) : 0;
    const currentOnArtAdults = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtAdults).currentOnArt;
    const currentOnArtAdultsPercent = currentOnArt ? ((currentOnArtAdults/currentOnArt)*100) : 0;
    const currentOnArtAdolescents = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtAdolescents).currentOnArt;
    const currentOnArtAdolescentsPercent = currentOnArt ? ((currentOnArtAdolescents/currentOnArt)*100) : 0;
    const currentOnArtChildren = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtChildren).currentOnArt;
    const currentOnArtChildrenPercent = currentOnArt ? ((currentOnArtChildren/currentOnArt)*100) : 0;

    return (
        <>
            <Row>
                <Col>
                    <DataCard
                        title="CURRENTLY ON ART"
                        subtitle={null}
                        data={formatNumber(currentOnArt)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="MALES CURRENT ON ART"
                        subtitle={roundNumber(currentOnArtMalePercent) + "%"}
                        data={formatNumber(currentOnArtMale)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="FEMALES CURRENT ON ART"
                        subtitle={roundNumber(currentOnArtFemalePercent) + "%"}
                        data={formatNumber(currentOnArtFemale)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataCard
                        title="ADULTS CURRENT ON ART(15+ YRS)"
                        subtitle={roundNumber(currentOnArtAdultsPercent) + "%"}
                        data={formatNumber(currentOnArtAdults)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="CHILDREN CURRENT ON ART(<15 YRS)"
                        subtitle={roundNumber(currentOnArtChildrenPercent) + "%"}
                        data={formatNumber(currentOnArtChildren)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="ADOLESCENTS CURRENT ON ART(10 - 19 YRS)"
                        subtitle={roundNumber(currentOnArtAdolescentsPercent) + "%"}
                        data={formatNumber(currentOnArtAdolescents)}
                    />
                </Col>
            </Row>
        </>
    );
}

export default CurrentOnArtOverview;
