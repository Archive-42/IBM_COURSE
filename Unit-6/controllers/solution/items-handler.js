
'use strict'

const logger = require('../utils/logger');

const itemsDao = require('../models/items-dao');

 /**
  * Handle (that is, resolve() or reject()) request for items search
  * (e.g., /items?upc=123456789012)
  * 
  * @param request - the original request
  * @param resolve - the resolve() function to the promise: 
  *     { data : the_result_json_data, 
  *       statusCode = http_status_code }
  * @param reject - the reject() function of the promise
  * @param parsedUrl - the parsed url from the caller
  */
 function handleItemsSearch(request, resolve, reject, parsedUrl) {
    // Now get the query string from the URL
    let query = parsedUrl.query;
    // By description?
    if (query.description) {
        // Node developer: use this as a template for the other DAO calls
        logger.debug(`Query by description: ${query.description}`, 'handleItemsSearch()');
        // Query DAO: 
        itemsDao.findByDescription(query.description).then((result) => {
            resolve(result);// ok if query results in no data
        }).catch((err) => {
            reject(err);
        });
    // By upc?
    } else if (query.upc) {
        logger.debug(`Query by UPC: ${query.upc}`, 'handleItemsSearch()');
        // Query DAO: 
        itemsDao.findByUpc(query.upc).then((result) => {
            resolve(result);// exact match or not found
        }).catch((err) => {
            reject(err);
        });
    // By id?
    } else if (query.id) {
        logger.debug(`Query by ID: ${query.id}`, 'handleItemsSearch()');
        itemsDao.findById(query.id).then((result) => {
            resolve(result);// exact match or not found
        }).catch((err) => {
            reject(err);
        });
    } else {
        let message = `Unsupported search param: ${parsedUrl.search}`;
        logger.error(message, 'handleItemsSearch()');
        reject(message);
    }
}

module.exports.handleItemsSearch = handleItemsSearch;
