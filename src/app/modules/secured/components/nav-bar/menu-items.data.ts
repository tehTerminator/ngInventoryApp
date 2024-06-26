export const navItems = [
  {
    title: 'Accounting',
    links: [
      { text: 'Ledger', routerLink: ['accounting', 'ledgers'] },
      { text: 'Vouchers', routerLink: ['accounting', 'voucher'] },
      { text: 'Statement', routerLink: ['accounting', 'statement'] },
      { text: 'Day Book', routerLink: ['accounting', 'daybook'] },
      { text: 'Balance', routerLink: ['accounting', 'ledger-balance'] },
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
    ],
  },
  // {
  //   title: 'Bundles',
  //   links: [
  //     { text: 'Create', routerLink: ['bundles', 'create'] },
  //     { text: 'View', routerLink: ['bundles', 'view'] },
  //   ],
  // },
  {
    title: 'Locations',
    links: [
      { text: 'New Store', routerLink: ['locations', 'add'] },
      { text: 'View Locations', routerLink: ['locations', 'view'] },
      {
        text: 'My Location',
        routerLink: ['locations', 'select-location'],
      },
    ],
  },
  {
    title: 'Users',
    links: [
      { text: 'Create New', routerLink: ['master', 'users', 'create-user'] },
    ],
    role: 'admin',
  },
];
