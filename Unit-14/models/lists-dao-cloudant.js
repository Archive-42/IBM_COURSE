
'use strict';

/**
 * This is the DAO interface for the application.
 * You will need to provide an implementation for each
 * function in the interface. The implementation has been
 * provided for you in the appropriately named *sqlite3.js
 * file located in this directory.
 */

// UUID creation
const uuidv4 = require('uuid/v4');

// Local utils
const utils = require('../utils/utils');

// Local logger
const logger = require('../utils/logger');
//logger.setLogLevel(logger.Level.DEBUG);

const itemsDao = require('./items-dao');

// Cloudant DB reference
let db;

// Initialize the DB when this module is loaded
(function getDbConnection() {
    logger.info('Initializing Cloudant connection...', 'lists-dao-cloudant.getDbConnection()');
    utils.dbCloudantConnect().then((database) => {
        logger.info('Cloudant connection initialized.', 'lists-dao-cloudant.getDbConnection()');
        db = database;
    }).catch((err) => {
        logger.error('Error while initializing DB: ' + err.message, 'lists-dao-cloudant.getDbConnection()');
        throw err;
    });
})();

/**
 * Fetch all shopping lists
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function fetchAll() {
    return new Promise((resolve, reject) => {
        db.find({ 
            'selector': { 
                'type': {
                    '$eq': 'shoppingList' 
                }
            } 
        }, (err, results) => {
            if (err) {
                logger.error('Error occurred: ' + err.message, 'fetchAll()');
                reject(err);
            } else {
                let documents = results.docs;
                if (logger.isDebug()) logger.debug('Raw data: ' + JSON.stringify(documents), 'fetchAll()');
                resolve({ data: JSON.stringify(documents), statusCode: (documents.length > 0) ? 200 : 404 });
            }
        });
    });
}

/**
 * Create a shopping list with the specified description
 * 
 * @param {String} description - the description to use
 * 
 * @param {Number} id - optional ID if the caller wants to provide the ID
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function create(description) {
    return new Promise((resolve, reject) => {
        let listId = uuidv4();
        let whenCreated = Date.now();
        let list = {
            _id: listId,
            id: listId,
            type: 'shoppingList',
            items: [],
            description: description,
            whenCreated: whenCreated,
            whenUpdated: null
        };
        db.insert(list, (err, result) => {
            if (err) {
                logger.error('Error occurred: ' + err.message, 'create()');
                reject(err);
            } else {
                resolve({ data: { createdId: result.id, createdRevId: result.rev }, statusCode: 201 });
            }
        });
    });
}

/**
 * Find the shopping list with the specified id
 * 
 * @param {number} id - the id of the shopping list record
 * to be fetched.
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function findById(id) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                if (err.message == 'missing') {
                    logger.warn(`Document id ${id} does not exist.`, 'findById()');
                    resolve({ data: {}, statusCode: 404 });
                } else {
                    logger.error('Error occurred: ' + err.message, 'findById()');
                    reject(err);
                }
            } else {
                resolve({ data: JSON.stringify(document), statusCode: 200 });
            }
        });
    });
}

/**
 * Update the shopping list with the specified id
 * with new field values
 * 
 * @param {number} id - the id of the shopping list record
 * to be updated.
 * @param {String} description - the updated description
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function update(id, description) {
    return new Promise((resolve, reject) => {
        // Retrieve the list (need the rev)
        findById(id).then((response) => {
            // Parse the stringified JSON
            let list = JSON.parse(response.data);
            // Update the description
            list.description = description;
            list.whenModified = Date.now();
            // Update the document in Cloudant
            db.insert(list, (err, response) => {
                if (err) {
                    logger.error('Error occurred: ' + err.message, 'update()');
                    reject(err);
                } else {
                    resolve({ data: { updatedId: response.id, updatedRevId: response.rev }, statusCode: 200 });
                }
            });
        }).catch((err) => {
            logger.error('Error occurred: ' + err.message, 'update()');
            reject(err);
        });
    });
}

/**
 * Add the specified item to the specified shopping
 * list, along with values for the relationship
 * 
 * @param {number} listId - the id of the shopping list record
 * to which the item is to be added
 * @param {itemId} itemId - the id of the item record to be added
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function addItem(listId, itemId) {
    return new Promise((resolve, reject) => {
        // Retrieve the list (need the rev)
        findById(listId).then((response) => {
            // Parse the stringified JSON
            let list = JSON.parse(response.data);
            // Retrieve the item
            itemsDao.findById(itemId).then((response) => {
                // Parse the stringified JSON
                let item = JSON.parse(response.data);
                // Push the item onto the list items array
                list.items.push(item);
                // Update the list
                db.insert(list, (err, response) => {
                        if (err) {
                            logger.error('Error occurred: ' + err.message, 'findById()');
                            reject(err);
                        } else {
                            resolve({ data: { updatedId: response.id, updatedRevId: response.rev }, statusCode: 200 });
                        }
                    }
                );
            });
        }).catch((err) => {
            logger.error('Error occurred: ' + err.message, 'addItem()');
            reject(err);
        });
    });
}

/**
 * Remove the specified item from the specified shopping
 * list
 * 
 * @param {number} listId - the id of the shopping list record
 * to which the item is to be removed
 * @param {itemId} itemId - the id of the item record to be removed
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function removeItem(listId, itemId) {
    return new Promise((resolve, reject) => {
        // Retrieve the list (need the rev)
        findById(listId).then((response) => {
            // Parse the stringified JSON
            let list = JSON.parse(response.data);
            // Find the item in the array and remove it
            let removeIndex;
            for (let aa = 0; aa < list.items.length; aa++) {
                if (list.items[aa]._id == itemId) {
                    removeIndex = aa;
                    break;
                }
            }
            let deletedItem = list.items.splice(removeIndex, 1)[0];
            // Now update the shopping list in Cloudant
            db.insert(list, (err, response) => {
                    if (err) {
                        logger.error('Error occurred: ' + err.message, 'findById()');
                        reject(err);
                    } else {
                        resolve({ data: { updatedId: response.id, updatedRevId: response.rev, deletedItemId: deletedItem._id }, statusCode: 200 }); //eslint-disable-line max-len
                    }
                }
            );
        });
    });
}

module.exports.fetchAll = fetchAll;
module.exports.create = create;
module.exports.findById = findById;
module.exports.update = update;
module.exports.addItem = addItem;
module.exports.removeItem = removeItem;
