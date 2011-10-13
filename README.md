customEventTrigger 0.01 - Trigger events conditionally
---------------

## SYNOPSIS
    
    $.customEventTrigger('#target').addGetTrueTrigger(yourEventName, condition, interval)
    $.customEventTrigger('#target').addChangeTrigger(yourEventName, condition, interval)
    $.customEventTrigger('#target').add(yourEventName, genCb, compareCb, interval)
    $.customEventTrigger('#target').remove(yourEventName)

### EXAMPLE1

    $.customEventTrigger('.tab-content').addGetTrueTrigger('shown', function(obj) {
        return (obj.css('display') != 'none');
    });

### EXAMPLE2

    $.customEventTrigger("#textarea").addChangeTrigger('resizeX', function(obj){
        return obj.get(0).clientWidth;
    });

### EXAMPLE3

    $.customEventTrigger("#textarea").add('resize',
        function(obj){
            return [obj.get(0).clientWidth, obj.get(0).clientHeight];
        },
        function(a, b){
            if (a !== undefined) {
                return a[0] !== b[0] || a[1] !== b[1];
            }
        }
    );

[https://github.com/jamadam/jquery-customEventTrigger]
[https://github.com/jamadam/jquery-customEventTrigger]:https://github.com/jamadam/jquery-customEventTrigger

Copyright (c) 2011 [jamadam]
[jamadam]: http://blog2.jamadam.com/

Dual licensed under the MIT and GPL licenses:

- [http://www.opensource.org/licenses/mit-license.php]
- [http://www.gnu.org/licenses/gpl.html]
[http://www.opensource.org/licenses/mit-license.php]: http://www.opensource.org/licenses/mit-license.php
[http://www.gnu.org/licenses/gpl.html]:http://www.gnu.org/licenses/gpl.html