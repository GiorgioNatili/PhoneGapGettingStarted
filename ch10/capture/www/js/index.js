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

        var capture = navigator.device.capture;

        console.log(capture.supportedVideoModes);
        console.log(capture.supportedAudioModes);
        console.log(capture.supportedImageModes);

        var capture = navigator.device.capture;

        capture.captureAudio(function(files){

            console.log(files);

        }, function(error){

            console.log(error);

        }, {duration: 1});

        console.log('CAPTURE_INTERNAL_ERR', CaptureError.CAPTURE_INTERNAL_ERR);
        console.log('CAPTURE_APPLICATION_BUSY', CaptureError.CAPTURE_APPLICATION_BUSY);
        console.log('CAPTURE_INVALID_ARGUMENT', CaptureError.CAPTURE_INVALID_ARGUMENT);
        console.log('CAPTURE_NO_MEDIA_FILES', CaptureError.CAPTURE_NO_MEDIA_FILES);
        console.log('CAPTURE_NOT_SUPPORTED', CaptureError.CAPTURE_NOT_SUPPORTED);

    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
