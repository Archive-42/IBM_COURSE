
'use strict';

/**
 * appSettings - all relative to the project root
 */
const appSettings = {
    db_file_name: '../data/shopping-list.db',
    create_sql: {
        item: './scripts/item.sql',
        brand: './scripts/brand.sql',
        shopping_list: './scripts/shopping_list.sql',
        shopping_list_item: './scripts/shopping_list_item.sql'
    },
    brand_file_name: '../data/Grocery_Brands_Database.csv',
    item_file_name: '../data/Grocery_UPC_Database.csv',

    server_host: 'localhost',
    server_listen_port: 3000,
};

module.exports = appSettings;
