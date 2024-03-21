import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { Edit, Delete, Preview } from '@/components/user/Buttons';

import axios from 'axios';

const PostTable = () => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [category, setCategory] = useState([]);
    const [season, setSeason] = useState([]);
    const [landType, setLandType] = useState([]);
    const [soilType, setSoilType] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (page = 1) => {
        try {
            const response = await axios.get(`/api/admin/cultivation?page=${page}`);
            const responseData = response.data;

            const entries = responseData.entries;
            console.log("Entries:", typeof entries);

            // Fetching category data
            const categoryPromises = entries.map(async (entry) => {
                const categoryRes = await axios.get(`/api/admin/categories/${entry.category}`);
                return categoryRes.data.allData;
            });
            const categories = await Promise.all(categoryPromises);
            console.log("Categories:", typeof categories);

            // Fetching season data
            const seasonPromises = entries.map(async (entry) => {
                const seasonRes = await axios.get(`/api/admin/season/${entry.season}`);
                return seasonRes.data.allData;
            });
            const seasons = await Promise.all(seasonPromises);
            console.log("Seasons:", typeof seasons);

            // Fetching landType data
            const landTypePromises = entries.map(async (entry) => {
                const landTypeRes = await axios.get(`/api/admin/land-type/${entry.land_type}`);
                return landTypeRes.data.allData;
            });
            const landTypes = await Promise.all(landTypePromises);
            console.log("Land Types:", typeof landTypes);

            // Fetching soilType data
            const soilTypePromises = entries.map(async (entry) => {
                const soilTypeRes = await axios.get(`/api/admin/soil-type/${entry.soil_type}`);
                return soilTypeRes.data.allData;
            });
            const soilTypes = await Promise.all(soilTypePromises);
            console.log("Soil Types:", typeof soilTypes);

            setCategory(categories);
            setSeason(seasons);
            setLandType(landTypes);
            setSoilType(soilTypes);
            setPosts(entries);
            setPagination(responseData.pagination);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const handlePaginationChange = (page) => {
        fetchData(page);
    };

    // Render function for category
    const renderCategory = (categoryId) => {
        const categoryData = category.find(cat => cat._id === categoryId);
        return categoryData ? categoryData.title : '-';
    };

    // Render function for season
    const renderSeason = (seasonId) => {
        const seasonData = season.find(season => season._id === seasonId);
        return seasonData ? seasonData.title : '-';
    };

    // Render function for land type
    const renderLandType = (landTypeId) => {
        const landTypeData = landType.find(landType => landType._id === landTypeId);
        return landTypeData ? landTypeData.title : '-';
    };

    // Render function for soil type
    const renderSoilType = (soilTypeId) => {
        const soilTypeData = soilType.find(soilType => soilType._id === soilTypeId);
        return soilTypeData ? soilTypeData.title : '-';
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <a>{text}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category, record) => renderCategory(record.category),
        },
        {
            title: 'Season',
            dataIndex: 'season',
            key: 'season',
            render: (season, record) => renderSeason(record.season),
        },
        {
            title: 'Land Type',
            dataIndex: 'land_type',
            key: 'land_type',
            render: (landType, record) => renderLandType(record.land_type),
        },
        {
            title: 'Soil Type',
            dataIndex: 'soil_type',
            key: 'soil_type',
            render: (soilType, record) => renderSoilType(record.soil_type),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Edit key={`edit-${record._id}`} />
                    <Preview key={`preview-${record._id}`} />
                    <Delete key={`delete-${record._id}`} />
                </Space>
            ),
        },
    ];




    return (
        <div>
            <Table
                columns={columns}
                dataSource={posts.map(post => ({ ...post, key: post._id }))}
                loading={loading}
                pagination={{
                    current: pagination.currentPage,
                    total: pagination.totalEntries,
                    pageSize: 24,
                    onChange: handlePaginationChange,
                    showSizeChanger: false,
                }}
            />

        </div>
    );
};

export default PostTable;
