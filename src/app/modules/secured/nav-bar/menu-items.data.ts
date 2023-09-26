interface MenuItem {
    name: string;
    url: string | string[];
    children?: MenuItem[];
  }
  
export const navItems: MenuItem[] = [
    {
      name: 'Dashboard',
      url: 'dashboard'
    },
    {
      name: 'Users',
      url: 'user',
      children: [
        {
          name: 'My Profile',
          url: ['users', 'profile']
        },
        {
          name: 'Sign Out',
          url: ['users', 'sign-out']
        }
      ]
    }
  ];