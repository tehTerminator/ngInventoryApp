export const navItems = [
  {
    title: 'Vouchers',
    links: [
      { text: 'Add Edit Vouchers', routerLink: ['vouchers', 'add'] },
      { text: 'View Statement', routerLink: ['vouchers', 'statement'] },
      { text: 'Day Book', routerLink: ['vouchers', 'daybook'] },
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
      { text: 'View Invoices', routerLink: ['invoices', 'users'] },
    ],
  },
  {
    title: 'Products',
    links: [
      { text: 'New Product', routerLink: ['products', 'add'] },
      { text: 'View Product', routerLink: ['products', 'view'] },
      { text: 'Transfer Product', routerLink: ['products', 'view'] },
    ],
  },
  {
    title: 'Product-Groups',
    links: [
      { text: 'New Group', routerLink: ['products', 'product-group', 'add']},
      { text: 'View Groups', routerLink: ['products', 'product-group', 'view']},
    ]
  },
  {
    title: 'Locations',
    links: [
      { text: 'New Location', routerLink: ['locations', 'add'] },
      { text: 'View Locations', routerLink: ['locations', 'view'] },
      { text: 'Assign Users', routerLink: ['locations', 'assign'] },
      { text: 'View Stock', routerLink: ['locations', 'assign'] },
    ],
  },
  {
    title: 'Master',
    links: [
      { text: 'Groups', routerLink: ['master', 'groups'] },
      { text: 'Ledgers', routerLink: ['master', 'ledgers'] },
      { text: 'Users', routerLink: ['master', 'users'] },
    ],
  },
];
