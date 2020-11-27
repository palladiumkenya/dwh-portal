import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/dwh2.png';
import sygnet from '../../assets/img/brand/ic_launcher.png';
import avatar from '../../assets/img/avatars/avatar.png';
import { useSelector } from 'react-redux';
import { signoutRedirect } from '../../services/UserService';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

function DefaultHeader() {
    const user = useSelector(state => state.auth.user);

    function signOut() {
        signoutRedirect();
    }

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
                    <DropdownToggle nav caret>HIV Testing & Prevention</DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem><Link to="/hts/hts-uptake" className="nav-link">HTS Uptake</Link></DropdownItem>
                        <DropdownItem><Link to="/hts/hts-linkage" className="nav-link">HTS Linkage</Link></DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem className="px-3">
                    <NavLink to="/hiv-treatment" className="nav-link">HIV Treatment</NavLink>
                </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav direction="down">
                    <DropdownToggle nav>
                        <img src={avatar} className="img-avatar" alt={user.profile.given_name} />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                        <DropdownItem onClick={() => signOut() }><i className="fa fa-lock"></i> Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </React.Fragment>
    );
}

/*class DefaultHeader extends Component {
    render() {
        return (

        );
    }
}*/

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
