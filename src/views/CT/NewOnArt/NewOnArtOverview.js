import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as newOnArtOverviewSelectors from '../../../selectors/CT/NewOnArt/newOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const NewOnArtOverview = () => {
    const newOnArt = useSelector(newOnArtOverviewSelectors.getNewOnArt);
    const newOnArtMale = useSelector(newOnArtOverviewSelectors.getNewOnArtMale);
    const newOnArtMalePercent = newOnArt ? ((newOnArtMale/newOnArt)*100) : 0;
    const newOnArtFemale = useSelector(newOnArtOverviewSelectors.getNewOnArtFemale);
    const newOnArtFemalePercent = newOnArt ? ((newOnArtFemale/newOnArt)*100) : 0;
    const newOnArtAdults = useSelector(newOnArtOverviewSelectors.getNewOnArtAdults);
    const newOnArtAdultsPercent = newOnArt ? ((newOnArtAdults/newOnArt)*100) : 0;
    const newOnArtAdolescents = useSelector(newOnArtOverviewSelectors.getNewOnArtAdolescents);
    const newOnArtAdolescentsPercent = newOnArt ? ((newOnArtAdolescents/newOnArt)*100) : 0;
    const newOnArtChildren = useSelector(newOnArtOverviewSelectors.getNewOnArtChildren);
    const newOnArtChildrenPercent = newOnArt ? ((newOnArtChildren/newOnArt)*100) : 0;

    return (
        <>
            <Row>
                <Col>
                    <DataCard
                        title="NEWLY STARTED ON ART"
                        subtitle={null}
                        data={formatNumber(newOnArt)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="MALES STARTED ON ART"
                        subtitle={roundNumber(newOnArtMalePercent) + "%"}
                        data={formatNumber(newOnArtMale)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="FEMALES STARTED ON ART"
                        subtitle={roundNumber(newOnArtFemalePercent) + "%"}
                        data={formatNumber(newOnArtFemale)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataCard
                        title="ADULTS STARTED ON ART(15+ YRS)"
                        subtitle={roundNumber(newOnArtAdultsPercent) + "%"}
                        data={formatNumber(newOnArtAdults)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="CHILDREN STARTED ON ART(&lt;14 YRS)"
                        subtitle={roundNumber(newOnArtChildrenPercent) + "%"}
                        data={formatNumber(newOnArtChildren)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="ADOLESCENTS STARTED ON ART(10 - 19 YRS)"
                        subtitle={roundNumber(newOnArtAdolescentsPercent) + "%"}
                        data={formatNumber(newOnArtAdolescents)}
                    />
                </Col>
            </Row>
        </>
    );
}

export default NewOnArtOverview;
