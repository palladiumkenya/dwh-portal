import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';
import moment from "moment";
import * as newOnPrepSelector from '../../../selectors/HTS/Prep/newOnPrepSelector';
import * as ctPrepSelector from '../../../selectors/HTS/Prep/ctPrepSelector';

const PrEPOverview = () => {
    let newOnPrep =  useSelector(newOnPrepSelector.getNewOnPrepTotal);
    let prepDisc = useSelector(newOnPrepSelector.getPrEPDiscontinuation);
    let prepCT = useSelector(ctPrepSelector.getCTPrepTotal);

    return (
        <Row>
            {/* <Col>
                <Card
                    className="card-uploads-consistency-rates"
                    style={{ borderRadius: 10, overflow: 'hidden' }}
                >
                    <CardHeader className="expected-uploads-header">
                        <strong>CURRENT ON PrEP</strong>
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{
                            textAlign: 'center',
                            backgroundColor: '#F6F6F6',
                            height: '100px',
                        }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text">
                                {' '}
                                {pnsChildrenCascade.tested
                                    ? pnsChildrenCascade.tested.toLocaleString(
                                          'en'
                                      )
                                    : '0'}{' '}
                            </span>
                            <sup className="overall-rates-sup">
                                {pnsChildrenCascade.elicited > 0
                                    ? (
                                          (pnsChildrenCascade.tested /
                                              pnsChildrenCascade.elicited) *
                                          100
                                      )
                                          .toFixed(0)
                                          .toLocaleString('en')
                                    : 0}
                                <span className="overall-rates-sup-perc">
                                    {' '}
                                    %
                                </span>
                            </sup>
                        </div>
                    </CardBody>
                </Card>
            </Col> */}
            <Col>
                <Card
                    className="card-uploads-consistency-rates"
                    style={{ borderRadius: 10, overflow: 'hidden' }}
                >
                    <CardHeader className="expected-uploads-header">
                        <strong>CONTINUING ON PrEP</strong>
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{
                            textAlign: 'center',
                            backgroundColor: '#F6F6F6',
                            height: '100px',
                        }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text">
                                {Number(prepCT).toLocaleString('en')}
                            </span>
                        </div>
                        <span className=""></span>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card
                    className="card-uploads-consistency-rates"
                    style={{ borderRadius: 10, overflow: 'hidden' }}
                >
                    <CardHeader className="expected-uploads-header">
                        <strong>NEW ON PrEP</strong>
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{
                            textAlign: 'center',
                            backgroundColor: '#F6F6F6',
                            height: '100px',
                        }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text">
                                {newOnPrep
                                    ? Number(newOnPrep).toLocaleString('en')
                                    : ''}
                            </span>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card
                    className="card-uploads-consistency-rates"
                    style={{ borderRadius: 10, overflow: 'hidden' }}
                >
                    <CardHeader className="expected-uploads-header">
                        <strong>PrEP DISCONTINUATION</strong>
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{
                            textAlign: 'center',
                            backgroundColor: '#F6F6F6',
                            height: '100px',
                        }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text">
                                {' '}
                                {prepDisc
                                    ? prepDisc.toLocaleString('en')
                                    : '0'}{' '}
                            </span>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default PrEPOverview;
