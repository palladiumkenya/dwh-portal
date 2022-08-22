import React, {  } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const OVCIndicatorDefinition = () => {
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
                                CALHIV => Children and adolescents aged 0-17 years who are current on ART by the end of the previous month.
                            </li>
                            <li>
                                OVC => Semi-annual number of beneficiaries served by OVC programs for children and families affected by HIV.
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCIndicatorDefinition;
