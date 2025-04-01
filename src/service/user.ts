import { MenuItems } from "../models/menu_items";

export  async function roleMenuPermission(role: string) {  
  const menuItemsCollection = await MenuItems.find();
  console.log('variable new = ', menuItemsCollection);
  if (menuItemsCollection && menuItemsCollection.length > 0) {
    // Flatten the array of menuItems from all documents
    const allMenuItems = menuItemsCollection.flatMap(doc => doc.menuItems);
    // Filter the menuItems to include only those with the specified role
    const filteredMenuItems = allMenuItems.filter((item: any) => item.roles.includes(role));
    return filteredMenuItems;
  }
  return [];
}