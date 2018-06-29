export default {
    items: [
        {
            name: 'Dashboard',
            url: '/admin/dashboard',
            icon: 'icon-speedometer',
            badge: {
                variant: 'info',
                // text: 'NEW',
            },
        },
        {
            name: 'Access Management',
            url: '/admin/access',
            icon: 'icon-puzzle',
            children: [
                {
                    name: 'Mange Users',
                    url: '/admin/access/user',
                    icon: 'icon-puzzle',
                },
                {
                    name: 'Mange Roles',
                    url: '/admin/access/role',
                    icon: 'icon-puzzle',
                },
            ],
        },
    ],
};
