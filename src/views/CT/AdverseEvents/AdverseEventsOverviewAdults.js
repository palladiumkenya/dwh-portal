import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import * as adverseEventsByAgeSexSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsByAgeSex';
import * as adverseEventsClientsByAgeSexSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsClientsByAgeSex';
import { formatNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const AdverseEventsOverviewAdults = () => {
    const currentOnArtAdults = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtAdults);
    const adverseEventsAdults = useSelector(adverseEventsByAgeSexSelectors.getAdverseEventsAdults);
    const adverseEventsClientsAdults = useSelector(adverseEventsClientsByAgeSexSelectors.getAdverseEventsClientsAdults);

    return (
        <Row>
            <Col>
                <DataCard
                    title="ADULTS 15+ CURRENTLY ON ART"
                    subtitle={null}
                    data={formatNumber(currentOnArtAdults.currentOnArt)}
                />
            </Col>
            <Col>
                <DataCard
                    title="ADULTS 15+ ON ART AND DEVELOPED AEs"
                    subtitle={null}
                    data={formatNumber(adverseEventsClientsAdults.adverseEvents)}
                />
            </Col>
            <Col>
                <DataCard
                    title="NUMBER OF AEs REPORTED CASES IN ADULTS 15+"
                    subtitle={null}
                    data={formatNumber(adverseEventsAdults.adverseEvents)}
                />
            </Col>
        </Row>
    );
};

export default AdverseEventsOverviewAdults;
