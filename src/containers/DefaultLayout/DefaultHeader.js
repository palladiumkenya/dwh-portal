import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
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
                    {/* <NavItem className="px-3">
                        <NavLink to="/hrh" className="nav-link">HRH</NavLink>
                    </NavItem> */}
                    <NavItem className="px-3">
                        <NavLink to="/hiv-testing" className="nav-link">HIV Testing & Prevention</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/hiv-treatment" className="nav-link">HIV Treatment</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/resources" className="nav-link">Resources</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <a href="https://data.kenyahmis.org:9090/" className="nav-link">Adhoc</a>
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
