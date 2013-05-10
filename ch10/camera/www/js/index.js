var app = {
    cameraPopover: null,
    cameraOptions: {targetWidth: 300, targetHeight: 400,
                    saveToPhotoAlbum: true, allowEdit: true},

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

        var element;

        element = document.querySelector('#getPicture');
        element.addEventListener('touchstart', app.takePicture);


        element = document.querySelector('#saveToPhotoAlbum');
        element.addEventListener('change', app.updatePreferences);

        element = document.querySelector('#allowEdit');
        element.addEventListener('change', app.updatePreferences);

    },

    updatePreferences: function(evt){

        evt.preventDefault();
        app.cameraOptions[evt.target.id] = evt.target.checked;

    },

    takePicture: function(evt){

        evt.preventDefault();

        this.cameraPopover = navigator.camera.getPicture(this.onCameraSuccess, this.onCameraError, this.cameraOptions);
        console.log(this.cameraOptions);

    },

    onCameraSuccess: function(imageData){

        console.log(imageData);
        document.querySelector('#shot').src = imageData;

    },

    onCameraError: function(errorMessage){

        navigator.notification.alert(errorMessage, null);

    },

    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
