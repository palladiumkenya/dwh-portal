import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/dwh2.png';
import sygnet from '../../assets/img/brand/ic_launcher.png';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    render() {
        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppNavbarBrand
                    full={{ src: logo,  width: "auto", height: 50,  alt: 'DWH Logo' }}
                    minimized={{ src: sygnet,  alt: 'DWH Logo' }}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg" />

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink to="/reporting-rates" className="nav-link" >Reporting Rates</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <Link to="/hts/hts-uptake" className="nav-link">HTS Uptake</Link>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/hts/hts-linkage" className="nav-link">HTS Uptake</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/hrh" className="nav-link">HRH</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    {/* <UncontrolledDropdown nav direction="down">
                        <DropdownToggle nav>
                            <img src={'../../assets/img/avatars/6.png'} className="img-avatar" alt="admin@kenyahmis.org" />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                            <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
                            <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                            <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                            <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                            <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
                            <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown> */}
                </Nav>
                {/* <AppAsideToggler className="d-md-down-none" />
                <AppAsideToggler className="d-lg-none" mobile /> */}
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
