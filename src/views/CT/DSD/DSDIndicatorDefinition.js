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
                                MMD = Multi Month Dispensing. The duration between clinic visit date and next clinic appointment of 84 or more days
                            </li>
                            <li>
                                In computing the patients current on ART, those with a visit date but do not have a next appointment date have 30 days added to their visit date to impute the expected appointment date. This could affect the computed proportion on MMD
                            </li>
                            <li>
                                Stable patients is based on documented stability status on the EMR
                            </li>
                            <li>
                                ** In this Dashboard the Number of Stable Patients excludes 0-19Yrs
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default DSDIndicatorDefinition;
