import React from 'react';
import CountUp from 'react-countup';
import { Col, Statistic as AntdStatistic, Card } from 'antd';
const formatter = (value) => <CountUp end={value} separator="," />;

const CustomStatistic = ({ title, value, bgColor, spanValue }) => (
    <Col span={spanValue} >
        <Card className={` ${bgColor}`} bordered={false}>
            <AntdStatistic title={title} value={value} formatter={formatter} />
        </Card>
    </Col>

);
export default CustomStatistic;

