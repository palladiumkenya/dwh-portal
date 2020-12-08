import React, { useEffect, useState } from 'react';
import { Button, Icon, Label, Table, Modal, Form, Input } from 'semantic-ui-react';
import { createUpdateOrganizations, deleteOrganizations, getIdentityAll } from '../../Shared/Api';

const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [deletedId, setDeletedId] = useState(false);

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [editedId, setEditedId] = useState(false);

    useEffect(() => {
        getOrganizations();
    }, []);

    const getOrganizations = async () => {
        const response = await getIdentityAll('Organizations');
        setOrganizations(response);
    }

    const renderTableData = () => {
        return organizations && organizations.map(({ id, name, code }) => {
            return (
                <Table.Row key={id}>
                    <Table.Cell>
                        <Label></Label>
                    </Table.Cell>
                    <Table.Cell>{code}</Table.Cell>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>
                        <Button size='small' color='green' onClick={ e => onOrganizationEdit(id, name, code) }><Icon name='edit' />Edit</Button>
                    </Table.Cell>
                    <Table.Cell>
                        <Button size='small' color='red' onClick={ e => onOrganizationDelete(id) }><Icon name='delete' />Delete</Button>
                    </Table.Cell>
                </Table.Row>
            );
        })
    }

    const handleSubmit = async (e) =>  {
        if (!name || !code)
            return ;

        const id = editedId ? editedId : '00000000-0000-0000-0000-000000000000';
        const response = await createUpdateOrganizations('Organizations', id, name, code);
        setOpen(false);
        window.location.reload();
    }

    const handleDelete = async () => {
        await deleteOrganizations('Organizations', deletedId);
        window.location.reload();
    }

    const onOrganizationEdit = async (id, name, code) => {
        setEditedId(id);
        setName(name);
        setCode(code);
        setOpen(true);
    }

    const onOrganizationDelete = async (id) => {
        setDeletedId(id);
        setDeleteOpen(true);
    }

    return (
        <React.Fragment>
            <h1>Organizations</h1>
            <Table compact celled definition selectable sortable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Code</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    { renderTableData() }
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={() => setOpen(true)}
                            >
                                <Icon name='user' /> Add Organization
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>


            <Modal
                onClose={() => setOpen(false)}
                open={open}
                size="tiny">
                <Modal.Header>Organization</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field required>
                            <label>Code</label>
                            <Input placeholder='Code' id='Code' name='Code' value={code} onChange={ e => setCode(e.target.value) } />
                        </Form.Field>

                        <Form.Field required>
                            <label>Name</label>
                            <Input placeholder='Name' id='Name' name='Name' value={name} onChange={ e => setName(e.target.value) } />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    <Button
                        content="Save Changes"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                        onClick={event => handleSubmit(event)}
                    />
                </Modal.Actions>
            </Modal>

            <Modal
                onClose={() => setDeleteOpen(false)}
                open={deleteOpen}
                size="tiny">
                <Modal.Header>Delete Organization</Modal.Header>
                <Modal.Content>
                    <p style={{ textAlign: 'center' }}>
                        <Icon name='exclamation circle' color='red' size='massive' />
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        <strong>
                            Are you sure?
                        </strong>
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        This Organistion and all its users will be deleted!
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setDeleteOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        content="Yes, delete it"
                        labelPosition='right'
                        icon='cancel'
                        positive={false}
                        color={'red'}
                        onClick={event => handleDelete(event)}
                    />
                </Modal.Actions>
            </Modal>

        </React.Fragment>
    );
}

export default Organizations;
