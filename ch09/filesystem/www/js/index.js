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
        app.requestFileSystem();
    },

    requestFileSystem: function(){

        var fileSystem = window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024 * 5, app.onFileSystemSuccess, null);

    },

    onFileSystemSuccess: function(fileSystem){

        var currentRoot = fileSystem.root;
        console.log(fileSystem.name);
        console.log(currentRoot.fullPath);

        currentRoot.getDirectory("../", {create: false, exclusive:false}, function success(parent) {
                                
                                alert("Parent Name: " + parent.name);

                            }, null);

        var directoryReader = currentRoot.createReader();
        directoryReader.readEntries(app.onDirSuccess, app.onFileSysError);

    },

    onDirSuccess: function(entries){

        console.log(entries);
        //window.resolveLocalFileSystemURI('file:///data', app.onUriSuccess, app.onUriFailure);

    },

    onUriSuccess: function(fileSystemEntry){

        console.log(fileSystemEntry.name, fileSystemEntry.isFolder);
        alert(fileSystemEntry.name);
        alert(fileSystemEntry.isFolder);

    },

    onUriFailure: function(fileError){

        console.log(FileError.NOT_FOUND_ERR, fileError.code);

        alert(fileError.code);

    },

    onFileSysError: function(error){

        console.log(error.code);

    },

    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
