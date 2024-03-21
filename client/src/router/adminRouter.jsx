import {
    Dashboard,
    Category,
    Cultivation,
    Disease,
    Insects,
    LandType,
    SoilType,
    Season,
} from '@/components/pages/admin/'


const adminRoutes = [
    {
        index: '/',
        element: <Dashboard />
    },

    {
        path: 'cultivation',
        element: <Cultivation />
    },

    {
        path: 'categories',
        element: <Category />
    },

    {
        path: 'disease',
        element: <Disease />
    },

    {
        path: 'insects',
        element: <Insects />
    },

    {
        path: 'land-type',
        element: <LandType />
    },

    {
        path: 'soil-type',
        element: <SoilType />
    },
    {
        path: 'season',
        element: <Season />
    },
]


export default adminRoutes