import React, { useEffect } from 'react';
import SectionHeader from '../../Shared/SectionHeader';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import SectionFooter from '../../Shared/SectionFooter';
import { useDispatch } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import AccuracyOverview from './AccuracyOverview';
import AccuracyByAgency from './AccuracyByAgency';
import ActiveAccuracyCategories from './ActiveAccuracyCategories';
import AccuracyByCounty from './AccuracyByCounty';
import AccuracyByPartner from './AccuracyByPartner';

const Accuracy = () => {
    const dispatch = useDispatch();

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());

        }
    };

    return (
        <>
            <SectionHeader
                title={'ACCURACY'}
                description={`YEAR ${moment().year()}`}
            />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <br/>
            <h5><strong>Accuracy:</strong> Measure whether the data elements conform to specified ranges of predefined
                values.</h5>
            <br/>
            <AccuracyOverview/>
            <Card>
                <CardHeader className="covid-definition-header">ELEMENTS CHECKED FOR ACCURACY</CardHeader>
                <CardBody>
                    <ul>
                        <li>
                            <strong>Date of Birth -> HIV Diagnosis Date -> Enrollment Date -> Start ART Date -> First VL
                                Date -> Last VL Date -> Last ART Date: </strong>The dates should be recorded in the
                            patient record in the above order. if either is misplaced(e.g. Diagnosis after Enrollment)
                            this is noted as an in accurate record.
                        </li>
                        <li>
                            <strong>Start & Last ART Regimen: </strong>Should be the standard ART Regimen without dosage
                            details e.g. TDF+3TC+EFV <strong>NOT</strong> TDF+3TC+EFV (300/300/600mg) or AF2A (TDF+3TC+NVP)If Client on
                            ART for more than 6 months and is missing VL Result and VL Date.
                        </li>
                        <li>
                            <strong>First & Last ART Regimen: </strong>Should not be Negative Values.
                        </li>
                        <li>
                            <strong>Next appointment date > last visit date</strong>
                        </li>
                    </ul>
                    <br />
                    <span>
                        <strong style={{ color: 'maroon' }}>
                            The DQA Line Lists in EMR can help identify individual records with inaccurate data elements.
                        </strong>
                    </span>
                </CardBody>
            </Card>
            <SectionFooter overview={'Accuracy'}/>
            <Row>
                <Col md="6">
                    <ActiveAccuracyCategories/>
                </Col>
                <Col md="6">
                    <AccuracyByAgency/>
                </Col>
            </Row>
            <SectionFooter overview={'Accuracy'}/>
            <AccuracyByCounty />
            <SectionFooter overview={'Accuracy'}/>
            <AccuracyByPartner />
            <SectionFooter overview={'Accuracy'}/>
            <SectionFooter overview={'Accuracy'}/>

        </>
    );
};


export default Accuracy;
