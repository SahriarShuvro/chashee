import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PreviewButton = () => {
    const [setLoading] = useState(false);
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
                type="primary"
                className="bg-blue-500 hover:bg-green-600 text-white"
                onClick={showModal}
            >
                <FontAwesomeIcon icon={faCircleInfo} />
            </Button>
            <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>
                ]}
            >
                <p>Preview</p>
            </Modal>
        </>
    );
};
export default PreviewButton;