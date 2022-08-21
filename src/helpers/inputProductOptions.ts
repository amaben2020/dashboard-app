// This file is just for labeling  the table, and it’s better to put it in a separate file rather than bunching it together with the component itself.

export const categoryOptions = [
  {
    id: 'all',
    name: 'All',
  },
  {
    id: 'dress',
    name: 'Dress',
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
  },
  {
    id: 'blouse',
    name: 'Blouse',
  },
  {
    id: 'beauty',
    name: 'Beauty',
  },
];
export const availabilityOptions = [
  {
    id: 'all',
    name: 'All',
  },
  {
    id: 'available',
    name: 'Available',
  },
  {
    id: 'unavailable',
    name: 'Unavailable',
  },
];
export const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)',
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)',
  },
  {
    value: 'createdAt|desc',
    label: 'Creation date (newest first)',
  },
  {
    value: 'createdAt|asc',
    label: 'Creation date (oldest first)',
  },
];
