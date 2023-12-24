import { Invoice } from '../../../../interface/invoice';

export const EmptyInvoice: Invoice = {
  id: 0,
  kind: 'sales',
  contact_id: 0,
  contact: {
    id: 0,
    title: 'Not Selected',
    address: 'Not Selected',
    mobile: '',
    kind: 'CUSTOMER',
  },
  location_id: 0,
  paid: false,
  amount: 0,
  userId: 0,
  transactions: [],
  created_at: '',
};
