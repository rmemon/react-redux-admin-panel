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
      url: '/dashboard',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Mange Users',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },        
        {
          name: 'Mange Roles',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },        
        {
          name: 'Mange Permissions',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },        
      ],
    },
  ],
};
