const express = require('express');
// const { getData } = require('./dynamo');
const { getData, getDataById, addOrUpdateData } = require('./dynamo');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
    <center>
    <h1>API Endpoint Develop By Olajide Usman</h1>
    <h3>
    Fetch All GET: localhost:3000/details <br/><br/>
    Fetch by Id GET: localhost:3000/details/3 <br/><br/>
    Create POST: localhost:3000/details <br/><br/>
    </h3>
    </center>
    `);
    // res.send('Hello World');
});

app.get('/details', async (req, res) => {
    try {
        const details = await getData();
        res.json(details);
    } catch (error) {
        // console.error(error)
        res.status(500).json({err: "something went wrong"});
    }
});

app.get('/details/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const details = await getDataById(userId);
        res.json(details);
    } catch (error) {
        // console.error(error)
        res.status(500).json({err: "something went wrong"});
    }
});

app.get('/test', async(req, res) => {
  res.status(200).json({ message: 'Test message api'});
});

app.post('/details', async (req, res) => {
    const detail = req.body;
    try {
        const newDetail = await addOrUpdateData(detail);
        res.json({status: true, message: newDetail});
    } catch (error) {
        // console.error(error)
        res.status(500).json({err: "something went wrong"});
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});