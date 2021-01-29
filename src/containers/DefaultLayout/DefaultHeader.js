import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/dwh2.png';
import sygnet from '../../assets/img/brand/ic_launcher.png';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import avatar from '../../assets/img/avatars/avatar.png';
import { useSelector } from 'react-redux';
import { signinRedirect, signoutRedirect } from '../../services/UserService';
import { getAll, getUserById } from '../../views/Shared/Api';

const DefaultHeader = () => {
    const user = useSelector(state => state.auth.user)
    const loginAction = user ? "Logout" : "Login";
    const [userType, setUserType] = useState({

    });

    const loadUserType = useCallback(async () => {
        const userType = await getUserType();
        setUserType({
            userType: userType
        });
    }, []);

    const login = async () => {
        const res = await getUserType();
        console.log(res);
        if (user && !user.expired) {
            await signoutRedirect();
        } else {
            await signinRedirect();
        }
    };

    const getUserType = async () => {
        let userType = 0;
        if (user) {
            const result = await getUserById('User/' + user.profile.sub, user.access_token);
            return result.userType;
        }
        return userType;
    }

    const getAdministrationTab = async () => {
        return <Administration />
        const res = await getUserType();
        return  res === 1 ? <Administration /> : null;
    }

    useEffect(() => {
        loadUserType()
    }, [loadUserType]);

    return (
        <>
            <AppSidebarToggler className="d-lg-none" display="md" mobile />
            <AppNavbarBrand
                full={{ src: logo, width: "auto", height: 50, alt: 'DWH Logo' }}
                minimized={{ src: sygnet, alt: 'DWH Logo' }}
            />
            <Nav className="d-md-down-none navbar">
                <NavItem className="px-3">
                    <NavLink to="/" className="nav-link active">
                        <strong>Home</strong>
                    </NavLink>
                </NavItem>
                <NavItem className="px-3">
                    <NavLink to="/reporting-rates" className="nav-link active">
                        <strong>Reporting Rates</strong>
                    </NavLink>
                </NavItem>
                {/* <NavItem className="px-3">
                    <NavLink to="/hrh" className="nav-link">HRH</NavLink>
                </NavItem> */}
                <NavItem className="px-3">
                    <NavLink to="/hiv-testing" className="nav-link active">
                        <strong>HIV Testing & Prevention</strong>
                    </NavLink>
                </NavItem>
                <NavItem className="px-3">
                    <NavLink to="/hiv-treatment" className="nav-link active">
                        <strong>HIV Treatment</strong>
                    </NavLink>
                </NavItem>

                <NavItem className="px-3">
                    <a href="https://kenyahmis.org/documentation/data-dictionaries/" className="nav-link active" target="_blank" rel="noopener noreferrer">
                        <strong>Resources</strong>
                    </a>
                </NavItem>

                {
                    user ? <Adhoc /> : null
                }

                {
                    userType.userType === 1 ? <Administration /> : null
                }

            </Nav>
            <Nav className="ml-auto">
                <UncontrolledDropdown nav direction="down">
                    <DropdownToggle nav>
                        <strong>{ user ? user.profile.FullName : '' }</strong>
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
            <a href="https://data.kenyahmis.org:9090/" className="nav-link active"><strong>Adhoc</strong></a>
        </NavItem>
    );
};

const Administration = () => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret><strong>Administration</strong></DropdownToggle>
            <DropdownMenu right>
                <DropdownItem><Link to="/administration/organizations" className="nav-link">Organizations</Link></DropdownItem>
                <DropdownItem><a href="https://auth.kenyahmis.org/DwhIdentity/Users" className="nav-link">Users</a></DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

export default DefaultHeader;
