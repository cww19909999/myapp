export default{
    name: 'Main',
    path: '/main',
    component: () => import('@/views/Main'),
    meta: {
        isLogin: true
    },
    redirect: sessionStorage.getItem('activePath') || '/statistical',
    children:[
        {
            path: '/promanage',
            // name: 'Promanage',
            component: () => import('@/views/Main/Product/Manage')
        },
        {
            path: '/probrand',
            // name: 'Probrand',
            component: () => import('@/views/Main/Product/Brand')
        },
        {
            path: '/procategory',
            // name: 'Procategory',
            component: () => import('@/views/Main/Product/Category')
        },
        {
            path: '/usermanage',
            // name: 'Procategory',
            component: () => import('@/views/Main/User/UserControl')
        },
        {
            path: '/suppliermanage',
            // name: 'Procategory',
            component: () => import('@/views/Main/User/Supplier')
        },
        {
            path: '/adminmanage',
            // name: 'Procategory',
            component: () => import('@/views/Main/User/Admins')
        },
        {
            path: '/orderall',
            // name: 'Procategory',
            component: () => import('@/views/Main/Order/All')
        },
        {
            path: '/ordercheck',
            // name: 'Procategory',
            component: () => import('@/views/Main/Order/Check')
        },
        {
            path: '/orderunpay',
            // name: 'Procategory',
            component: () => import('@/views/Main/Order/Unpay')
        },
        {
            path: '/ordersend',
            // name: 'Procategory',
            component: () => import('@/views/Main/Order/Send')
        },
        {
            path: '/orderreceive',
            // name: 'Procategory',
            component: () => import('@/views/Main/Order/Receive')
        },
        {
            path: '/orderfinish',
            // name: 'Procategory',
            component: () => import('@/views/Main/Order/Finish')
        },
        {
            path: '/statistical',
            // name: 'Procategory',
            component: () => import('@/views/Main/Data/Statistical'),
            props: true
        }
    ]
}