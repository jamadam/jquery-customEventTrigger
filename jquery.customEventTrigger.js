/*!
 * customEventTrigger 0.01 - Trigger events conditionally
 * 
 * https://github.com/jamadam/jquery-customEventTrigger
 *
 * Copyright (c) 2011 jamadam
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

    /**
     * plugin name
     */
    var plugname = 'customEventTrigger';
    
    $[plugname] = $.sub();
    
    /**
     * generate tid name that stored into data
     */
    function generateTidDataName(eventName) {
        return 'tid.' + eventName + '.' + plugname;
    }
    
    /**
     * add Conditional Trigger
     */
    $[plugname].fn.addGetTrueTrigger = function(eventName, newValue, interval){
        $[plugname](this).add(
                eventName, newValue, function(a, b){return ! a && b}, interval);
    };
    
    /**
     * add change detect Trigger
     */
    $[plugname].fn.addChangeTrigger = function(eventName, newValue, interval){
        $[plugname](this).add(
                eventName, newValue, function(a, b){return a !== b}, interval);
    };
    
    /**
     * add change detect Trigger
     */
    $[plugname].fn.add = function(eventName, newValue, compare, interval){
        $(this).each(function() {
            var obj = $(this);
            var a;
            var tid = setInterval(function() {
                var b = newValue(obj);
                if (compare(a, b)) {
                    obj.trigger(eventName);
                }
                a = b;
            }, interval || 1);
            obj.data(generateTidDataName(eventName), tid);
        });
    };
    
    /**
     * remove Trigger
     */
    $[plugname].fn.remove = function(eventName){
        $(this).each(function() {
            var tidName = generateTidDataName(eventName);
            clearInterval($(this).data(tidName));
            $(this).removeData(tidName);
        });
    };
    
})(jQuery);
