import express from 'express';
import {generateResponse, provideData} from './chat.js';
import path from 'path';  // Import the path module
import { getBatchArray } from './rtcStats.js'; // Import getBatchArray

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Also serve static files from 'src' directory
app.use(express.static('src'));

// Increase the limit for incoming requests
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/response', async (req, res) => {
    console.log("req.query", req.query)
    const userQuery = req.query.userQuery;
    console.log("userQuery", userQuery);
    
    const response = await generateResponse(userQuery);
    console.log("response", response);
    res.send(response);
});

app.post('/api/dataResponse', async (req, res) => {
    const batchArray = req.body;
    let batchArrayString = JSON.stringify(batchArray);
    console.log("batchArray", batchArrayString);
    const response = await provideData(batchArrayString);
    console.log("response", response);
    res.send(response);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
