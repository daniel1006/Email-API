const express = require ('express');
const bodyParser = require ('body-parser'); // Allows you to add body to the email that can send extra information.
const cors = require ('cors'); //cross-origin-resource-sharing, one server can request information from another. 
const sendGrid = require ('@sendgrid/mail');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Change later to only allow our server
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.get('/api', (req, res, next) => {
    res.send('API Status: Running')
});


app.post('/api/daniel', (req, res, next) => {

    console.log(req.body);

    sendGrid.setApiKey('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'); // this key is found on SendGrid when you try to start a new email thing.
    const msg = {
        to: 'daniellanthier2@gmail.com',
        from: req.body.email,
        subject: 'Website Contact',
        text: req.body.message
    }

    sendGrid.send(msg)
        .then(result => {

            res.status(200).json({
                success: true
            });

        })
        .catch(err => {

            console.log('error: ', err);
            res.status(401).json({
                success: false
            });

        });
});


app.listen(3030, '0.0.0.0');
