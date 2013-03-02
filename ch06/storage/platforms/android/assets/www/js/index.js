var app = {

    count: 0,

    storage: (function() {
      var uid = new Date(),
          result;
      try {
        localStorage.setItem(uid, uid);
        result = localStorage.getItem(uid) == uid;
        localStorage.removeItem(uid);
        return result && localStorage;
      } catch(e) {}
    }()),

    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
        document.addEventListener('unload', this.cleanStorage, false);
        
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
        app.init();

    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    },

    addRandomItem: function(){

        this.storage.setItem('item' + this.count, Math.random());
        this.count++;    

    },

    init: function(){

        count = 0;

       // document.addEventListener('touchstart', this.onTouchStart);
       // document.addEventListener('touchend', this.onStorageUpdated);
        var tripper = document.querySelector('#tripper');
        
        tripper.addEventListener('focusin', this.loadStoredData);
        tripper.addEventListener('focusout', this.saveUserToStorage);

    },

    loadStoredData: function(event){

        event.target.removeEventListener(event.type, arguments.callee)

        var tripperOptions = document.querySelector('#typedTrippers');
        var fragment = document.createDocumentFragment();

        var length = app.storage.length;
        var opt;

        for (var i = 0; i <= length; i++) {
           
            var value = app.storage.getItem('tripper' + i);
            
            if (value) {

                opt = document.createElement('option');
                opt.setAttribute('value', value);

                fragment.appendChild(opt);

            }

        }

        tripperOptions.appendChild(fragment);

    },

    saveUserToStorage: function(event){

        var length = app.storage.length;
        var newValue = event.target.value;
        var toAdd = true;

         for (var i = 0; i <= length; i++) {
            
            var value = app.storage.getItem('tripper' + i);
            
            if (value == newValue) {

                toAdd = false;
                break;

            }     

        }

        if (toAdd) app.storage.setItem('tripper' + length, newValue); 

    },

    onTouchStart: function(event){

        app.addRandomItem();

        event.preventDefault();

    },

    onStorageUpdated: function(event){

        console.log('onStorageUpdate', app.storage);


    },

    cleanStorage: function(event){

        this.storage.clear();

    }
};
