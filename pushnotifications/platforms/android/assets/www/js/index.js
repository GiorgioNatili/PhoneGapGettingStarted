var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');

        var pushNotification = window.plugins.pushNotification;

        console.log(pushNotification);
        console.log(navigator.device);

        if (device.platform == 'android' || device.platform == 'Android') {
            // $("#app-status-ul").append('<li>registering android</li>');
            pushNotification.register(app.successHandler, app.errorHandler, {"senderID":"570783355289","ecb":"app.onNotificationGCM"});		// required!
        } else {
            // $("#app-status-ul").append('<li>registering iOS</li>');
            pushNotification.register(app.tokenHandler, app.errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
        }

    },

    addLogs: function(message, data){

        var logs = document.querySelector('.logs');

        var log = document.createElement('li');
        log.innerHTML = message + data;

        logs.appendChild(log);

    },

    tokenHandler: function  (result) {

        navigator.notification.alert('<li>token: '+ result +'</li>', null);
        app.addLogs('token: ', result);

    },

    successHandler: function (result){

        navigator.notification.vibrate(300);
        app.addLogs('success: ', result);

    },

    errorHandler: function  (error) {

        navigator.notification.vibrate(300);
        app.addLogs('error: ', error);

    },

    onNotificationGCM: function (evt) {

        navigator.notification.vibrate(300);
        app.addLogs('EVENT -> RECEIVED: ', evt.event);
        console.log(e);

    },

    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
