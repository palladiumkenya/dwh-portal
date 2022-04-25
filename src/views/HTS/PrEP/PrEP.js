import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import {
    enableStickyFilter,
    disableStickyFilter,
} from '../../../actions/Shared/uiActions';
import { useHistory, useParams } from 'react-router-dom';

const PrEP = () => {
    const dispatch = useDispatch();
    const htsTab = useSelector((state) => state.ui.htsTab);
    const [activeTab, setActiveTab] = useState('contacts');
    const branding = {
        title: 'PrEP',
        description: 'OVERVIEW',
        overview: 'PrEP',
    };
    const onVisibilityChange = (isVisible) => {
        if (htsTab === 'prep') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    // const { mini_tab } = useParams();
    // const history = useHistory();

    // useEffect(() => {
    //     if (!mini_tab) {
    //         history.push(`/hiv-testing/pns/${activeTab}`);
    //     }
    // }, [activeTab, history, mini_tab]);

    // if (!mini_tab) {
    //     history.push(`/hiv-testing/pns/${activeTab}`);
    // }

    // const toggle = (tab) => {
    //     if (mini_tab !== tab) {
    //         history.push(`/hiv-testing/pns/${tab}`);
    //     }
    // };

    return (
        <div className="animated fadeIn">
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter />
            </VisibilitySensor>

            <SectionHeader
                title={branding.title}
                description=""
            />
            
            <Row>
                <Col>
                    
                </Col>
                <Col>
                    
                </Col>
            </Row>
            <Row>
                <Col>
                    
                </Col>
                <Col>
                    
                </Col>
            </Row>
            
        </div>
    );
};

export default PrEP;
