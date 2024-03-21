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
            <Button size='large' type="primary" className="ubuntu-bold bg-blue-500 hover:bg-green-600 text-white" onClick={showModal}>
                <FontAwesomeIcon icon={faCirclePlus} className='mr-2' /> Add Post
            </Button>
            <Modal footer={false}
                open={open}
                title="Add Post!"
                onCancel={handleCancel}
            >
                <Post />
            </Modal>
        </>
    );
};
export default CustomModal;