export const navItems: Menu[] = [
  {
    title: 'Accounting',
    links: [
      { text: 'Ledger', routerLink: ['accounting', 'ledgers'], role: 'admin' },
      { text: 'Vouchers', routerLink: ['accounting', 'voucher'] },
      { text: 'Statement', routerLink: ['accounting', 'statement'] },
      { text: 'Day Book', routerLink: ['accounting', 'daybook'], role: 'admin' },
      { text: 'Balance', routerLink: ['accounting', 'ledger-balance'] }
    ],
  },
  {
    title: 'Invoices',
    links: [
      { text: 'Sales Invoices', routerLink: ['invoices', 'create', 'sales'] },
      {
        text: 'Purchase Invoices',
        routerLink: ['invoices', 'create', 'purchase'],
      },
      { text: 'View Invoices', routerLink: ['invoices', 'search'] },
    ],
  },
  {
    title: 'Products',
    links: [
      { text: 'New Product', routerLink: ['products', 'add'] },
      { text: 'View Product', routerLink: ['products', 'view'] },
      { text: 'Transfer Product', routerLink: ['products', 'transfer'] },
      { text: 'View Usage', routerLink: ['products', 'usageReport']}
    ],
  },
  {
    title: 'Bundles',
    links: [
      { text: 'Create', routerLink: ['bundles', 'create'] },
      { text: 'View', routerLink: ['bundles', 'view'] },
    ],
    role: 'admin'
  },
  {
    title: 'Locations',
    links: [
      { text: 'New Store', routerLink: ['locations', 'add'], role: 'admin' },
      { text: 'View Locations', routerLink: ['locations', 'view'] },
      {
        text: 'My Location',
        routerLink: ['locations', 'select-location'],
      },
    ],
  },
  {
    title: 'Reports',
    links: [
      { text: 'User Sales', routerLink: ['report', 'user', 'sales'] },
      { text: 'Product Wise', routerLink: ['report', 'products']}
    ],
    role: 'admin'
  },
  {
    title: 'Users',
    links: [
      { text: 'Create New', routerLink: ['master', 'users', 'create-user'] },
    ],
    role: 'admin'
  },
];

interface MenuItems {
  text: string;
  routerLink: string[];
  role?: 'admin' | 'user';
}

interface Menu {
  title: string;
  links: MenuItems[];
  role?: 'admin' | 'user';
}