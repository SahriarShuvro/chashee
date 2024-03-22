import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Post } from '@/components/user/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const CustomModal = () => {
    const [open, setOpen] = useState(false);
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
            <Modal footer={false}
                open={open}
                title={<p className='font-semibold text-lg mb-6'>Add Post!</p>}
                onCancel={handleCancel}
            >
                <Post />
            </Modal>
        </>
    );
};
export default CustomModal;