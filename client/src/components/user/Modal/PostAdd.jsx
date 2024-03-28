import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { AddForm } from '@/components/user/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function CustomModal() {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (formData) => {
        console.log(formData);
        try {
            const response = await axios.post('/api/admin/cultivation', formData);
            console.log('Form data submitted:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button size='large' type="primary" className="ubuntu-bold bg-blue-500 text-white" onClick={showModal}>
                <FontAwesomeIcon icon={faCirclePlus} className='mr-2' /> Add Post
            </Button>
            <Modal
                open={open}
                title={<p className='font-semibold text-lg mb-6'>Add Post!</p>}
                onCancel={handleCancel}
                footer={null}
            >
                <AddForm onSubmit={handleSubmit} />
            </Modal>
        </>
    );
};

export default CustomModal;
