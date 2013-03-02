var app = {

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

    database: null,

    initialize: function() {
        this.bind();
    },
    bind: function() {

        document.addEventListener('deviceready', this.deviceready, false);
        document.addEventListener('unload', this.cleanStorage, false);
        
    },
    deviceready: function() {
             
        app.init();

    },

    onSaveSuccess: function(){

        console.log('success', arguments);
        navigator.notification.alert('success ' + arguments);

    },

    onSaveError: function(){

        console.log('error', arguments);
        navigator.notification.alert('error ' + arguments);

    },

    onCloneError: function(){

        console.log('clone error', arguments);
        navigator.notification.alert('clone error ' + arguments);

    },

    onCloneSuccess: function(){

        console.log('clone success', arguments);
        navigator.notification.alert('clone success ' + arguments);

    },

    init: function(){

        var contact = navigator.contacts.create({'displayName': 'Giorgio'});
        contact.save(this.onSaveSuccess, this.onSaveError);

        // clone
        var clone = contact.clone(this.onCloneSuccess, this.onCloneError);

        this.prepareDatabase();

        var tripper = document.querySelector('#tripper');
        
        tripper.addEventListener('focusin', this.loadStoredData);
        tripper.addEventListener('focusout', this.saveUserToStorage);

        document.querySelector('body').addEventListener('submit', this.onSaveData, true);

        this.renderData();

    },

    renderData: function(){

        var trips = document.querySelector('#trips');

        trips.innerHTML = '';

        this.database.transaction(function(transactionObj){

            var sql = 'SELECT * FROM trips;';
            transactionObj.executeSql(sql, [], function(txObj, result){

                console.log(result, result.rows);
                var fragment = document.createDocumentFragment(),
                    i,
                    item,
                    obj,
                    limit = result.rows.length;

                for(i = 0; i < limit; i++){

                    obj = result.rows.item(i);

                    item = document.createElement('p');       
                    item.innerHTML = obj.id + ' - ' + obj.tripper + '|' + obj.tripMate;
                    
                    fragment.appendChild(item);

                }

                 trips.appendChild(fragment);

            });

        }, this.onTransactionFault, null); 

    },

    onSaveData: function(evt){

        var tripper     = document.querySelector('#tripper'),
            tripMate    = document.querySelector('#tripmate'),
            departure   = document.querySelector('#departure'),
            arrival     = document.querySelector('#arrival');

        app.addTrip(tripper.value, tripMate.value, departure.value, arrival.value);

        evt.stopPropagation();
        evt.preventDefault();

        return false;

    },

    addTrip: function(tripper, tripMate, departure, arrival){

        console.log(arguments);        

        this.database.transaction(function(transactionObj){

            var sql = 'INSERT INTO trips (tripper, tripMate, departure, arrival) VALUES (?, ?, ?, ?);';
            transactionObj.executeSql(sql, [tripper, tripMate, departure, arrival]);

        }, this.onTransactionFault, this.onInsertSuccess);

    },

    onInsertSuccess: function(transactionObj){

        app.renderData();

    },

    onTransactionFault: function(transactionObj){

        navigator.notification.alert(transactionObj.message);

    },

    prepareDatabase: function(){

        var size = (1024 * 1024 * 2); 
        this.database = window.openDatabase('urTrip', '0.5', 'Trips Data', size);

        this.database.transaction(this.createTables, this.onCreateTableError, this.onCreateTableSuccess);

    },

    createTables: function(transactionObj){

        // transactionObj.executeSql('DROP TABLE IF EXISTS trips');
        transactionObj.executeSql('CREATE TABLE IF NOT EXISTS trips (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, tripper TEXT, tripMate TEXT, departure INTEGER, arrival, departureDate DATE, arrivalDate DATE)');

    },

    onCreateTableError: function(transactionObj){

        navigator.notification.alert(transactionObj.message);

    },

    onCreateTableSuccess: function(){

        navigator.notification.alert('Database created correctly');

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

    cleanStorage: function(event){

        this.storage.clear();

    }
};
