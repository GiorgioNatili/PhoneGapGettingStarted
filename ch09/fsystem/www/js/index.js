var app = {

    queuedDir: [],
    currentRoot: {},

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
        setTimeout(function(){app.requestFileSystem()}, 300);
    },

    requestFileSystem: function(){

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024 * 1, app.onFileSystemSuccess, app.onFileSysError);

    },

    readDirAndFiles: function(reader){

        console.log(reader);

        reader.readEntries(app.parseDirectories, app.onFileSysError);

    },

    parseDirectories: function(entries){

        console.log(entries);

        for (var i = 0, fs; fs = entries[i]; i++) {

            app.queuedDir.push(app.parseEntries(fs));

        }

        app.parseQueuedDirs(0);

    },

    parseEntries: function (fs) {

        var obj = {reader: null, html: '', children: null};

        if (fs.isDirectory) {

            obj.reader = fs.createReader();
            obj.html = '<p><strong>' + fs.name + '</strong> - ' + fs.fullPath + '</p><br>';
            obj.children = [];

        } else {

            obj.html = '<p>' + fs.name + ' - ' + fs.fullPath + '</p><br>';

        }

        return obj;

    },

    parseQueuedDirs: function(start){

        console.log(start, app.queuedDir.length)

        for(var i = start, entry; entry = app.queuedDir[i]; i++){

            if(entry.children){

                entry.reader.readEntries(function (entries) {

                    console.log('===>', entries);

                    for (var j = 0, fs; fs = entries[j]; j++) {

                        if(fs.isDirectory){

                            var reader = fs.createReader();
                            reader.readEntries(arguments.callee, app.onFileSysError);

                            return;

                        }else{

                            entry.children.push(app.parseEntries(fs));

                        }

                    }

                    app.parseQueuedDirs(i + 1);

                }, app.onFileSysError);
                return;

            }

        }

        console.log('eureka!');
        this.printDir(this.queuedDir);

    },

    printDir: function(data){

        var element = document.querySelector('#fileslist');

        for(var i = 0, item; item = data[i]; i++){

            element.innerHTML += item.html;

            if(item.children.length > 0){

                for(var j = 0, nested; nested = data[i].children[j]; j++){

                    element.innerHTML += nested.html;

                }

            }

        }

    },

    onFileSystemSuccess: function(fileSystem){

        app.currentRoot = fileSystem.root;

        console.log(fileSystem);
        console.log(fileSystem.name);
        console.log(app.currentRoot.fullPath);

        app.readDirAndFiles(app.currentRoot.createReader());

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

        navigator.notification.alert(error.code, null);

    },

    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
