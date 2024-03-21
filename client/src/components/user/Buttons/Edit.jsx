import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditButton = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Button
                type='primary'
                className="edit-button bg-green-600 hover:bg-green-600 text-white"
                onClick={showModal}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="default" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>
                ]}
            >
                <p>Edit</p>
            </Modal>
        </>
    );
};
export default EditButton;