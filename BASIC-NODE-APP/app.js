const http = require('http');
const { handleReqRes } = require('./helpers/handelreqRes')
const environment = require('./helpers/environmet')
const data = require('./lib/data')

const app = {};

app.config = {
    port: 3000
};


//const createData = { "name": "Rohit", "j_no": 45, "role": "batter", "highest": 264 }
const createData = { "name": "Virat Kohli", "j_no": 18, "role": "batter", "highest": 183, "others": "Former Indian Captain" }


/*
data.create('test', 'player-2', createData, (err) => {
    console.log(`error is`, err);

});
*/

/*
data.read('test', 'player-1', (err, res) => {
    console.log(err, res);

});
*/


/*
data.update('test', 'player-1',createData, (err) => {
    console.log(err);
    
})
*/

/*
data.delete('test', 'player-1', (err) => {
console.log(err);

})
*/




app.createServer = () => {
    const server = http.createServer(app.handReqRes);
    server.listen(environment.port, () => {
        console.log(`App is listining at port ${environment.port}`);
    })

}

app.handReqRes = handleReqRes;


app.createServer();