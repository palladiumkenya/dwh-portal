import React from "react";
import { NavLink, Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/dwh2.png';
import sygnet from '../../assets/img/brand/ic_launcher.png';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import avatar from '../../assets/img/avatars/avatar.png';
import { useSelector } from 'react-redux';
import { signinRedirect, signoutRedirect } from '../../services/UserService';

const DefaultHeader = () => {
    const user = useSelector(state => state.auth.user)
    const loginAction = user ? "Logout" : "Login";

    const login = async () => {
        if (user) {
            await signoutRedirect();
        } else {
            await signinRedirect();
        }
    };

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
                    <a href="https://kenyahmis.org/resources/" className="nav-link">Resources</a>
                </NavItem>

                {
                    user ? <Adhoc /> : null
                }

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>Administration</DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem><Link to="/administration/organizations" className="nav-link">Organizations</Link></DropdownItem>
                        <DropdownItem> <a href="https://auth.kenyahmis.org/nascop/Users" className="nav-link">Users</a></DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
            <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav direction="down">
                    <DropdownToggle nav>
                        { user ? user.profile.FullName : '' }
                        <img src={avatar} className="img-avatar" alt={ user ? user.profile.email : '' } />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                        {
                            user ? <DropdownItem tag={Link} to={"/users/profile"}> <i className="fa fa-user"/> Profile </DropdownItem> : ''
                        }
                        <DropdownItem divider />
                        <DropdownItem onClick={() => login()}><i className="fa fa-lock"></i> {loginAction}</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </>
    );
}

const Adhoc = () => {
    return (
        <NavItem className="px-3">
            <a href="https://dwh.nascop.org:7010/" className="nav-link">Adhoc</a>
        </NavItem>
    );
};

export default DefaultHeader;
