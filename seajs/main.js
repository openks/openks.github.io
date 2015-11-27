define(function(require,exports,module){ 
    console.log('module of main:');
    var main1 = require('main1');
    main1.say();
    var main2 = require('main2');
    main2.say();

    return { 
        say: function(){ 
            console.log('main--hello');
        }
    };

});