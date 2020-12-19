import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { useSelector } from 'react-redux';
import { getIdentityAll } from '../Shared/Api';

const Profile = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [userOrganization, setUserOrganization] = useState([]);

    const user = useSelector(state => state.auth.user)

    const getUser = async () => {
        const response = await getIdentityAll('User/' + user.profile.sub);
        setUserDetails(response);
        if (response) {
            const userOrganizationResponse = await getIdentityAll('Organizations/' + response.organizationId);
            setUserOrganization(userOrganizationResponse);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const Titles = {
        0: 'Mr',
        1: 'Mrs',
        2: 'Ms',
        3: 'Dr',
        4: 'Prof',
        5: 'Eng'
    }

    return (
        <div className={"row"}>
            <div className={"col-8"}>
                <Card className="card-flat">
                    <CardHeader className={"card-header"}>
                        <div className={"card-title"} style={{ background: "transparent" }}>
                            About - {Titles[userDetails.title]} { user.profile.FullName }
                        </div>
                    </CardHeader>
                    <CardBody className="trends-body">
                        <table className={"table table-borderless table-striped"}>
                            <tbody>
                            <tr>
                                <td>UserName/Email:</td>
                                <td>{user.profile.email}</td>
                            </tr>
                            <tr>
                                <td>Organization: </td>
                                <td>{userOrganization.name}</td>
                            </tr>
                            <tr>
                                <td>PhoneNumber: </td>
                                <td>{userDetails.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>Designation: </td>
                                <td>{userDetails.designation}</td>
                            </tr>
                            <tr>
                                <td>Reason for Accessing: </td>
                                <td>{userDetails.reasonForAccessing}</td>
                            </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
export default Profile;
