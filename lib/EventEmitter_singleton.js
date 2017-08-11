'use strict';

/**
 * EventEmitter classe singleton.
 * Require EventEmitter class
 */
const Bus = (function() {

    /** @type {Object} module public api */
    var singleton = {};

    /** @type {EventEmitter} the instance of EventEmitter class */
    var _instance;

    /**
     * Creates and/or returns an instance of the EventEmitter class.
     * @return {EventEmitter} an EventEmitter class instance
     * @private
     */
    singleton._getInstance = function() {
        if (!_instance) {
            _instance = new EventEmitter();
        }
        return _instance;
    };

    // returns unique instance of EventEmitter
    return singleton._getInstance();

})();