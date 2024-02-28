const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//const ejs = require('ejs');
let PUBLIC_KEY = 'pk_test_51JcKjnSBXm0aWaJBaZmMa3nu1FJg49uKCZYqcHnMdAcvtK9HqNcHMTfZSzUzED5hslYduVB0NZeUBnG5WySj1QYv00i6PdDpiv';
let SECTEAT_KEY = 'sk_test_51JcKjnSBXm0aWaJBcjcQ0GSqVf7uZXrhaJx8iSvZU8J7LeH6XQiXxInzhb0oBUGoXMqd4SudNEyk6MLDU7YLoZSn00Rz5x399F';
const stripe = require('stripe')(SECTEAT_KEY);
const port = process.env.PORT || 8050;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home', {
        key: PUBLIC_KEY
    })
})
app.post('/payment', (req, res) => {
    stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: 'Farhad Ahamed',
            address: {
                line1: 'Hariharpara',
                postal_code: '742166',
                city: 'Hariharpara',
                state: 'West Bengal',
                country: 'India',
            }

        })
        .then((customer) => {

            return stripe.charges.create({
                amount: 7000, // Charing Rs 25 
                description: 'Web Development Product',
                currency: 'USD',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.send("Success") // If no error occurs 
        })
        .catch((err) => {
            res.send(err) // If some error occurs 
        });

})
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening at ${port}`);
});