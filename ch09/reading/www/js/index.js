var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },

    onError: function (error) {

        navigator.notification.alert(error.code, null);

    },
    requestFileSystem: function () {

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){

            var root = fileSystem.root;

            console.log('root', fileSystem.root);

            var reader = root.createReader();

            reader.readEntries(function(entries){

               for(var i = 0, entry; entry = entries[i]; i++){

                   console.log('root entry', entry);

                   if(entry.isFile && (/\.(gif|jpg|jpeg|png)$/i).test(entry.name)){

                        root.getFile(entry.name, {create: false}, app.onGetFile, app.onError);
                        break;

                   }

               }

            }, app.onError);

        }, this.onError);

    },

    onGetFile: function(fileEntry){

        fileEntry.file(function(file){

            var reader = new FileReader();

            reader.onloadstart = function(evt){

                console.log('onloadstart', evt);

            };

            reader.onloadend = function(evt){

                console.log('onloadend', evt);

            };

            reader.onload = function(evt){

                console.log('onload SUCCESS', evt);

                var img = document.querySelector('#firstImage');
                img.src = evt.target.result;


            };

            reader.onerror = function(err){

                console.log('onerror', err);

            };

            reader.readAsDataURL(file);

        }, app.onError);

    },

    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
        app.requestFileSystem();
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
