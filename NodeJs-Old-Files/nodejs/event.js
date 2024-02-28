//Include event module
var events = require('events');
//inport eventemitters class for binding event and event listener
var eventemitters = new events.EventEmitter();
//cerate event handler as follows
var connectHandler = function connect() {
        console.log("Connected Sucessfully");
        //fire the datarecive event
        eventemitters.emit('Data_Recieved');
    }
    //bind the connection event to handler
eventemitters.on('Connection', connectHandler);
// Bind the data_received event with the anonymous function
eventemitters.on('Data Received', function() {
    console.log("Data Recieved Succussful");
});
//fire the connection event
eventemitters.emit('Connection');
console.log("Program Terminated");