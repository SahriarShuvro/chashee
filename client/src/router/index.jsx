import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '@/components/layouts/AdminLayout';
import adminRoutes from './adminRouter';


const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: adminRoutes
    }
])


export default router;