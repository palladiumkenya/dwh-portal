import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import * as adverseEventsByAgeSexSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsByAgeSex';
import * as adverseEventsClientsByAgeSexSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsClientsByAgeSex';
import { formatNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import DataCardCT from '../../Shared/DataCardCT';

const AdverseEventsOverviewChildren = () => {
    const currentOnArtChildren = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtChildren);
    const adverseEventsChildren = useSelector(adverseEventsByAgeSexSelectors.getAdverseEventsChildren);
    const adverseEventsClientsChildren = useSelector(adverseEventsClientsByAgeSexSelectors.getAdverseEventsClientsChildren);

    return (
        <Row>
            <Col>
                <DataCardCT
                    title="CHILDREN CURRENTLY ON ART"
                    subtitle={null}
                    data={formatNumber(currentOnArtChildren.currentOnArt)}
                />
            </Col>
            <Col>
                <DataCardCT
                    title="CHILDREN ON ART AND DEVELOPED AEs"
                    subtitle={null}
                    data={formatNumber(adverseEventsClientsChildren.adverseEvents)}
                />
            </Col>
            <Col>
                <DataCardCT
                    title="NUMBER OF AEs REPORTED CASES IN CHILDREN"
                    subtitle={null}
                    data={formatNumber(adverseEventsChildren.adverseEvents)}
                />
            </Col>
        </Row>
    );
};

export default AdverseEventsOverviewChildren;
