import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
import { useHistory, useParams } from 'react-router-dom';
import DataQualityAssessmentPrEP from './DataQualityAssessmentPrEP';
import DataQualityAssessmentHTS from './DataQualityAssessmentHTS';
import DataQualityAssessmentPMTCT from './DataQualityAssessmentPMTCT';
import DataQualityAssessmentVMMC from './DataQualityAssessmentVMMC';
import DataQualityAssessmentNutrition from './DataQualityAssessmentNutrition';

const DataQualityAssessmentCT = Loadable({ loader: () => import('./DataQualityAssessmentCT'), loading: Loading, delay: LOADING_DELAY });


const DataQualityAssessmentTabs = () => {
    const [activeTab, setActiveTab] = useState('care-and-treatment');

    const { mini_tab } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!mini_tab) {
            history.push(`/operational-and-his/dataQualityAssessment/${activeTab}`);
        }
    }, [mini_tab, history, activeTab]);

    if (!mini_tab) {
        history.push(`/operational-and-his/dataQualityAssessment/${activeTab}`);
    }

    const toggle = tab => {
        if (mini_tab !== tab) {
            history.push(`/operational-and-his/dataQualityAssessment/${tab}`);
        }
    };
    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'care-and-treatment' })} onClick={() => {
                        setActiveTab('care-and-treatment');
                        toggle('care-and-treatment');
                    }}>CARE AND TREATMENT</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'hts' })} onClick={() => {
                        setActiveTab('hts');
                        toggle('hts');
                    }}>HTS</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'pmtct' })} onClick={() => {
                        setActiveTab('pmtct');
                        toggle('pmtct');
                    }}>PMTCT</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'vmmc' })} onClick={() => {
                        setActiveTab('vmmc');
                        toggle('vmmc');
                    }}>VMMC</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'nutrition' })} onClick={() => {
                        setActiveTab('nutrition');
                        toggle('nutrition');
                    }}>NUTRITION</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'prep' })} onClick={() => {
                        setActiveTab('prep');
                        toggle('prep');
                    }}>PrEP</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={mini_tab}>
                <TabPane tabId="care-and-treatment">
                    <DataQualityAssessmentCT />
                </TabPane>

                <TabPane tabId="hts">
                    <DataQualityAssessmentHTS />

                </TabPane>

                <TabPane tabId="pmtct">
                    <DataQualityAssessmentPMTCT />

                </TabPane>

                <TabPane tabId="vmmc">
                    <DataQualityAssessmentVMMC />

                </TabPane>

                <TabPane tabId="nutrition">
                    <DataQualityAssessmentNutrition />

                </TabPane>

                <TabPane tabId="prep">
                    <DataQualityAssessmentPrEP />

                </TabPane>
            </TabContent>
        </div>
    );
};

export default DataQualityAssessmentTabs;
