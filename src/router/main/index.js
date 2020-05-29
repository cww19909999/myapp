export default{
    name: 'Main',
    path: '/main',
    component: () => import('@/views/Main'),
    meta: {
        isLogin: true
    },
    redirect: '/promanage',
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
    ]
}