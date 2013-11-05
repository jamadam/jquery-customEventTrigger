customEventTrigger 0.02 - Trigger events conditionally
---------------

## SYNOPSIS
    
    var instance = $('#target').customEventTrigger();
    instance.addGettingTrueEvent(yourEventName, condition, interval)
    instance.addChangeEvent(yourEventName, condition, interval)
    instance.add(yourEventName, genCb, compareCb, interval)
    instance.remove(yourEventName)

### EXAMPLE1

    var instance = $('.tab-content').customEventTrigger();
    instance.addGettingTrueEvent('shown', function(obj) {
        return (obj.css('display') != 'none');
    });

### EXAMPLE2

    var instance = $('#textarea').customEventTrigger();
    instance.addChangeEvent('resizeX', function(obj){
        return obj.get(0).clientWidth;
    });

### EXAMPLE3

    var instance = $('#textarea').customEventTrigger();
    instance.add('resize',
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

Copyright(c) [jamadam]
[jamadam]: http://blog2.jamadam.com/

Dual licensed under the MIT and GPL licenses:

- [http://www.opensource.org/licenses/mit-license.php]
- [http://www.gnu.org/licenses/gpl.html]
[http://www.opensource.org/licenses/mit-license.php]: http://www.opensource.org/licenses/mit-license.php
[http://www.gnu.org/licenses/gpl.html]:http://www.gnu.org/licenses/gpl.html