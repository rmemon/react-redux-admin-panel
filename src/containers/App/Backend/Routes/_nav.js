export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        // text: 'NEW',
      },
    },
    {
      name: 'Access Management',
      url: '/access',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Mange Users',
          url: '/access/user',
          icon: 'icon-puzzle',
        },
        {
          name: 'Mange Roles',
          url: '/access/role',
          icon: 'icon-puzzle',
        },
      ],
    },
  ],
};
