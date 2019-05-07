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
                       
                       fs.readdir(path.resolve(__dirname, 'files'),(err,files)=>{
                           if(err){console.log(err);}
                           else{
                               console.log('File list inside folder \'files\' is :',files);
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

const openFile =()=>{

    fs.open(path.resolve(__dirname, 'files/f2.txt'),'r+',(err,fd)=>{

        if(err){console.log(err); return;}
        
        console.log('file descriptor',fd);
        
        fs.read(fd,new Buffer(),(err,bytesRead,buffer)=>{
            if(err){console.log(err); return;}

            console.log('bytesRead',bytesRead);
            console.log('buffer',buffer);
            

        })

    });
}

openFile();







