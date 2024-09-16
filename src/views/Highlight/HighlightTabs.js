import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import React, { useState } from 'react';
import Loadable from 'react-loadable';
import Loading from '../Shared/Loading';
import { LOADING_DELAY } from '../../constants';
const HighlightInternal = Loadable({ loader: () => import('./HighlightInternal'), loading: Loading, delay: LOADING_DELAY });
const HighlightCOP = Loadable({ loader: () => import('./HighlightCOP'), loading: Loading, delay: LOADING_DELAY });


const HighlightTabs = () => {

    const [activeTab, setActiveTab] = useState('cop');

    return(
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === 'cop',
                        })}
                        onClick={() => {
                            setActiveTab('cop');
                        }}
                    >
                        COMMUNITY DASHBOARDS
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === 'metabase',
                        })}
                        onClick={() => {
                            setActiveTab('metabase');
                        }}
                    >
                        KENYAHMIS DASHBOARDS
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="cop">
                    <HighlightCOP />
                </TabPane>
                <TabPane tabId="metabase">
                    <HighlightInternal />
                </TabPane>
            </TabContent>
        </>
    )
}


export default HighlightTabs
