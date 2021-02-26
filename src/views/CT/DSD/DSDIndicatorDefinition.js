import React, {  } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const DSDIndicatorDefinition = () => {
    return (
        <div className={"row"}>
            <div className="col-12">
                <Card>
                    <CardHeader className={"indicator_definition_header"}>
                        Indicator Definitions
                    </CardHeader>
                    <CardBody className={"indicator_definition_body"}>
                        <ul>
                            <li>
                                MMD => Duration between clinic visit date and the next appointment of 90 or more days
                            </li>
                            <li>
                                STABLE => Patients on ART for &#8805;12 months, no active OIs, good adherence, undetectable VL, non-pregnant/not breastfeeding, MBI &#8805;18.5, age &#8805;20 years and no HCW concerns.
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default DSDIndicatorDefinition;
