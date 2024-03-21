import React, { useState, useEffect } from 'react';
import { Row, Skeleton } from 'antd';
import Statistic from '@/components/user/Statistic';
import PostTable from '@/components/user/Table';
import axios from 'axios'
import { PostAdd } from '@//components/user/Modal'

const Post = () => {
    const [pagination, setPagination] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/admin/cultivation`)
            setPagination(response.data.pagination)
            setLoading(false)
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }


    return (
        <div>
            {loading ? (
                <Skeleton active />
            ) : (
                <>
                    <div className='bg-gray-100 p-4 mb-4 rounded'>
                        <Row gutter={16} >
                            <Statistic spanValue={6} title="Total Post" value={pagination.totalEntries} />
                            <Statistic spanValue={6} title="Active Post" value={pagination.activeItems} />
                            <Statistic spanValue={6} title="Inactive Post" value={pagination.inactiveItems} />
                            <Statistic spanValue={6} title="Total Post" value={pagination.totalEntries} />
                        </Row>
                    </div>

                    <div className='py-4'>
                        <PostAdd />
                    </div>

                    <div>
                        <PostTable />
                    </div>
                </>
            )}
        </div>
    )
}

export default Post