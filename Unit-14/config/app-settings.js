
'use strict';

/**
 * appSettings - all relative to the project root
 */
const appSettings = {
    mongodb_dbpath: '~/home/mongodb-data/db',
    mongodb_url: 'mongodb://localhost:27017',
    mongodb_db_name: 'shoppingList',
    
    brand_file_name: '../data/Grocery_Brands_Database.csv',
    item_file_name: '../data/Grocery_UPC_Database.csv',

    cloudant_db_name: 'shopping_list',
    cloudant_max_items: 200000,
    cloudant_bulk_batch_size: 10000,

    server_host: 'localhost',
    server_listen_port: 3000,
};

module.exports = appSettings;
