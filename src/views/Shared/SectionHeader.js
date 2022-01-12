import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { PAGES } from "../../constants";
import { enableCache, disableCache } from '../../actions/Shared/filterActions';

const SectionHeader = ({ title, description}) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.ui.currentPage);
    const ctTab = useSelector(state => state.ui.ctTab);
    return (
        <>
            <br></br>
            <div className="strip"></div>
            <Card className="pageHeading_reporting">
                <CardBody>
                    <Row>
                        <Col sm={10}>
                            <Row>
                                <Col xl={3} lg={3} md={4} sm={6} xs={12}>
                                    <div className="reporting-rates-card-title" style={{textTransform: 'none'}}>
                                        {title}
                                    </div>
                                </Col>
                                <Col xl={1} lg={1} md={1} sm={1} className="d-none d-sm-block">
                                    <div className="reporting-rates-card-separator"></div>
                                </Col>
                                <Col xl={8} lg={8} md={7} sm={5} className="d-none d-sm-block">
                                    <div className="reporting-rates-card-overview">
                                        {description}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={2}>
                            {
                                (currentPage === PAGES.ct && ctTab === 'txOpt') ?
                                <div className="reporting-rates-card-year" style={{marginTop: '-0.2em'}}>
                                    <i className="bordered trash icon inverted black" onClick={() => {
                                        dispatch(disableCache());
                                        setTimeout(
                                            function() {
                                                dispatch(enableCache());
                                            }, 5000 // 5 secs
                                        );
                                    }}></i>
                                </div> :
                                null
                            }
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};

export default SectionHeader;
