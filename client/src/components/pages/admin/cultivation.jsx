import React from 'react';
import { Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faWind, faEarthAsia, faViruses, faBugs, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import {
    Post,
    Categories,
    Disease,
    Insects,
    LandType,
    SoilType,
    Season,
} from '@/components/user';

const tabItems = [
    {
        key: "1",
        label: (
            <span>
                <FontAwesomeIcon icon={faCirclePlus} className='mr-2' />
                Posts
            </span>
        ),
        children: <Post />,
    },
    {
        key: "2",
        label: (
            <span>
                <FontAwesomeIcon icon={faLayerGroup} className='mr-2' />
                Categories
            </span>
        ),
        children: <Categories />,
    },
    {
        key: "3",
        label: (
            <span>
                <FontAwesomeIcon icon={faViruses} className='mr-2' />
                Disease
            </span>
        ),
        children: <Disease />,
    },
    {
        key: "4",
        label: (
            <span>
                <FontAwesomeIcon icon={faBugs} className='mr-2' />
                Insects
            </span>
        ),
        children: <Insects />,
    },
    {
        key: "5",
        label: (
            <span>
                <FontAwesomeIcon icon={faEarthAsia} className='mr-2' />
                Land Type
            </span>
        ),
        children: <LandType />,
    },
    {
        key: "6",
        label: (
            <span>
                <FontAwesomeIcon icon={faEarthAsia} className='mr-2' />
                Soil Type
            </span>
        ),
        children: <SoilType />,
    },
    {
        key: "7",
        label: (
            <span>
                <FontAwesomeIcon icon={faWind} className='mr-2' />
                Season
            </span>
        ),
        children: <Season />,
    },
]

const App = () => (
    <Tabs animated={true} defaultActiveKey="1" items={tabItems} />
);

export default App;
