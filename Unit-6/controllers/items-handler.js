
'use strict'

// Node Dev TODO: Add your code here
// TODO: figure out what require()s go here

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
    if (query.description) {
        // By description?
        // Node developer: use this as a template for the other DAO calls
        logger.debug(`Query by description: ${query.description}`, 'handleItemsSearch()');
        // Query DAO: 
        itemsDao.findByDescription(query.description).then((result) => {
            resolve(result);// ok if query results in no data
        }).catch((err) => {
            reject(err);
        });
    } else if (query.upc) {
        // By upc?
        // Node Dev TODO: Add your code here
        reject('Node Dev TODO: WRITE CODE!');// Remove this when you're done
    } else if (query.id) {
        // By id?
        // Node Dev TODO: Add your code here
        reject('Node Dev TODO: WRITE CODE!');// Remove this when you're done
    } else {
        let message = `Unsupported search param: ${parsedUrl.search}`;
        logger.error(message, 'handleItemsSearch()');
        reject(message);
    }
}

module.exports.handleItemsSearch = handleItemsSearch;
