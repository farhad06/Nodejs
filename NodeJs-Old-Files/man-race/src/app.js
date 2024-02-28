const express = require("express");
const app = express();
//require database connection page
require("../src/db/conn");
//adding database schema page
const mansrace = require("../src/module/manschema");
app.use(express.json());
const port = process.env.PORT || 3000;
//it is for save data into database
app.post("/mens", async(req, res) => {
    try {
        const addingrecord = new mansrace(req.body);
        //console.log(req.body);
        const insertrecord = await addingrecord.save();
        res.send(insertrecord);
    } catch (e) {
        res.send(e);
    }
});
//it is for retrive data from database
app.get("/mens", async(req, res) => {
    try {
        const mensdata = await mansrace.find().sort({ "ranking": 1 });
        res.status(201).send(mensdata);
    } catch (err) {
        res.status(404).send(err);
    }
});
//it is for dara update into the database
app.patch("/mens/:id", async(req, res) => {
    try {
        const updatedata = await mansrace.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.send(updatedata);

    } catch (err) {
        res.status(500).send(err);
    }
});
//it is for delete data from databse
app.delete("/mens/:id", async(req, res) => {
    try {
        const userData = await mansrace.findByIdAndDelete(req.params.id);
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
    console.log(`Listening at ${port}`);
});