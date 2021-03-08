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
                                In computing the patients current on ART, those with a visit date but do not have a next appointment date have 30 days added to their visit date to impute the expected appointment date. This could affect the computed proportion on MMD.
                            </li>
                            <li>
                                Stable patients is based on documented stability status on the EMR
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default DSDIndicatorDefinition;
