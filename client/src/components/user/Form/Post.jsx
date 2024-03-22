import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    Space
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormDisabledDemo = () => {
    return (
        <>
            <Form
                layout="vertical"
            >
                <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <button
                            style={{
                                border: 0,
                                background: 'none',
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Title">
                    <Input />
                </Form.Item>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Category" className='w-1/2'>
                        <Select className='pr-2'>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Season" className='w-1/2'>
                        <Select className='pl-2'>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Land Type" className='w-1/2'>
                        <Select className='pr-2'>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Soil Type" className='w-1/2'>
                        <Select className='pl-2'>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <Form.Item label="Sowing Time" className='w-full'>
                    <RangePicker className='w-full' />
                </Form.Item>
                <Form.Item label="Planting Time" className='w-full'>
                    <RangePicker className='w-full' />
                </Form.Item>

                <Form.Item label="Seedling Amount" className='w-full'>
                    <InputNumber className='w-full' />
                </Form.Item>
                <p className='font-semibold text-lg mb-2'>Distance</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Plant to Plant" className='w-1/2'>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Row to Row" className='w-1/2'>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>

                <div>
                    <p className='mb-2'>Fertilizers</p>
                    <Form.List name="fertilizers">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing name',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Name" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'amount']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing amount',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Amount" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Fertilizer
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>

                <div className='flex justify-between w-full'>
                    <Form.Item label="Disease" className='w-1/2'>
                        <Select className='pr-2'>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Insects" className='w-1/2'>
                        <Select className='pl-2'>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <Form.Item label="Harvest Time" className='w-full'>
                    <RangePicker className='w-full' />
                </Form.Item>
                <Form.Item label="" className='w-full'>
                    <RangePicker className='w-full' />
                </Form.Item>
                <p className='font-semibold text-lg mb-2'>Crop Production</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Maximum" className='w-1/2'>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Minimum" className='w-1/2'>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>
                <p className='font-semibold text-lg mb-2'>Crop Price</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Maximum" className='w-1/2'>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Minimum" className='w-1/2'>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>
                <p className='font-semibold text-lg mb-2'>Total Cost</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Maximum" className='w-1/2'>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Minimum" className='w-1/2'>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>
                <p className='font-semibold text-lg mb-2'>NET Profit</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Maximum" className='w-1/2'>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Minimum" className='w-1/2'>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>

                <Form.Item label="Discription">
                    <TextArea cols={6} />
                </Form.Item>


                <Button type="primary" size='large' htmlType="submit" className="ubuntu-bold bg-blue-500 text-white flex m-auto mr-0" >
                    Submit
                </Button>
            </Form>
        </>
    );
};
export default () => <FormDisabledDemo />;