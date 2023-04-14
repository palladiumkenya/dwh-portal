import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import SectionHeader from '../../Shared/SectionHeader';
import moment from 'moment';
import SectionFooter from '../../Shared/SectionFooter';
import { Col, Row } from 'reactstrap';
import ActiveARTDataQualityCategories from './ActiveARTDataQualityCategories';
import InvalidDataCategories from './InvalidDataCategories';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import { useDispatch } from 'react-redux';

const MissedVL = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('overview');
    }, []);
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
                title={'OVERVIEW'}
                description={`YEAR ${moment().year()}`}
            />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter />
            </VisibilitySensor>
            <Card>
                <CardHeader className="covid-definition-header">
                    INVALID DATA QUATITY CATEGORIES
                </CardHeader>
                <CardBody>
                    <ul>
                        <li>
                            <strong>Accurate and Incomplete:</strong> Records
                            have data elements that are incomplete. The elements
                            that are complete satisfy the accuracy criteria.
                        </li>
                        <li>
                            <strong>Complete and Inaccurate:</strong> Records
                            have data elements that are complete. These complete
                            data elements however don t satisfy the accuracy
                            criteria.
                        </li>
                        <li>
                            <strong>Incomplete and Inaccurate:</strong> Records
                            have data elements that are incomplete. The complete
                            data values don t satisfy the accuracy criteria.
                        </li>
                    </ul>
                    The Categorization of a record is based on completeness AND
                    accuracy of the data elements <br />
                    <strong>
                        Overall DQA Score = Valid Records / Active ART*100
                    </strong>
                    <br />
                    <ul>
                        <li>
                            <strong>Valid Records:</strong> These records have
                            complete data elements and these complete elements
                            meet the accuracy criteria.
                        </li>
                        <li>
                            <strong>Invalid Records:</strong> These records don
                            t satisfy completeness and or accuracy in some data
                            elements.
                        </li>
                    </ul>
                    <br />
                    <span>
                        <strong style={{ color: 'maroon' }}>
                            To view the completeness and Accuracy by Data
                            Elements; Facility; County and Sub-County; Please
                            Navigate to the respective dashboards using the tabs
                            above
                        </strong>
                    </span>
                </CardBody>
            </Card>
            <SectionFooter />
            <Row>
                <Col
                    className={
                        'col-lg-6  col-xl-6 col-12 col-md-12 col-sm-12 col-xs-12'
                    }
                >
                    <ActiveARTDataQualityCategories />
                </Col>
                <Col
                    className={
                        'col-lg-6 col-xl-6 col-12 col-md-12 col-sm-12 col-xs-12'
                    }
                >
                    <InvalidDataCategories />
                </Col>
            </Row>
            <SectionFooter />
        </>
    );
};

export default MissedVL;
