// fs module is used to deal with files and folders
const fs = require('fs');
const path = require('path');

const createFolder = () => {
    // CREATE FOLDER
    console.log('Creating a folder \'files\'');
    fs.mkdir(path.resolve(__dirname, 'files'), (err) => {
        //  an optional argument {recursive:true} creates also the parent folders
        //  if they do not exists 
        // it is suported in NodeJs v 10.x 
        if (err) {
            // handle already exist error
            if (err.code === 'EEXIST') {
                console.log('A folder named \'files\' already found');
                createFile();
            } else {
                console.log(err)
            }
        }

        else {
            console.log('New folder \'files\' created');

            // GET INFO
            // fs.stat() method is used to get the info about a file/directory
            // returns 'fs.stats' object
            fs.stat(path.resolve(__dirname, 'files'), (err, stats) => {
                if (err) { console.log(err); }
                else {
                    console.log('\'files\' is a ', stats.isDirectory() ? 'Folder' : 'File', 'having size ' + stats.size);
                }
            });
            // similar methods are fs.lstat() & fs/fstat()
            createFile();
        }
    });

    // DELETE FOLDER
    // fs.rmdir();

    // READ CONTENT OF FOLDER, IT HAS BEEN USED AFTER CREATING SOME FILES INSIDE FOLDER
    // fs.readdir();
};



// createFolder();


createFile = () => {

    // WRITE
    fs.writeFile(path.resolve(__dirname, 'files/f1.txt'), 'My first file within folder', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File f1 inside folder \'files\' created successfully');

            // READ
            fs.readFile(path.resolve(__dirname, 'files/f1.txt'), 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File f1 read successfully');
                    console.log('Content of the file f1 is :\n', data);

                    // RENAME
                    fs.rename('files/f1.txt', 'files/f2.txt', (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('File f1 renamed to f2 successfully');

                            fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
                                if (err) { console.log(err); }
                                else {
                                    console.log('File list inside folder \'files\' is :', files);
                                }
                            });
                        }
                    });

                    // DELETE 
                    // fs.unlink(path.resolve(__dirname, 'files/f1.txt'),(err)=>{
                    //     if(!err){console.log('file1 deleted successfully');}
                    //     else{console.log(err);}
                    // });
                }
            });
        }
    });
}

const openFile = () => {

    // file.open() is a general method used for dealing with files. It is used for performing 
    // several actions on the file.
    // fs.readFile() methods are simply shortcut which also prevents closing the file

    // fs.open() returns the fd(file descriptor). fd represent a reference to an opened file.
    // It is used to reference the correct file stream by all file system related functions.

    fs.open(path.resolve(__dirname, 'files/f2.txt'), 'r+', (err, fd) => {
        // r+ is the flag that tells fd to open it in read+ (read & write) write mode. An exception occures 
        // if file doesn't exists.
        // w,w+ : file is created if doesn't exists

        if (err) { console.log(err); return; }

        console.log('file descriptor', fd);
        let buffer = new Buffer(100);
        let offset = 0, // position from where insertion begin in buffer 
            length = 50, // number of bytes to read from file
            position = 0; // position from where to start reding the file
        // fs.read(fd, buffer, offset,length,position,(err, bytesRead, buffer) => {
        //     if (err) { console.log(err); return; }
        //     console.log('bytesRead', bytesRead);
        //     console.log('buffer', buffer.toString());
        // });

        let buffer2 = Buffer.from('WRITING NEW CONTENTS IN MY FILE');
        fs.write(fd, buffer2, offset, buffer2.length, position, (err, bytesRead, buffer) => {
            if (err) { console.log(err); return; }
            console.log('bytesRead', bytesRead);
            console.log('buffer', buffer.toString());
        });



    });
}

openFile();


checkFileAccessibility = () => {
    /**
     * Tests a user's permissions for the file or directory specified by path.
     *  The mode argument is an optional integer that specifies the accessibility checks to be performed. 
     * The following constants define the possible values of mode.
     *  It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. fs.constants.W_OK | fs.constants.R_OK).
     * 
     * fs.constants.F_OK - path is visible to the calling process. This is useful for determining if a file exists, but says nothing about rwx permissions. Default if no mode is specified.
     * fs.constants.R_OK - path can be read by the calling process.
     * fs.constants.W_OK - path can be written by the calling process.
     * fs.constants.X_OK - path can be executed by the calling process. This has no effect on Windows (will behave like fs.constants.F_OK).
     */
    fs.access(path.resolve(__dirname, 'files/f2.txt'), fs.constants.F_OK | fs.constants.W_OK /**OPTIONAL */, (err) => {
        console.log(err ? 'no access!' : 'can read/write');
    });

    /**
     * Using fs.access() to check for the accessibility of a file before calling fs.open(), fs.readFile() or fs.writeFile() is not recommended.
     *  Doing so introduces a race condition, since other processes may change the file's state between the two calls.
     *  Instead, user code should open/read/write the file directly and handle the error raised if the file is not accessible.
     * 
     * EXAMPLE
     * */
    // fs.open('myfile', 'wx', (err, fd) => {
    //     if (err) {
    //         if (err.code === 'ENOENT') {
    //             console.error("myfile doesn't  exists");
    //             return;
    //         }
    //         throw err;

    //     }

    //     writeMyData(fd);
    });

}







