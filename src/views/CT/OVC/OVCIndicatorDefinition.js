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
                                OVC_SERV => Semi-annual number of beneficiaries served by OVC programs for children and families affected by HIV.
                            </li>
                            <li>
                                OVC Comprehensive => OVC beneficiaries enrolled in any OVC comprehensive program. Includes Active and Graduated beneficiaries. Includes children and caregivers.
                            </li>
                            <li>
                                DREAMS beneficiaries => Female OVC beneficiaries aged 10-17-years who are active in DREAMS and receiving approved OVC services.
                            </li>
                            <li>
                                OVC Preventive => OVC beneficiaries aged 9-14-years receiving one of the approved primary prevention of sexual violence and HIV curricula.
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCIndicatorDefinition;
