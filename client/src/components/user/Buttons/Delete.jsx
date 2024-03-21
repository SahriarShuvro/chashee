import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const confirm = (e) => {
    console.log(e);
    message.success('Deleted!');
};
const cancel = (e) => {
    console.log(e);
    message.error('Cancle delete action!');
};
const DeleteButton = () => (
    <Popconfirm
        title="Delete the post!"
        description="Are you sure to delete this post?"
        onConfirm={confirm}
        onCancel={cancel}
        okText={<span className='okButton'>Ok</span>}
        cancelText={<span className='cancleButton'>Cancle</span>}
    >
        <Button danger type='primary'><FontAwesomeIcon icon={faTrash} /></Button>
    </Popconfirm>
);
export default DeleteButton;