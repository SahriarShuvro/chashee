import React, { useState, useEffect } from 'react';
import { Row, Skeleton } from 'antd';
import Statistic from '@/components/user/Statistic';
import PostTable from '@/components/user/Table';
import { PostAdd } from '@/components/user/Modal'; // corrected import path
import axios from 'axios';

const Post = () => {
    const [pagination, setPagination] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);
    const [posts, setPosts] = useState([]);
    const [paginationTable, setPaginationTable] = useState([]);
    const [category, setCategory] = useState([]);
    const [season, setSeason] = useState([]);
    const [landType, setLandType] = useState([]);
    const [soilType, setSoilType] = useState([]);

    useEffect(() => {
        fetchData();
        fetchDataTable();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/admin/cultivation`);
            setPagination(response.data.pagination);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const fetchDataTable = async (page = 1) => {
        try {
            const response = await axios.get(`/api/admin/cultivation?page=${page}`);
            const responseData = response.data;

            const entries = responseData.entries;

            // Fetching category data
            const categoryPromises = entries.map(async (entry) => {
                const categoryRes = await axios.get(`/api/admin/categories/${entry.category}`);
                return categoryRes.data.allData;
            });
            const categories = await Promise.all(categoryPromises);

            // Fetching season data
            const seasonPromises = entries.map(async (entry) => {
                const seasonRes = await axios.get(`/api/admin/season/${entry.season}`);
                return seasonRes.data.allData;
            });
            const seasons = await Promise.all(seasonPromises);

            // Fetching landType data
            const landTypePromises = entries.map(async (entry) => {
                const landTypeRes = await axios.get(`/api/admin/land-type/${entry.land_type}`);
                return landTypeRes.data.allData;
            });
            const landTypes = await Promise.all(landTypePromises);

            // Fetching soilType data
            const soilTypePromises = entries.map(async (entry) => {
                const soilTypeRes = await axios.get(`/api/admin/soil-type/${entry.soil_type}`);
                return soilTypeRes.data.allData;
            });
            const soilTypes = await Promise.all(soilTypePromises);

            setCategory(categories);
            setSeason(seasons);
            setLandType(landTypes);
            setSoilType(soilTypes);
            setPosts(entries);
            setPaginationTable(responseData.pagination);
            setLoadingTable(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handlePaginationChange = async (page) => {
        setLoadingTable(true)
        try {
            await fetchDataTable(page);
        } catch (error) {
            console.log("Error in pagination:", error);
        } finally {
            setLoadingTable(false)
        }
    };
    return (
        <div>
            {loading ? (
                <Skeleton active />
            ) : (
                <>
                    <div className="bg-gray-100 p-4 mb-4 rounded">
                        <Row gutter={16}>
                            <Statistic spanValue={6} title="Total Post" value={pagination.totalEntries} />
                            <Statistic spanValue={6} title="Active Post" value={pagination.activeItems} />
                            <Statistic spanValue={6} title="Inactive Post" value={pagination.inactiveItems} />
                            <Statistic spanValue={6} title="Total Post" value={pagination.totalEntries} />
                        </Row>
                    </div>
                </>
            )}
            <div className="py-4">
                <PostAdd />
            </div>
            <div>
                <PostTable
                    posts={posts}
                    paginationTable={paginationTable}
                    category={category}
                    season={season}
                    landType={landType}
                    soilType={soilType}
                    loadingTable={loadingTable}
                    setCategory={setCategory}
                    setSeason={setSeason}
                    setLandType={setLandType}
                    setSoilType={setSoilType}
                    handlePaginationTableChange={handlePaginationChange}
                />
            </div>
        </div>
    );
};

export default Post;
