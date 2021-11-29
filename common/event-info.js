
'use strict'

/**
 * Factory function for creating EventInfo objects.
 * 
 * @param eventName - the event eventName
 * @param message - the message that accompanies the event
 * @param source - the source of the message
 * @param timestamp - timestamp for the event
 */
function EventInfo(eventName, message, source, timestamp) {
    this.eventName = eventName;
    this.message = message;
    this.source = source;
    this.timestamp = timestamp;
}

/**
 * Function to return the string representation of
 * this EventInfo object
 * 
 * @returns JSON String representation of the object's contents
 */
EventInfo.prototype.toJSONString = function() {
    return '{ eventName : \'' + this.eventName + '\', ' +
            'message : \'' + this.message + '\', ' +
            'source : \'' + this.source + '\', ' +
            'timestamp : ' + this.timestamp + ' }'; 
}

EventInfo.prototype.toString = function() {
    return this.timestamp + ': ' + this.source + ':[' + this.eventName + ']: ' + this.message;
}

// Export the EventInfo factory function
module.exports.EventInfo = EventInfo;
