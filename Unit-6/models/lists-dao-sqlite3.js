
'use strict'

/**
 * Sqlite3 implementation of the DAO interface for the
 * application. You should not need to make changes here.
 * If you find a bug, please open an issue.
 */

const sqlite3 = require('sqlite3').verbose();
const logger = require('../utils/logger');

const appSettings = require('../config/app-settings');

const db = require('../utils/utils').getDatabase();

function findAll() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM shopping_list';
        db.all(sql, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data : JSON.stringify(row), statusCode: 200 });
            }
        });
    });
}

/**
 * Create a shopping list with the specified description
 */
function create(description) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO shopping_list(description) VALUES(?)`
        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
        db.run(sql, description, function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "createdId" : ${this.lastID} }`, statusCode: 201 });
            }
        })
    });
}

/**
 * Find the shopping list for the specified id
 */
function findById(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM shopping_list WHERE id = ?`;
        db.get(sql, id, (err, row) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findById()');
                reject(message);
            } else if (row) {
                resolve({ data : JSON.stringify(row), statusCode: 200 });
            } else {
                resolve({ data : '{}', statusCode: 404 });
            }
        });
    });
}

/**
 * Find the shopping list with the specified id,
 * return all items that match
 */
function findByIdWithAllItems(id) {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT  shopping_list.id as shopping_list_id,
                shopping_list.description as shopping_list_description,
                shopping_list.when_created as shopping_list_when_created,
                shopping_list.when_modified,
                item.id as item_id,
                item.upc,
                item.description as item_description,
                brand.id as brand_id,
                brand.description as brand_description,
                brand.manufacturer,
                brand.location,
                brand.website,
                shopping_list_item.quantity,
                shopping_list_item.picked_up
        FROM shopping_list
            JOIN shopping_list_item ON shopping_list.id = shopping_list_item.shopping_list_id
            JOIN item ON item.id = shopping_list_item.item_id 
            JOIN brand ON brand.id = item.brand_id
        WHERE shopping_list.id = ?`;
        db.all(sql, id, (err, row) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByIdWithAllItems()');
                reject(message);
            } else if (row) {
                resolve({ data : JSON.stringify(row), statusCode: 200 });
            } else {
                resolve({ data : '{}', statusCode: 404 });
            }
        });
    });
}

/**
 * Update the shopping list with the specified id
 * with new field values
 */
function update(id, description) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE shopping_list SET description = ?, when_modified = datetime('now') WHERE id = ?`;
        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
        db.run(sql, description, id, function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "rowsAffected" : ${this.changes} }`, statusCode: 200 });
            }
        });
    });
}

/**
 * Add the specified item to the specified shopping
 * list, along with values for the relationship
 */
function addItem(listId, itemId, quantity) {
    return new Promise((resolve, reject) => {
        if (typeof quantity === 'undefined') {
            quantity = 1;
        }
        const sql = 'INSERT INTO shopping_list_item (item_id, shopping_list_id, quantity) VALUES(?, ?, ?)';
        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
        db.run(sql, itemId, listId, quantity, function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "createdId" : ${this.lastID} }`, statusCode : 201 });
            }
        });
    });
}

/**
 * Update the specified item in the specified shopping
 * list, along with values for the relationship
 */
function updateItem(listId, itemId, quantity, pickedUp) {
    return new Promise((resolve, reject) => {
        if (typeof quantity === 'undefined') {
            quantity = 1;
        }
        if (typeof pickedUp === 'undefined') {
            pickedUp = 0;
        }
        const sql = 'UPDATE shopping_list_item SET quantity = ?, picked_up = ? WHERE shopping_list_id = ? AND item_id = ?';
        db.run(sql, quantity, pickedUp, listId, itemId, function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "rowsAffected" : ${this.changes} }`, statusCode: 200 });
            }
        });
    });
}

/**
 * Remove the specified item from the specified shopping
 * list
 */
function removeItem(listId, itemId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM shopping_list_item WHERE shopping_list_id = ? AND item_id = ?';
        db.run(sql, listId, itemId, function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "rowsAffected" : ${this.changes} }`, statusCode: 200 });
            }
        });
    });
}

module.exports.findAll = findAll;
module.exports.create = create;
module.exports.findById = findById;
module.exports.findByIdWithAllItems = findByIdWithAllItems;
module.exports.update = update;
module.exports.addItem = addItem;
module.exports.updateItem = updateItem;
module.exports.removeItem = removeItem;
