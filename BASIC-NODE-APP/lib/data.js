const { log } = require('console');
const fs = require('fs');
const path = require('path');

const lib = {}

lib.basedir = path.join(__dirname, '/../.data/');

//create data 
lib.create = (dir, file, data, callback) => {

    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err1, fileDescriptor) => {
        if (!err1 && fileDescriptor) {

            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false)
                        } else {
                            callback("Error closing a new File")
                        }
                    })
                } else {
                    callback("Error Writting a new File")
                }
            })

        } else {
            callback(err1)
        }
    });
};

//read data 
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

//update file 
lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err1, fileDescriptor) => {
        if (!err1 && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err2) => {
                if (!err2) {
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if (!err3) {
                            fs.close(fileDescriptor, (err4) => {
                                if (!err4) {
                                    callback(false)
                                } else {
                                    console.log("Error While closing file");

                                }
                            })
                        } else {
                            console.log("Error while file updating");

                        }
                    })
                } else {
                    console.log("Error While file truncating");

                }
            })
        } else {
            console.log("Error on file Updating ! File may Exists");

        }
    })
}

//delete file
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback("Successfully deleted the file")
        } else {
            console.log("Error while file deleting");

        }
    })
}
























module.exports = lib;