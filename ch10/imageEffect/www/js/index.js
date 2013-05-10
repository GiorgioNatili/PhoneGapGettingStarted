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
        capture.captureImage(app.onImageAcquired, app.onImageError, {limit: 1});

    },

    onImageAcquired: function(files){

        var currentFile = files[0];

        var canvas = document.querySelector('#manipulatedImage');
        var context = canvas.getContext('2d');
        var image = new Image();

        var width = canvas.width;
        var height = canvas.height;

        image.onload = function(evt) {

            context.drawImage(this, 0, 0, width, height);

            var imgPixels = context.getImageData(0, 0, width, height);
            context.putImageData(app.grayscale(imgPixels), 0, 0, 0, 0, width, height);

        };

        image.src = currentFile.fullPath;

    },

    grayscale: function(pixels) {

        var d = pixels.data;

        for (var i=0; i<d.length; i+=4) {

            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];

            var v = 0.2126*r + 0.7152*g + 0.0722*b;
            d[i] = d[i+1] = d[i+2] = v
        }

        return pixels;

    },

    onImageError: function(error){

        console.log(error);

    },

    report: function(id) {
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
