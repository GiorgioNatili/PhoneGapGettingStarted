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

    readRootFiles: function(reader){

        reader.readEntries(function(entries){

                            var element = document.querySelector('#deviceready');

                             for (var i = 0, fs; fs = entries[i]; i++) {

                                    var html = '<p>' + fs.name + ' - ' + fs.fullPath + '</p><br>';
                                    element.innerHTML += html;

                            }                    
            
                            element.innerHTML += '<hr>';

                           },function(error){

                                alert('entries error ' + error.code);
                                
                         });

    },

    onFileSystemSuccess: function(fileSystem){

        var currentRoot = fileSystem.root;
        console.log(fileSystem);
        console.log(fileSystem.name);
        console.log(currentRoot.fullPath);

        app.readRootFiles(currentRoot.createReader());
        
        return;
        // '/' da come directory la root
        // '' da come directory sdcard0
        // '../' da come direcotry ..
        // '../../' da come direcotry .. ma vedo il mondo
        // './' da come direcotry .. ma vedo il mondo
        currentRoot.getDirectory("", {create: false, exclusive:false}, function success(directory) {
                                
                                alert("Dir Name : " + directory.name);
                                // for(var i in parent)console.log(i);
                                var reader = directory.createReader();
                                reader.readEntries(function(entries){

                                    var element = document.querySelector('#deviceready');

                                    for (var i = 0, fs; fs = entries[i]; i++) {

                                         var html = '<p>' + fs.name + ' - ' + fs.fullPath + '</p><br>';
                                         element.innerHTML += html;


                                    }

                                }, function(error){

                                    alert('entries error ' + error.code);
                                
                                });

                            }, null);

        var directoryReader = currentRoot.createReader();
        directoryReader.readEntries(app.onDirSuccess, app.onFileSysError);

    },

    onDirSuccess: function(entries){

        console.log(entries);
        //window.resolveLocalFileSystemURI('file:///mnt/sdcard', app.onUriSuccess, app.onUriFailure);

    },

    onUriSuccess: function(fileSystemEntry){

        console.log(fileSystemEntry.name, fileSystemEntry.isFolder);
        alert(fileSystemEntry.name);
        

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
