# conditionalTrigger 0.01 - Trigger events conditionally

## SYNOPSIS
    
    $.conditionalTrigger('#target').addGetTrueTrigger(yourEventName, condition, interval)
    $.conditionalTrigger('#target').addChangeTrigger(yourEventName, condition, interval)
    $.conditionalTrigger('#target').add(yourEventName, genCb, compareCb, interval)
    $.conditionalTrigger('#target').remove(yourEventName)

### EXAMPLE1
    
    $.conditionalTrigger('.tab-content').addGetTrueTrigger('shown', function(obj) {
        return (obj.css('display') != 'none');
    });

### EXAMPLE2
    
    $.conditionalTrigger("#textarea").addChangeTrigger('resizeX', function(obj){
        return obj.get(0).clientWidth;
    });

### EXAMPLE3
    
    $.conditionalTrigger("#textarea").add('resize',
        function(obj){
            return [obj.get(0).clientWidth, obj.get(0).clientHeight];
        },
        function(a, b){
            if (a !== undefined) {
                return a[0] !== b[0] || a[1] !== b[1];
            }
        }
    );

http://blog2.jamadam.com/

Copyright (c) 2011 jamadam

Dual licensed under the MIT and GPL licenses:
  http://www.opensource.org/licenses/mit-license.php
  http://www.gnu.org/licenses/gpl.html
