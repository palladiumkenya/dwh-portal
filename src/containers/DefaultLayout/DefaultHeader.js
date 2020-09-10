import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
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
                    full={{ src: logo, width: "auto", height: 50, alt: 'DWH Logo' }}
                    minimized={{ src: sygnet, alt: 'DWH Logo' }}
                />
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink to="/" className="nav-link" >Home</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/reporting-rates" className="nav-link" >Reporting Rates</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>HTS</DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem><Link to="/hts/hts-overview" className="nav-link">HTS Uptake</Link></DropdownItem>
                            <DropdownItem><Link to="/hts/hts-linkage" className="nav-link">HTS Linkage</Link></DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    {/* <NavItem className="px-3">
                        <NavLink to="/hrh" className="nav-link">HRH</NavLink>
                    </NavItem> */}
                    <NavItem className="px-3">
                        <NavLink to="/hiv-treatment" className="nav-link">HIV Treatment</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                </Nav>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
