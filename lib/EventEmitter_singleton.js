'use strict';

/**
 * EventEmitter classe singleton.
 * Require EventEmitter class
 */
var Bus = (function() {

    /** @type {Object} module public api */
    var singleton = {};

    /** @type {EventEmitter} the instance of EventEmitter class */
    var _instance;

    /**
     * Creates and/or returns an instance of the EventEmitter class.
     * @return {EventEmitter} an EventEmitter class instance
     */
    singleton.getInstance = function() {
        if (!_instance) {
            _instance = new EventEmitter();
        }
        return _instance;
    };

    // returns module public api
    return singleton;

})();