const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect("mongodb://localhost:27017/nodejs", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected..........")).catch((err) => console.log(err));
const login = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }


        }
    },
    address: String,
    psw: String,
    phone: Number,
    hobbi: String,
    score: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Score should not negative");
                //console.log("Data not inserted due to Score Should not be a negative number");
            }
        }

    }

});
//create a collection
const Student = new mongoose.model("Student", login);
//insert document
const createDocument = async() => {
        try {
            const Stu1 = new Student({
                name: 'Rohit',
                address: 'Mumbai',
                psw: 'rohit125',
                phone: 9634567897,
                hobbi: 'Pull Short'
            })
            const Stu2 = new Student({
                name: 'Vitar',
                address: 'Delhi',
                psw: 'vk458',
                phone: 799456123,
                hobbi: 'cover drive'
            })
            const Stu3 = new Student({
                name: 'Pant',
                address: 'Berhampore',
                psw: 'dipu1245',
                phone: 9634567897,
                hobbi: 'See movie'
            })
            const Stu4 = new Student({
                name: 'Sourav',
                address: 'Kolkata',
                psw: '1245',
                phone: 9634567897,
                hobbi: 'Pricne'
            })
            const result = await Student.insertMany([Stu1, Stu2, Stu3, Stu4]);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }
    //createDocument();

const getDocument = async() => {
        const result = await Student
            .find({ score: { $gt: 50 } })
            .select({ name: 1, address: 1 })
            //.limit(1)
        console.log(result);


    }
    //getDocument();
const updateDocument = async(_id) => {
        try {
            const result = await Student.findByIdAndUpdate({ _id }, {
                $set: {
                    name: 'Virat Kholi'

                }
            }, {
                new: true,
                useFindAndModify: false

            });
            console.log("Data Updated");
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }
    //updateDocument("60dfdb4894a86200e872539b");
const deleteDocument = async(_id) => {
        try {
            const result = await Student.findByIdAndDelete({
                _id
            });
            console.log("Document Deleted---");
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }
    //deleteDocument("60dfdb4894a86200e872539b");

const StuInfo8 = new Student({
    name: 'Ishan Kishan',
    email: 'ishan@gmail.com',
    address: 'Ranchi',
    psw: '587945',
    phone: 12567895412,
    hobbi: 'Cricket',
    score: 64
});
//StuInfo8.save();
//StuInfo.save();
//StuInfo1.save();
//StuInfo1.save();