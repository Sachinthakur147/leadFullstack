const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
var http = require('http');

const app = express();

app.use(cors({
    origin: '0.0.0.0',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
app.use(bodyParser.json());

connectDB();

app.use('/api', leadRoutes);
app.get('/', (req, res) => {
    res.send('A Monk in Cloud');
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





