'use strict';

/**
 * EventEmitter class
 */
class EventEmitter {
    constructor() {
        /** @type {array} the EventEmitter's events */
        this.events = [];
    }

    /**
     * Will register an event with a name for a specific context and its specific callback.
     * If an event with this name already exists, it will just create the event for the context and the callback
     * then push it into the name namespace.
     *
     * @param {string} name the name of the event to create or to update
     * @param {Object} context the object's context on what the event is acting
     * @param {Function} callback the callback called when the event is emitted
     * @param {bool} on has this event to be emitted (default)
     * @param {bool} once has this event to be emitted only once
     * @param {int} to number of time the event has to be emit
     * @param {int | boolean} at how many time the event has to be emit before to launch its callback
     *      if {at} is a boolean false, it is uneficiant
     * @param {int} there how many time the event has to be emit before to launch its callback once
     */
    on(name, context, callback, on, once, to, at, there) {
        var alreadyExists = false;
        if (on === undefined || on) {
            on = true;
        } else {
            on = false;
        }
        var event = {
            'context': context,
            'callback': callback,
            'on': on,
            'once': once || false,
            'to': to || -1,
            'at': at || false,
            'there': there || -1
        };
        for (var e of this.events) {
            if (e.name === name) {
                e.events.push(event);
                alreadyExists = true;
            }
        }
        if (!alreadyExists) {
            var events = {
                'name': name,
                'events': [event]
            }
            this.events.push(events);
        }
    };

    /**
     * Will register an event with a name for a specific context and its specific callback for only once emitting.
     *
     * @param {string} name the name of the event to create or to update
     * @param {Object} context the object's context on what the event is acting
     * @param {Function} callback the callback called when the event is emited
     */
    once(name, context, callback) {
        this.on(name, context, callback, false, true);
    };

    /**
     * Will register an event with a name for a specific context and its specific callback for exactly x emitting.
     *
     * @param {string} name the name of the event to create or to update
     * @param {Object} context the object's context on what the event is acting
     * @param {Function} callback the callback called when the event is emited
     * @param {int} to number of time the event has to be emit
     */
    to(name, context, callback, to) {
        this.on(name, context, callback, false, false, to);
    };

    /**
     * Will register an event with a name for a specific context and its specific callback which be called after x emitting.
     *
     * @param {string} name the name of the event to create or to update
     * @param {Object} context the object's context on what the event is acting
     * @param {Function} callback the callback called when the event is emited
     * @param {int} at how many time the event has to be emit before to launch its callback
     */
    at(name, context, callback, at) {
        this.on(name, context, callback, false, false, -1, --at);
    };

    /**
     * Will register an event with a name for a specific context and its specific callback which be called once after x emitting.
     *
     * @param {string} name the name of the event to create or to update
     * @param {Object} context the object's context on what the event is acting
     * @param {Function} callback the callback called when the event is emited
     * @param {int} there how many time the event has to be emit before to launch its callback once
     */
    there(name, context, callback, there) {
        this.on(name, context, callback, false, false, -1, false, there);
    };

    /**
     * Will emit the event with the specific name, passing the args into the event's callbacks
     *
     * @param {array | string} names the names of all the events to emit.
     * Could be a string if we want to emit only one event, or an array for many.
     * @param {array} args the array of arguments to pass into the event's callbacks to emit
     */
    emit(names, ...args) {
        args = args || [];
        for (var e of this.events) {
            if (names instanceof Array) {
                for (var name of names) {
                    this._emitEvent(name, e, args[0]);
                }
            } else {
                this._emitEvent(names, e, args[0]);
            }
        }
    };

    /**
     * Check if the given event corresponds to the given name and so, emit the event.
     * @param {string} name the name of the event
     * @param {Object} e the event we are evaluating
     * @param {array} args the array of arguments to pass into the event's callbacks to emit
     * @private
     */
    _emitEvent(name, e, ...args) {
        if (e.name === name) {
            for (var event of e.events) {
                // resolve {at}
                if (event.at !== false) {
                    if (event.at <= 0) {
                        event.callback.apply(event.context, args);
                    }
                    if (event.at > 0) {
                        event.at--;
                    }   
                }
                // resolve {there}
                else if (event.there > 0) {
                    event.there--;
                }
                else if (event.there === 0) {
                    event.callback.apply(event.context, args);
                    this.off([name], event.context);
                }
                // resolve {to}
                else if (event.to > 0) {
                    event.callback.apply(event.context, args);
                    event.to--;
                }
                else if (event.to === 0) {
                    this.off([name], event.context);
                }
                // resolve {on}
                else if (event.on === true) {
                    event.callback.apply(event.context, args);
                }
                // resolve {once}
                else if (event.once) {
                    event.callback.apply(event.context, args);
                    this.off([name], event.context);
                }
            }
        }
    }

    /**
     * Will remove from an array of events's namespace the registered context.
     *
     * @param {array | string} names the names of the events where we want to unregistred a context.
     * Could be a string if we want to unregister only one event, or an array for many.
     * @param {Object} context the object's context we want to unregistred from an event
     */
    off(names, context) {
        for (var event of this.events) {
            if (names instanceof Array) {
                for (var name of names) {
                    this._unregisterEvent(name, event, context);
                }
            } else {
                this._unregisterEvent(names, event, context);
            }
        }
    };

    /**
     * Check if the given event corresponds to the given name and so, remove the event from the list.
     * @param {string} name the name of the event
     * @param {Object} event the event we are evaluating
     * @param {Object} context the object's context on what the event is acting
     * @private
     */
    _unregisterEvent(name, event, context) {
        if (event.name === name) {
            var j = 0;
            for (var e of event.events) {
                if (this._equals(e.context.constructor.name, context.constructor.name)) {
                    event.events.splice(j, 1);
                }
                j++;
            }
        }
    };

    /**
     * Check if given contexts are equals
     * @param {Object} x context from event
     * @param {Object} y context from off method
     * @private
     */
    _equals( x, y ) {
        if ( x === y ) return true;
        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
        if ( x.constructor !== y.constructor ) return false;
        for ( var p in x ) {
            if ( ! x.hasOwnProperty( p ) ) continue;
            if ( ! y.hasOwnProperty( p ) ) return false;
            if ( x[ p ] === y[ p ] ) continue;
            if ( typeof( x[ p ] ) !== "object" ) return false;
            if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
        }
        for ( p in y ) {
            if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
        }
        return true;
    }

    /**
    * Remove all the registered events. Method called between called views.
    */
    clean(){
        this.events = [];
    }
}