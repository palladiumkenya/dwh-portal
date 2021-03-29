import React, {  } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const HtsUptakeIndicatorDefinition = () => {
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
                                HIV testing services (HTS) uptake (HIV Testing) = Number of unique individuals who are tested for HIV within a reporting period. This is based on the documented final result in eHTS.
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default HtsUptakeIndicatorDefinition;
