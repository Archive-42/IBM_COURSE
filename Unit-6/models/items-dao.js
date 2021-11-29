
'use strict'

/**
 * This is the DAO interface for the application.
 * You will need to provide an implementation for each
 * function in the interface. The implementation has been
 * provided for you in the appropriately named *sqlite3.js
 * file located in this directory.
 */

// Node Dev TODO: Add your code here
// TODO: a particular require() goes here to access the Sqlite3 implementation

/**
 * Find the Item object by the specified ID
 * using the underlying implementation.
 * 
 * @param id - the ID of the item record (SQL) or document (NoSQL)
 * to locate
 */
function findById(id) {
// Node Dev TODO: Add your code here
}

/**
 * Find all Items objects that match the specified
 * partial description.
 * 
 * @param partialDescription - the partial description to match
 * and return items whose description contains this partial description
 */
function findByDescription(partialDescription) {
// Node Dev TODO: Add your code here
}

/**
 * Find the Item object that matches the specified
 * UPC exactly.
 * 
 * @param upc - the UPC of the item record (SQL) or document (NoSQL)
 * to locate
 */
function findByUpc(upc) {
// Node Dev TODO: Add your code here
}

// Node Dev TODO: Add your code here
// TODO: make sure to export functions that need to be visible outside this module
