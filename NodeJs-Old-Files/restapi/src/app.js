const express = require('express');
const app = express();
require("./db/conn.js");
const Student = require('./modal/students');
const port = process.env.PORT || 3000;
app.use(express.json());

// app.get("/", (req, res) => {
//         res.send("Hello from api");

//     })
/*app.post("/student", (req, res) => {
    res.send("Hello from student api");
    //console.log(req.body);
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(404).send(err);
    })
});*/
app.post("/students", async(req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (err) {
        res.status(404).send(err);

    }
})
app.get("/students", async(req, res) => {
    try {
        const userData = await Student.find();
        res.status(201).send(userData);

    } catch (err) {
        res.send(err);

    }

});
app.get("/students/:id", async(req, res) => {
    const _id = req.params.id;
    const userData = await Student.findById({ _id })
    if (!userData) {
        res.status(404).send()
    } else {
        res.send(userData)
    }

});
app.delete("/students/:id", async(req, res) => {
    try {
        const userData = await Student.findByIdAndDelete(req.params.id);
        if (!userData) {
            res.status(404).send();
        } else {
            res.send(userData);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`listening at ${port}`);
})