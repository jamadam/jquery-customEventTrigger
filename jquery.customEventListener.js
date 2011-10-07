/*!
 * customEventListener 0.01 - Add custom event listener
 * 
 * SYNOPSIS
 *
 * $.customEventListener('#target').addGetTrueListener(yourEventName, condition, interval)
 * $.customEventListener('#target').addChangeListener(yourEventName, condition, interval)
 * $.customEventListener('#target').add(yourEventName, genCb, compareCb, interval)
 * $.customEventListener('#target').remove(yourEventName)
 *
 * EXAMPLE1
 * 
 * $.customEventListener('.tab-content').addGetTrueListener('shown', function(obj) {
 *     return (obj.css('display') != 'none');
 * });
 * 
 * EXAMPLE2
 * 
 * $.customEventListener("#textarea").addChangeListener('resizeX', function(obj){
 *     return obj.get(0).clientWidth;
 * });
 * 
 * EXAMPLE3
 * 
 * $.customEventListener("#textarea").add('resize',
 *     function(obj){
 *         return [obj.get(0).clientWidth, obj.get(0).clientHeight];
 *     },
 *     function(a, b){
 *         if (a !== undefined) {
 *             return a[0] !== b[0] || a[1] !== b[1];
 *         }
 *     }
 * );
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
    $[plugname].fn.addGetTrueListener = function(eventName, newValue, interval){
        $[plugname](this).add(
                eventName, newValue, function(a, b){return ! a && b}, interval);
    };
    
    /**
     * add change detect listener
     */
    $[plugname].fn.addChangeListener = function(eventName, newValue, interval){
        $[plugname](this).add(
                eventName, newValue, function(a, b){return a !== b}, interval);
    };
    
    /**
     * add change detect listener
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
