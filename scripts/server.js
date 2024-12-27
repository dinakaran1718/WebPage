const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// MSSQL Configuration
const config = {
    user: 'yourUsername',
    password: 'yourPassword',
    server: 'yourServerAddress',
    database: 'yourDatabaseName',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Ping Endpoint to Check Connection
app.get('/ping', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        res.status(200).send('Database is connected.');
    } catch (err) {
        res.status(500).send('Database connection failed: ' + err.message);
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
