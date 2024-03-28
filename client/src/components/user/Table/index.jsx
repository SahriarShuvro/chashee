import React from 'react';
import { Space, Table } from 'antd';
import { Edit, Delete, Preview } from '@/components/user/Buttons';

const PostTable = ({ posts, paginationTable, category, season, landType, soilType, loadingTable, handlePaginationTableChange }) => {

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
                loading={loadingTable}
                pagination={{
                    current: paginationTable.currentPage || 1,
                    total: paginationTable.totalEntries || 0,
                    pageSize: 24,
                    onChange: handlePaginationTableChange,
                    showSizeChanger: false,
                }}
            />
        </div>
    );
};

export default PostTable;
