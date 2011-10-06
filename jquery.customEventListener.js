/*!
 * customEventListener 0.01 - Add custom event listener
 * 
 * SYNOPSIS
 *
 * $.customEventListener('#target').addGetTrueListener(yourEventName, condition)
 * $.customEventListener('#target').addChangeListener(yourEventName, condition)
 * $.customEventListener('#target').remove(yourEventName)
 *
 * EXAMPLE1
 * 
 * $.customEventListener('#target').addGetTrueListener('myEvent', myCondition(obj) {
 *     if (condition) {
 *         return true;
 *     }
 *     return false;
 * });
 * 
 * EXAMPLE2
 * 
 * $.customEventListener('.tab-content').addGetTrueListener('shown', function(obj) {
 *     return (obj.css('display') != 'none');
 * });
 * 
 * EXAMPLE3
 * 
 * $.customEventListener('.tab-content').addChangeListener('resize', function(obj) {
 *     return obj.get(0).clientWidth + 'x' + obj.get(0).clientHeight;
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
     * add Conditional listener
     */
    $[plugname].fn.addGetTrueListener = function(eventName, condition, interval){
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
     * add Conditional listener
     */
    $[plugname].fn.add = $[plugname].fn.addGetTrueListener;
    
    /**
     * add change detect listener
     */
    $[plugname].fn.addChangeListener = function(eventName, condition, interval){
        $(this).each(function() {
            var obj = $(this);
            var lastRes = undefined;
            var tid = setInterval(function() {
                var res = condition(obj);
                if (lastRes !== res) {
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
            var tidName = generateTidDataName(eventName);
            clearInterval($(this).data(tidName));
            $(this).removeData(tidName);
        });
    };
    
})(jQuery);
