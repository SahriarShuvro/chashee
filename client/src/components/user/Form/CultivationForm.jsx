import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    Space,
    Alert,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const CultivationForm = ({ onSubmitVal }) => {
    // Data
    const [form] = Form.useForm();
    const [sowingTime, setSowingTime] = useState(null);
    const [plantingTime, setPlantingTime] = useState(null);
    const [harvestTime, setHarvestTime] = useState(null);

    const [categories, setCategories] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [soilTypes, setSoilTypes] = useState([]);
    const [landTypes, setLandTypes] = useState([]);
    const [insects, setInsects] = useState([]);
    const [diseases, setDiseases] = useState([]);



    // Actions
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState();

    const handleDateChange = (dates, timeType) => {
        if (dates && dates.length === 2) {
            const options = { month: 'short', day: 'numeric' };
            const [startDate, endDate] = dates;
            const start = new Date(startDate).toLocaleDateString('en-US', options);
            const end = new Date(endDate).toLocaleDateString('en-US', options);

            switch (timeType) {
                case 'sowing':
                    setSowingTime({ start, end });
                    break;
                case 'planting':
                    setPlantingTime({ start, end });
                    break;
                case 'harvest':
                    setHarvestTime({ start, end });
                    break;
                default:
                    break;
            }
        } else {
            switch (timeType) {
                case 'sowing':
                    setSowingTime(null);
                    break;
                case 'planting':
                    setPlantingTime(null);
                    break;
                case 'harvest':
                    setHarvestTime(null);
                    break;
                default:
                    break;
            }
        }
    };
    useEffect(() => {
        fetchData('/api/admin/categories', setCategories);
        fetchData('/api/admin/season', setSeasons);
        fetchData('/api/admin/soil-type', setSoilTypes);
        fetchData('/api/admin/land-type', setLandTypes);
        fetchData('/api/admin/insects', setInsects);
        fetchData('/api/admin/diseases', setDiseases);
    }, []);

    const fetchData = async (link, setData) => {
        try {
            const response = await axios.get(link);
            setData(response.data.entries);
        } catch (error) {
            setError(true);
            setErrorMsg(error.message);
            setTimeout(() => {
                setError(false);
            }, 2500);
        } finally {
            setLoading(false);
        }
    };
    const onSubMitForm = (values) => {
        values.harvest_time = harvestTime;
        values.planting_time = plantingTime;
        values.sowing_time = sowingTime;
        values.thumb = null;

        // console.log(values);
        try {
            setLoading(true);
            onSubmitVal(values);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 2500);
        } catch (error) {
            setError(true);
            setErrorMsg(error.message);
            setTimeout(() => {
                setError(false);
            }, 2500);
        } finally {
            setLoading(false);
        }
    };


    // console.log("Categories props:", categories);
    // console.log("Seasons props:", seasons);
    // console.log("Soil Types props:", soilTypes);
    // console.log("Land Types props:", landTypes);
    // console.log("Insects props:", insects);
    // console.log("Diseases props:", diseases);

    return (
        <>
            {success && (
                <Space className='fixed z-10 top-20 w-full flex left-0 right-0 bg m-auto justify-center align-middle'>
                    <Alert
                        className='border-green-500'
                        message="Success Tips"
                        description="Success fully added post"
                        type="success"
                        showIcon
                    />
                </Space>
            )}
            {error && (
                <Space className='fixed z-10 top-20 w-full flex left-0 right-0 bg m-auto justify-center align-middle'>
                    <Alert
                        message="Error"
                        description={errorMsg}
                        type="error"
                        showIcon
                    />
                </Space>
            )}

            <Form
                form={form}
                onFinish={onSubMitForm}
                layout="vertical"
            >
                <Form.Item name='thumb' valuePropName="fileList" getValueFromEvent={normFile}>
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

                <Form.Item label="Title" name='title'>
                    <Input />
                </Form.Item>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Category" className='w-1/2' name='category'>
                        <Select className='pr-2' >
                            {categories.map(category => (
                                <Select.Option key={category._id} value={category._id}>{category.title}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Season" className='w-1/2' name='season'>
                        <Select className='pl-2'>
                            {seasons.map(season => (
                                <Select.Option key={season._id} value={season._id}>{season.title}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Land Type" className='w-1/2' name='land_type'>
                        <Select className='pr-2' >
                            {landTypes.map(landType => (
                                <Select.Option key={landType._id} value={landType._id}>{landType.title}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Soil Type" className='w-1/2' name='soil_type'>
                        <Select className='pl-2' >
                            {soilTypes.map(soilType => (
                                <Select.Option key={soilType._id} value={soilType._id}>{soilType.title}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <div className='flex justify-between w-full'>
                    <Form.Item label="Disease" className='w-1/2' name='disease'>
                        <Select className='pr-2' >
                            {diseases.map(disease => (
                                <Select.Option key={disease._id} value={disease._id}>{disease.title}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Insects" className='w-1/2' name='insects'>
                        <Select className='pl-2' >
                            {insects.map(insects => (
                                <Select.Option key={insects._id} value={insects._id}>{insects.title}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item label="Sowing Time" className='w-full' name='sowing_time'>
                    <RangePicker className='w-full' onChange={(dates) => handleDateChange(dates, 'sowing')} value={sowingTime} />
                </Form.Item>
                <Form.Item label="Planting Time" className="w-full" name="planting_time">
                    <RangePicker className="w-full" onChange={(dates) => handleDateChange(dates, 'planting')} value={plantingTime} />
                </Form.Item>
                <Form.Item label="Harvest Time" className='w-full' name='harvest_time'>
                    <RangePicker className='w-full' onChange={(dates) => handleDateChange(dates, 'harvest')} value={harvestTime} />
                </Form.Item>



                <Form.Item label="Seedling Amount" className='w-full' name='seedling_amount'>
                    <InputNumber className='w-full' />
                </Form.Item>

                <div>
                    <p className='font-semibold text-lg mb-2'>Fertilizers</p>
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
                <p className='font-semibold text-lg mb-2'>Distance</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Plant to Plant" className='w-1/2' name={['distance', 'plant_to_plant']}>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Row to Row" className='w-1/2' name={['distance', 'row_to_row']}>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>


                <p className='font-semibold text-lg mb-2'>Crop Production</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Maximum" className='w-1/2' name={['crop_production', 'max']}>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Minimum" className='w-1/2' name={['crop_production', 'min']}>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>
                <p className='font-semibold text-lg mb-2'>Crop Price</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Maximum" className='w-1/2' name={['crop_prices', 'max']}>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Minimum" className='w-1/2' name={['crop_prices', 'min']}>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>
                <p className='font-semibold text-lg mb-2'>Total Cost</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Maximum" className='w-1/2' name={['cost', 'max']}>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Minimum" className='w-1/2' name={['cost', 'min']}>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>
                <p className='font-semibold text-lg mb-2'>NET Profit</p>
                <div className='flex justify-between w-full'>
                    <Form.Item label="Maximum" className='w-1/2' name={['profit', 'max']}>
                        <div className='pr-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                    <Form.Item label="Minimum" className='w-1/2' name={['profit', 'min']}>
                        <div className='pl-2'>
                            <InputNumber className='w-full' />
                        </div>
                    </Form.Item>
                </div>

                <Form.Item label="Description" name='description'>
                    <TextArea cols={6} />
                </Form.Item>


                <Button
                    type="primary"
                    size='large'
                    htmlType="submit"
                    loading={loading}
                    className="ubuntu-bold bg-blue-500 text-white flex m-auto mr-0" >
                    Submit
                </Button>
            </Form>
        </>
    );
};
export default () => <CultivationForm />;