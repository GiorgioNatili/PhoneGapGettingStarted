// TODO create two versions of this file in order to allow people that is following the

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

        element = document.querySelector('#cleanpictures');
        element.addEventListener('touchstart', app.cleanPicture);

        element = document.querySelector('#saveToPhotoAlbum');
        element.addEventListener('change', app.updatePreferences);

        element = document.querySelector('#allowEdit');
        element.addEventListener('change', app.updatePreferences);

        app.initAdditionalOptions();

    },

    updatePreferences: function(evt){

        evt.preventDefault();
        app.cameraOptions[evt.target.id] = evt.target.checked;

    },

    cleanPicture: function(evt){

        evt.preventDefault();

        navigator.camera.cleanup(function(message){

            navigator.notification.alert(message, null);

        }, function(errorMessage){

            navigator.notification.alert(errorMessage, null);

        });

    },

    initAdditionalOptions: function(){

        app.cameraOptions.sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        app.cameraOptions.popoverOptions = new CameraPopoverOptions(220, 600, 320, 480, Camera.PopoverArrowDirection.ARROW_DOWN);

    },

    takePicture: function(evt){

        evt.preventDefault();

        app.cameraPopover = navigator.camera.getPicture(app.onCameraSuccess, app.onCameraError, app.cameraOptions);
        console.log(app.cameraOptions);

    },

    onCameraSuccess: function(imageData){

        console.log(imageData);
        document.querySelector('#shot').src = imageData;

    },

    onCameraError: function(errorMessage){

        console.log(errorMessage);

    },

    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
