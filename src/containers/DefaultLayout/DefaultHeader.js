import React from "react";
import { NavLink, Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/dwh2.png';
import sygnet from '../../assets/img/brand/ic_launcher.png';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

const DefaultHeader = () => {
    return (
        <>
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
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>Administration</DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem><Link to="/administration/organizations" className="nav-link">Organizations</Link></DropdownItem>
                        <DropdownItem> <a href="https://auth.kenyahmis.org/DwhIdentity/Users" className="nav-link">Users</a></DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
            <Nav className="ml-auto" navbar>
            </Nav>
        </>
    );
}

export default DefaultHeader;
