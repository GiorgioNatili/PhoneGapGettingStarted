var app = {
    currentHeading: null,
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

        // On Android filter is not supported.
        var options = {frequency: 150};
        app.currentHeading = navigator.compass.watchHeading(app.onCompassSuccess, app.onCompassError, options);
        
     },
     onCompassSuccess: function(heading){

        var magneticHeading = heading.magneticHeading,
            trueHeading     = heading.trueHeading;

        console.log(magneticHeading, trueHeading);

        var compass = document.querySelector('#compassbg'),
            north = document.querySelector('#north');
       
        var compassRotation = 'rotate(' + magneticHeading + 'deg)',
            northRotation = 'rotate(' + trueHeading + 'deg)';

        var compassSytle = compass.style,
            northStyle = north.style;

        switch(true){

            case compassSytle.webkitTransform != null:
            compassSytle.webkitTransform = compassRotation;
            northStyle.webkitTransform = northRotation;
            break;

            case compassSytle.mozTransform != null:
            compassSytle.mozTransform = compassRotation;
            northStyle.mozTransform = northRotation;
            break;

            case arrowSytle.msTransform != null:
            compassSytle.msTransform = compassRotation;
            northStyle.msTransform = northRotation;
            break;

            default:
            compassSytle.transform = compassRotation;
            northStyle.transform = northRotation;

        }

        document.querySelector('#heading').inerrHTML = 'heading: ' + magneticHeading;

     },
    onCompassError: function(error){

        switch(true){
          
            case error.code == CompassError.COMPASS_INTERNAL_ERR:
            navigator.notification.alert('Compass Error!', null, 'Info', 'OK');
            break;
          
            case error.code == CompassError.COMPASS_NOT_SUPPORTED:
            navigator.notification.alert('Compass Unavailable!', null, 'Info', 'OK');
            break;
        
            default:
            navigator.notification.alert('Generic Error!', null,'Info', 'OK');

        }

        navigator.compass.clearWatch(currentHeading);

    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};