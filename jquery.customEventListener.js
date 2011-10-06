/*!
 * customEventListener 0.01 - Add custom event listener
 * 
 * SYNOPSIS
 *
 * $.customEventListener('#target').add(yourEventName, condition)
 * $.customEventListener('#target').remove(yourEventName)
 *
 * EXAMPLE1
 * 
 * $.customEventListener('#target').add('myEvent', myCondition(obj) {
 *     if (condition) {
 *         return true;
 *     }
 *     return false;
 * });
 * 
 * EXAMPLE2
 * 
 * $.customEventListener('.tab-content').add('shown', function(obj) {
 *     return (obj.css('display') != 'none');
 * });
 * 
 * http://blog2.jamadam.com/
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
    var plugname = 'customEventListener';
    
    $[plugname] = $.sub();
    
    /**
     * generate tid name that stored into data
     */
    function generateTidDataName(eventName) {
        return 'tid.' + eventName + '.' + plugname;
    }
    
    /**
     * add listener
     */
    $[plugname].fn.add = function(eventName, condition, interval){
        $(this).each(function() {
            var obj = $(this);
            var lastRes = false;
            var tid = setInterval(function() {
                var res = condition(obj);
                if (! lastRes && res) {
                    obj.trigger(eventName);
                }
                lastRes = res;
            }, interval || 1);
            obj.data(generateTidDataName(eventName), tid);
        });
    };
    
    /**
     * remove listener
     */
    $[plugname].fn.remove = function(eventName){
        $(this).each(function() {
            clearInterval($(this).data(generateTidDataName(eventName)));
        });
    };
    
})(jQuery);
