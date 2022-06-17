import { useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { Row, Col } from 'reactstrap'
import moment from 'moment';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from './../../Shared/SectionHeader';

const Copmleteness = () => {
    useEffect(() => {
        console.log('completeness');
    }, []);

    return (
        <>
            <SectionHeader
                title={'COMPLETENESS'}
                description={`YEAR ${moment().year()}`}
            />
            <span>
                <strong>Completeness:</strong> Measures the existence of values
                in data elements in the active on ART client record set.
            </span>
            <Card>
                <CardHeader className="covid-definition-header">
                    ELEMENTS CHECKED FOR COMPLETENESS
                </CardHeader>
                <CardBody>
                    <ul>
                        <li>
                            <strong>Missing HIV Diagnosis Date:</strong> Record
                            is missing HIV Diagnosis date.
                        </li>
                        <li>
                            <strong>Missing Start ART Date and Regimen:</strong>{' '}
                            Record is missing Start ART Date but has a Start
                            Regimen or vice versa OR Record has last ART date
                            but no Start ART Date.
                        </li>
                        <li>
                            <strong>Missing Last ART Date and Regimen:</strong>{' '}
                            Record is missing Last ART Date but has a Last
                            Regimen or vice versa OR Record has lasr ART date
                            but no Last ART Date.
                        </li>
                        <li>
                            <strong>Missing First VL Date and Result:</strong>{' '}
                            If Client on ART for more than 6 months and is
                            missing VL Result and VL Date.
                        </li>
                    </ul>

                    <span>
                        <strong style={{ color: 'maroon' }}>
                            The DQA Line Lists in EMR can help identify
                            individual records with missing data elements
                        </strong>
                    </span>
                </CardBody>
            </Card>
            <SectionFooter  />

            {/* <Row>
                <Col md={4}>
                    <Row style={{ align: 'center', textAlign: 'center' }}>
                        <Col>
                            <div
                                onClick={() => alert('Clicked')}
                                style={{ cursor: 'pointer' }}
                            >
                                <Icon name="male" size="big" color="blue" />
                                <br />
                                <span>Male</span>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ cursor: 'pointer' }}>
                                <Icon name="female" size="big" color="pink" />
                                <br />
                                <span>Female</span>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ cursor: 'pointer' }}>
                                <Icon name="male" size="big" color="red" />
                                <Icon name="female" size="big" color="red" />
                                <br />
                                <span>Adults</span>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ cursor: 'pointer' }}>
                                <Icon name="child" size="big" color="red" />
                                <br />
                                <span>Adolecents</span>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ cursor: 'pointer' }}>
                                <Icon name="male" size="small" color="red" />
                                <br />
                                <span>Children</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row> */}
            {/* {'completeness'} */}
        </>
    );
}


export default Copmleteness;
