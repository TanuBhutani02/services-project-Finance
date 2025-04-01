import mongoose from 'mongoose';
 



import { Role } from '../types/role';
import { MenuItems } from '../models/menu_items';

const menuItems = [
  {
    name: 'Dashboard',
    icon: 'FiGrid',
    path: '/dashboard',
    roles: [Role.SUPER_ADMIN, Role.USER],
  },
  {
    name: 'Projects',
    icon: 'FiGrid',
    path: '/projects',
    roles: [Role.SUPER_ADMIN],
  },
  {
    name: 'Update',
    icon: 'FiRefreshCw',
    path: '/update',
    roles: [Role.SUPER_ADMIN],
  },
  {
    name: 'Reports',
    icon: 'FiFileText',
    path: '/reports',
    roles: [Role.SUPER_ADMIN, Role.USER],
  },
  {
    name: 'Financials',
    icon: 'FiBarChart',
    path: '/financials',
    roles: [Role.SUPER_ADMIN],
  }
];

export const seedData = async () => {
  try {
    console.log('test menu items call final ss ',);
    // await mongoose.connect('mongodb://localhost:27017/your-database', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    //const existingRoles = await Role.find();
    // if (existingRoles.length === 0) {
    //   await Role.insertMany(roles);
    //   console.log('Roles seeded successfully');
    // } else {
    //   console.log('Roles already exist');
    // }

    const existingMenuItems = await MenuItems.find();
    if (existingMenuItems.length === 0) {
      await MenuItems.create({menuItems});
      console.log('Menu items seeded successfully');
    } else {
      console.log('Menu items already exist');
    }
 
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

