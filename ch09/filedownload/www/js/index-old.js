var app = {
    root: {},
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

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024 * 5, function(fileSystem){

            app.root = fileSystem.root;

            // console.log(this.root);

            /*app.root.getFile('fake.txt', {create: true},
                        function(fileEntry){*/

                            var fileTransfer = new FileTransfer();

                            fileTransfer.onprogress = function(evt){

                                if(evt.lengthComputable){

                                    var tot = (evt.loaded / evt.total) * 100;
                                    document.querySelector('#progress').value = Math.round(tot);

                                    console.log(evt.loaded, evt.total, tot);

                                }

                            };

                            fileTransfer.download('http://s3.amazonaws.com/mislav/Dive+into+HTML5.pdf',
                                app.root.fullPath + '/html5.pdf',
                                app.fileDownloaded, app.fileTransferError);

                          /*  fileEntry.remove();

                        }, app.onError);*/

        });

    },

    renderingLink: function (url){

        var div = document.querySelector('#deviceready');
        var a = document.createElement('a');

        a.setAttribute('target', '_blank');
        a.setAttribute("href", url);
        a.appendChild(document.createTextNode('Open the file'))

        div.appendChild(a);

    },

    fileDownloaded: function(file){

        app.renderingLink(file.fullPath);

    },

    fileTransferError: function(ftError){


        navigator.notification.alert(ftError.code, null);

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
